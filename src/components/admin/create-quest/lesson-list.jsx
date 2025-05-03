
import { Edit, Trash2 } from "lucide-react"

export default function LessonList({ lessons, onEdit, onDelete }) {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-6 text-zinc-400 border border-dashed border-zinc-700 rounded-md mb-6">
        No lessons added yet. Add your first lesson below.
      </div>
    )
  }

  return (
    <div className="mb-6 space-y-3">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="bg-zinc-700 p-4 rounded-md">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-medium text-amber-600">{lesson.name}</h3>
              <p className="text-sm text-zinc-300 mt-1">{lesson.summery}</p>
              <div className="mt-2 bg-zinc-800 px-3 py-1 rounded inline-block">
                <code className="text-xs text-zinc-300">{lesson.command}</code>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                type="button"
                onClick={() => onEdit(index)}
                className="p-1.5 text-zinc-300 hover:text-amber-600 hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Edit lesson"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(index)}
                className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Delete lesson"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
