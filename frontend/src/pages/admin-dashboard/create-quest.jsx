import { useRef, useState } from "react";
import QuestForm from "../../components/admin/create-quest/quest-form";

export default function CreateQuest() {
  const [quest, setQuest] = useState({
    questName: "",
    logo: null,
    logoPreview: null,
    lessons: [],
    published: false,
  });

  const [editingLessonIndex, setEditingLessonIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Generate ID from name (remove spaces and convert to lowercase)
  const generateId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  // Handle quest name and logo changes
  const handleQuestChange = (e) => {
    const { name, value } = e.target;
    setQuest((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQuest((prev) => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Toggle publish status
  const togglePublish = () => {
    setQuest((prev) => ({ ...prev, published: !prev.published }));
  };

  // Add a new lesson
  const addLesson = (lesson) => {
    if (editingLessonIndex !== null) {
      // Update existing lesson
      const updatedLessons = [...quest.lessons];
      updatedLessons[editingLessonIndex] = {
        ...lesson,
        id: `${generateId(quest.questName)}/${generateId(lesson.name)}`,
      };

      setQuest((prev) => ({ ...prev, lessons: updatedLessons }));
      setEditingLessonIndex(null);
    } else {
      // Add new lesson
      const newLesson = {
        ...lesson,
        id: `${generateId(quest.questName)}/${generateId(lesson.name)}`,
      };

      setQuest((prev) => ({
        ...prev,
        lessons: [...prev.lessons, newLesson],
      }));
    }
  };

  // Edit a lesson
  const editLesson = (index) => {
    setEditingLessonIndex(index);
  };

  // Delete a lesson
  const deleteLesson = (index) => {
    const updatedLessons = quest.lessons.filter((_, i) => i !== index);
    setQuest((prev) => ({ ...prev, lessons: updatedLessons }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create final quest object
    const finalQuest = {
      ...quest,
      id: generateId(quest.questName),
    };

    // Log the data (in a real app, this would be sent to a database)
  };

  return (
    <div className=" text-zinc-100">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-amber-600">Create Quest</h1>

        {/* Quest Details Section */}
        <QuestForm
          quest={quest}
          handleQuestChange={handleQuestChange}
          handleLogoUpload={handleLogoUpload}
          fileInputRef={fileInputRef}
          togglePublish={togglePublish}
        />
      </div>
    </div>
  );
}
