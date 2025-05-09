function QuestTable({ quests, onTogglePublish, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto mt-8 rounded-lg shadow border border-zinc-800 bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-800">
        <thead className="bg-zinc-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Quest Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Lessons</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Published</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-900 divide-y divide-zinc-800">
          {quests.map((quest) => (
            <tr key={quest.id} className="hover:bg-zinc-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                {quest.logo ? (
                  <img
                    src={quest.logo.startsWith("http") ? quest.logo : `${import.meta.env.VITE_API_URL}${quest.logo}`}
                    alt={quest.questName}
                    className="w-10 h-10 rounded bg-white p-1 object-contain border border-zinc-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs">
                    No Logo
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-100 font-semibold text-base">{quest.questName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-zinc-300 text-center">
                {quest.lessonsCount ?? (quest.lessons ? quest.lessons.length : 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onTogglePublish(quest.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                    quest.published ? "bg-amber-600" : "bg-zinc-500"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      quest.published ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="ml-3 text-sm text-zinc-300">{quest.published ? "Published" : "Unpublished"}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => onEdit(quest.id)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(quest.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestTable;
