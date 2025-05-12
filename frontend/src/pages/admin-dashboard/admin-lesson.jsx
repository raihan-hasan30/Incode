import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AdminBreadcumb from "../../components/admin/admin-breadcumb";
import LessonTable from "../../components/admin/LessonTable";
import Dialog from "../../components/Dialog";
import { createLesson, deleteLesson, fetchLessons, updateLesson } from "../../repository/lesson-api";
import { fetchQuests } from "../../repository/quest-api";

function AdminLessonList() {
  const [quests, setQuests] = useState([]); // [{...quest, lessons: []}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState({ open: false, questId: null, lesson: null });
  const [editForm, setEditForm] = useState({ name: "", summary: "", command: "" });
  const [createDialog, setCreateDialog] = useState({ open: false, quest: null });
  const [createForm, setCreateForm] = useState({ name: "", summary: "", command: "" });

  // Fetch all quests and their lessons
  useEffect(() => {
    setLoading(true);
    fetchQuests()
      .then(async (questsData) => {
        // For each quest, fetch its lessons
        const questsWithLessons = await Promise.all(
          questsData.map(async (quest) => {
            try {
              const lessons = await fetchLessons(quest.id);
              return { ...quest, lessons };
            } catch {
              return { ...quest, lessons: [] };
            }
          })
        );
        setQuests(questsWithLessons);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load quests or lessons");
        setLoading(false);
      });
  }, []);

  // Add lesson dialog
  const handleAddLesson = (questId) => {
    const quest = quests.find((q) => q.id === questId);
    setCreateForm({ name: "", summary: "", command: "" });
    setCreateDialog({ open: true, quest });
  };

  // Create lesson
  const handleCreateLesson = async () => {
    try {
      const { quest } = createDialog;
      const data = { name: createForm.name, summary: createForm.summary, command: createForm.command };
      const created = await createLesson(quest.id, data);
      setQuests((prev) => prev.map((q) => (q.id === quest.id ? { ...q, lessons: [...q.lessons, created] } : q)));
      setCreateDialog({ open: false, quest: null });
      setCreateForm({ name: "", summary: "", command: "" });
    } catch (err) {
      alert("Failed to create lesson");
    }
  };

  // Edit lesson dialog
  const handleEditLesson = (questId, lessonId) => {
    const quest = quests.find((q) => q.id === questId);
    const l = quest.lessons.find((l) => l.id === lessonId);
    setEditForm({ name: l.name, summary: l.summary, command: l.command });
    setEditDialog({ open: true, questId, lesson: l });
  };

  // Edit lesson
  const handleEditSave = async () => {
    try {
      const { questId, lesson } = editDialog;
      const data = { name: editForm.name, summary: editForm.summary, command: editForm.command };
      const updated = await updateLesson(questId, lesson.id, data);
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId ? { ...q, lessons: q.lessons.map((l) => (l.id === lesson.id ? updated : l)) } : q
        )
      );
      setEditDialog({ open: false, questId: null, lesson: null });
    } catch (err) {
      alert("Failed to update lesson");
    }
  };

  // Delete lesson
  const handleDeleteLesson = async (questId, lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await deleteLesson(questId, lessonId);
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, lessons: q.lessons.filter((l) => l.id !== lessonId) } : q))
      );
    } catch (err) {
      alert("Failed to delete lesson");
    }
  };

  // Form changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-6 text-zinc-300">Loading lessons...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!quests.length) return <div className="p-6 text-zinc-400">No quests found. Please create a quest first.</div>;

  return (
    <div className="p-6">
      <AdminBreadcumb title="Lesson List" subtitle="Manage lessons for each quest below." />
      <div className="space-y-10 mt-8">
        {quests.map((quest) => (
          <div key={quest.id} className="border border-zinc-800 rounded-lg bg-zinc-900 shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-800 rounded-t-lg">
              <div className="flex items-center gap-4">
                {quest.logo ? (
                  <img
                    src={quest.logo.startsWith("http") ? quest.logo : `${import.meta.env.VITE_API_URL}${quest.logo}`}
                    alt={quest.questName}
                    className="w-10 h-10 rounded  object-contain border border-zinc-700 p-1 bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                    No Logo
                  </div>
                )}
                <div>
                  <div className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    {quest.questName}
                    <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-amber-600 text-white">
                      {quest.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {quest.lessons.length} Lesson{quest.lessons.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAddLesson(quest.id)}
                className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-xs shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add Lesson
              </button>
            </div>
            <LessonTable
              lessons={quest.lessons}
              onEditLesson={(lessonId) => handleEditLesson(quest.id, lessonId)}
              onDeleteLesson={(lessonId) => handleDeleteLesson(quest.id, lessonId)}
            />
          </div>
        ))}
      </div>
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, questId: null, lesson: null })}
        title="Edit Lesson"
        actions={[
          <button
            key="cancel"
            onClick={() => setEditDialog({ open: false, questId: null, lesson: null })}
            className="bg-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium px-4 py-2 rounded-lg transition-colors text-xs"
          >
            Cancel
          </button>,
          <button
            key="save"
            onClick={handleEditSave}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-xs"
          >
            Save
          </button>,
        ]}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Lesson Name</label>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Summary</label>
            <input
              name="summary"
              value={editForm.summary}
              onChange={handleEditFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Command</label>
            <input
              name="command"
              value={editForm.command}
              onChange={handleEditFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600 font-mono"
            />
          </div>
        </form>
      </Dialog>
      <Dialog
        open={createDialog.open}
        onClose={() => setCreateDialog({ open: false, quest: null })}
        title="Add Lesson"
        actions={[
          <button
            key="cancel"
            onClick={() => setCreateDialog({ open: false, quest: null })}
            className="bg-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium px-4 py-2 rounded-lg transition-colors text-xs"
          >
            Cancel
          </button>,
          <button
            key="create"
            onClick={handleCreateLesson}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-xs"
            disabled={!createForm.name}
          >
            Add Lesson
          </button>,
        ]}
      >
        {createDialog.quest && (
          <div className="flex items-center gap-4 mb-4">
            {createDialog.quest.logo ? (
              <img
                src={
                  createDialog.quest.logo.startsWith("http")
                    ? createDialog.quest.logo
                    : `${import.meta.env.VITE_API_URL}${createDialog.quest.logo}`
                }
                alt={createDialog.quest.questName}
                className="w-10 h-10 rounded  object-contain border border-zinc-700 p-1 bg-white"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                No Logo
              </div>
            )}
            <span className="text-lg font-bold text-zinc-100">{createDialog.quest.questName}</span>
          </div>
        )}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Lesson Name</label>
            <input
              name="name"
              value={createForm.name}
              onChange={handleCreateFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600"
              placeholder="Enter lesson name"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Summary</label>
            <textarea
              name="summary"
              value={createForm.summary}
              onChange={handleCreateFormChange}
              rows={3}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600 resize-none"
              placeholder="Enter summary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Command</label>
            <input
              name="command"
              value={createForm.command}
              onChange={handleCreateFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600 font-mono"
              placeholder="Enter command"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default AdminLessonList;
