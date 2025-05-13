export default function BattleSummery({ lessons, lessonHistory, typingStats }) {
  return (
    <div className="mx-auto flex justify-between border border-zinc-200/20 p-2 rounded-full w-fit  divide-x divide-zinc-200/20 bg-zinc-900/50">
      <div className="flex gap-2 px-4">
        <span className="text-emerald-500 font-medium">Right</span>
        <span>0</span>
      </div>

      <div className="flex gap-2 px-4">
        <span className="text-red-500 font-medium">Wrong</span>
        <span>0</span>
      </div>

      <div className="flex gap-2 px-4">
        <span className="text-amber-500 font-medium">Point</span>
        <span>0</span>
      </div>
    </div>
  );
}
