export default function BattleStartDialog({ open, onStart }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">Ready to Start?</h2>
        <ul className="list-disc pl-6 text-zinc-300 mb-6 space-y-2 text-base">
          <li>Type the commands as fast and accurately as you can.</li>
          <li>Wrong keystrokes will be counted.</li>
          <li>Each lesson is a new challenge.</li>
          <li>
            Press <span className="font-mono bg-zinc-800 px-2 py-0.5 rounded text-amber-400">Tab</span> to submit your
            answer.
          </li>
        </ul>
        <button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg text-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </div>
  );
}
