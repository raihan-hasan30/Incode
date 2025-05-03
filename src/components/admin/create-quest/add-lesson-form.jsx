
import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"

export default function AddLessonForm({ addLesson, editingLesson, setEditingLessonIndex }) {
  const [lesson, setLesson] = useState({
    name: "",
    summery: "",
    command: "",
  })

  const [isFormOpen, setIsFormOpen] = useState(false)

  // When editing a lesson, populate the form with lesson data
  useEffect(() => {
    if (editingLesson) {
      setLesson({
        name: editingLesson.name,
        summery: editingLesson.summery,
        command: editingLesson.command,
      })
      setIsFormOpen(true)
    }
  }, [editingLesson])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLesson((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addLesson(lesson)
    resetForm()
  }

  const resetForm = () => {
    setLesson({
      name: "",
      summery: "",
      command: "",
    })
    setIsFormOpen(false)
  }

  const cancelEdit = () => {
    resetForm()
    setEditingLessonIndex(null)
  }

  return (
    <div className="mt-6">
      {!isFormOpen ? (
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </button>
      ) : (
        <div className="border border-zinc-700 rounded-md p-4 ">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{editingLesson ? "Edit Lesson" : "Add New Lesson"}</h3>
            <button type="button" onClick={cancelEdit} className="p-1 text-zinc-400 hover:text-zinc-200 rounded-full">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Lesson Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Lesson Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={lesson.name}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Enter lesson name"
                required
              />
            </div>

            {/* Lesson Summary */}
            <div>
              <label htmlFor="summery" className="block text-sm font-medium mb-1">
                Lesson Summary
              </label>
              <textarea
                id="summery"
                name="summery"
                value={lesson.summery}
                onChange={handleChange}
                rows="3"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Enter lesson summary"
                required
              />
            </div>

            {/* Command */}
            <div>
              <label htmlFor="command" className="block text-sm font-medium mb-1">
                Command
              </label>
              <input
                type="text"
                id="command"
                name="command"
                value={lesson.command}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Enter command"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 border border-zinc-600 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                {editingLesson ? "Update Lesson" : "Add Lesson"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
