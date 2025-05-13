// Helper to calculate stats
function getLessonStats({ lessons = [], lessonHistory = {}, typingStats = {} }) {
  let wrong = 0;
  let totalTyped = 0;
  let totalTime = 0;
  let completed = 0;
  let wpm = 0;

  lessons.forEach((lesson) => {
    const id = lesson.id;
    const stats = typingStats[id] || {};
    wrong += stats.wrong || 0;
    totalTyped += stats.chars || 0;
    totalTime += stats.time || 0;
    if (lessonHistory[id] && lessonHistory[id].length >= (lesson.command?.length || 0)) {
      completed += 1;
    }
  });

  // Calculate WPM (words per minute)
  // 1 word = 5 chars, time in ms
  if (totalTime > 0) {
    wpm = Math.round(totalTyped / 5 / (totalTime / 60000));
  }

  return {
    wrong,
    completed,
    remaining: lessons.length - completed,
    wpm: isNaN(wpm) ? 0 : wpm,
  };
}

function LessonsSummary({ lessons = [], lessonHistory = {}, typingStats = {}, quest }) {
  const { wrong, completed, remaining, wpm } = getLessonStats({ lessons, lessonHistory, typingStats });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6 flex flex-col gap-8 min-h-[320px]">
      <div>
        <h2 className="text-lg font-bold text-amber-600 mb-4 tracking-wide">Lesson Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-600 rounded-full">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#fff" />
                <path
                  d="M6 10.5l3 3 5-5"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-zinc-300 font-medium text-base">Words Per Min</span>
            <span className="ml-auto text-amber-500 font-bold text-lg">{wpm}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-600 rounded-full">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#fff" />
                <path d="M7 13l6-6M13 13L7 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-zinc-300 font-medium text-base">Wrong</span>
            <span className="ml-auto text-red-400 font-bold text-lg">{wrong}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-zinc-700 rounded-full">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#fff" />
                <path d="M10 5v5l3 3" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-zinc-300 font-medium text-base">Remaining Lesson</span>
            <span className="ml-auto text-zinc-400 font-bold text-lg">{remaining}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#fff" />
                <path
                  d="M6 10.5l3 3 5-5"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-zinc-300 font-medium text-base">Completed</span>
            <span className="ml-auto text-green-400 font-bold text-lg">{completed}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-base font-semibold text-zinc-400 mb-2">Share on Social Media</h3>
        <div className="flex gap-3">
          <button className="bg-zinc-800 hover:bg-amber-600 text-zinc-200 hover:text-white rounded-full p-2 transition-colors">
            <img src="/link.svg" alt="Share" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonsSummary;
