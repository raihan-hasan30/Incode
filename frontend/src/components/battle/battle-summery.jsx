export default function BattleSummery({ lessons = [], lessonHistory = {}, typingStats = {} }) {
  // Calculate Right, Wrong, Point
  let right = 0;
  let wrong = 0;
  let point = 0;

  lessons.forEach((lesson) => {
    const id = lesson.id;
    const stats = typingStats[id] || {};
    // Right: correct chars (total chars - wrong chars, but not less than 0)
    const correct = Math.max((stats.chars || 0) - (stats.wrong || 0), 0);
    right += correct;
    wrong += stats.wrong || 0;
    // Point: 1 per completed lesson (typed length >= command length)
    if (lessonHistory[id] && lesson.command && lessonHistory[id].length >= lesson.command.length) {
      point += 1;
    }
  });

  return (
    <div className="mx-auto flex justify-between border border-zinc-200/20 p-2 rounded-full w-fit  divide-x divide-zinc-200/20 bg-zinc-900/50">
      <div className="flex gap-2 px-4">
        <span className="text-emerald-500 font-medium">Right</span>
        <span>{right}</span>
      </div>

      <div className="flex gap-2 px-4">
        <span className="text-red-500 font-medium">Wrong</span>
        <span>{wrong}</span>
      </div>

      <div className="flex gap-2 px-4">
        <span className="text-amber-500 font-medium">Point</span>
        <span>{point}</span>
      </div>
    </div>
  );
}
