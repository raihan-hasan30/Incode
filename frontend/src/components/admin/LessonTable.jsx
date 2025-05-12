import { Edit2, Trash2 } from "lucide-react";

function LessonTable({ lessons, onEditLesson, onDeleteLesson }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-800">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Lesson Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Summary</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Command</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-900 divide-y divide-zinc-800">
          {lessons.map((l) => (
            <tr key={l.id} className="hover:bg-zinc-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-zinc-100 font-semibold text-base">{l.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-300 text-sm max-w-xs truncate">{l.summery}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-400 text-xs font-mono max-w-xs truncate">
                {l.command}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => onEditLesson(l.id)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => onDeleteLesson(l.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
          {lessons.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">
                No lessons found for this quest.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LessonTable;
