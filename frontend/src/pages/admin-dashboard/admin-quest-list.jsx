import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AdminBreadcumb from "../../components/admin/admin-breadcumb";
import QuestTable from "../../components/admin/QuestTable";
import Dialog from "../../components/Dialog";
import {
  deleteQuest as apiDeleteQuest,
  createQuest,
  fetchQuests,
  toggleQuestPublish,
  updateQuest,
} from "../../repository/quest-api";

function AdminQuestList() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState({ open: false, quest: null });
  const [editForm, setEditForm] = useState({
    questName: "",
    logo: null,
    logoFile: null,
    logoPreview: null,
    published: false,
  });
  const [createDialog, setCreateDialog] = useState(false);
  const [createForm, setCreateForm] = useState({ questName: "", logoFile: null, logoPreview: null, published: false });
  const fileInputRef = useRef(null);

  // Fetch quests on mount
  useEffect(() => {
    setLoading(true);
    fetchQuests()
      .then((data) => {
        setQuests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load quests");
        setLoading(false);
      });
  }, []);

  // Publish/unpublish
  const handleTogglePublish = async (id) => {
    try {
      const updated = await toggleQuestPublish(id);
      setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, ...updated } : q)));
    } catch (err) {
      alert("Failed to toggle publish status");
    }
  };

  // Edit dialog open
  const handleEdit = (id) => {
    const quest = quests.find((q) => q.id === id);

    setEditForm({
      questName: quest.questName,
      logo: quest.logo,
      logoFile: null,
      logoPreview: quest.logo
        ? quest.logo.startsWith("http")
          ? quest.logo
          : `${import.meta.env.VITE_API_URL}${quest.logo}`
        : null,
      published: quest.published,
    });
    setEditDialog({ open: true, quest });
  };

  // Edit form changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setEditForm((prev) => ({
      ...prev,
      logoFile: file,
      logoPreview: file ? URL.createObjectURL(file) : prev.logoPreview,
    }));
  };

  // Edit save
  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      formData.set("questName", editForm.questName);
      formData.set("published", editForm.published);
      if (editForm.logoFile) formData.set("logo", editForm.logoFile);
      const updated = await updateQuest(editDialog.quest.id, formData);
      setQuests((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
      setEditDialog({ open: false, quest: null });
    } catch (err) {
      alert("Failed to update quest");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quest?")) return;
    try {
      await apiDeleteQuest(id);
      setQuests((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert("Failed to delete quest");
    }
  };

  // Create form changes
  const handleCreateFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleCreateLogoChange = (e) => {
    const file = e.target.files[0];
    setCreateForm((prev) => ({
      ...prev,
      logoFile: file,
      logoPreview: file ? URL.createObjectURL(file) : null,
    }));
  };
  // Create quest
  const handleCreateQuest = async () => {
    try {
      const formData = new FormData();
      formData.set("questName", createForm.questName);
      formData.set("published", createForm.published);
      if (createForm.logoFile) formData.set("logo", createForm.logoFile);
      const created = await createQuest(formData);
      setQuests((prev) => [...prev, created]);
      setCreateDialog(false);
      setCreateForm({ questName: "", logoFile: null, logoPreview: null, published: false });
    } catch (err) {
      alert("Failed to create quest");
    }
  };

  if (loading) return <div className="p-6 text-zinc-300">Loading quests...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <AdminBreadcumb title="Quest List" subtitle="You can customize it further based on your needs." />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCreateDialog(true)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-3 rounded-lg transition-colors text-sm shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <PlusCircle className="w-5 h-5" /> Add Quest
        </button>
      </div>

      <QuestTable quests={quests} onTogglePublish={handleTogglePublish} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, quest: null })}
        title="Edit Quest"
        actions={[
          <button
            key="cancel"
            onClick={() => setEditDialog({ open: false, quest: null })}
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
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSave();
          }}
        >
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Quest Name</label>
            <input
              name="questName"
              value={editForm.questName}
              onChange={handleEditFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Quest Logo</label>
            <div className="flex items-center gap-4">
              {editForm.logoPreview ? (
                <img
                  src={editForm.logoPreview}
                  alt="Quest logo preview"
                  className="w-16 h-16 rounded bg-white p-1 object-cover border border-zinc-700"
                />
              ) : (
                <div className="w-16 h-16 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                  No Logo
                </div>
              )}
              <div>
                <input type="file" accept="image/*" id="logo-upload" onChange={handleLogoChange} className="hidden" />
                <label
                  htmlFor="logo-upload"
                  className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                >
                  Change Image
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Published</label>
            <button
              type="button"
              onClick={() => setEditForm((prev) => ({ ...prev, published: !prev.published }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                editForm.published ? "bg-amber-600" : "bg-zinc-500"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  editForm.published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-zinc-300">{editForm.published ? "Published" : "Unpublished"}</span>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={createDialog}
        onClose={() => setCreateDialog(false)}
        title="Create Quest"
        actions={[
          <button
            key="cancel"
            onClick={() => setCreateDialog(false)}
            className="bg-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium px-4 py-2 rounded-lg transition-colors text-xs"
          >
            Cancel
          </button>,
          <button
            key="create"
            onClick={handleCreateQuest}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-xs"
            disabled={!createForm.questName}
          >
            Create
          </button>,
        ]}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateQuest();
          }}
        >
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Quest Name</label>
            <input
              name="questName"
              value={createForm.questName}
              onChange={handleCreateFormChange}
              className="w-full bg-zinc-800 text-zinc-100 p-2 rounded border-none focus:ring-2 focus:ring-amber-600"
              placeholder="Enter quest name"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Quest Logo</label>
            <div className="flex items-center gap-4">
              {createForm.logoPreview ? (
                <img
                  src={
                    createForm.logoPreview.startsWith("blob:")
                      ? createForm.logoPreview
                      : `${import.meta.env.VITE_API_URL}${createForm.logoPreview}`
                  }
                  alt="Quest logo preview"
                  className="w-16 h-16 rounded bg-zinc-700 object-contain border border-zinc-700"
                />
              ) : (
                <div className="w-16 h-16 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                  No Logo
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="create-logo-upload"
                  ref={fileInputRef}
                  onChange={handleCreateLogoChange}
                  className="hidden"
                />
                <label
                  htmlFor="create-logo-upload"
                  className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Published</label>
            <button
              type="button"
              onClick={() => setCreateForm((prev) => ({ ...prev, published: !prev.published }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                createForm.published ? "bg-amber-600" : "bg-zinc-500"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  createForm.published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-zinc-300">{createForm.published ? "Published" : "Unpublished"}</span>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default AdminQuestList;
