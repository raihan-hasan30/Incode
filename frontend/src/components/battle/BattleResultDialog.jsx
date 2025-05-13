export default function BattleResultDialog({ open, point, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-amber-500 mb-4">Battle Complete!</h2>
        <div className="text-lg text-zinc-300 mb-6">You scored</div>
        <div className="text-6xl font-extrabold text-amber-400 mb-6">{point}</div>
        <button
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-8 rounded-lg text-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
