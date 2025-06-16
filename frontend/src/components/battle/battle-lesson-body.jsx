import TypingArea from "./battle-typing-area";

function BattleLessonsBody({
  lesson,
  setActiveIndex,
  lessonHistory,
  setLessonHistory,
  lessons,
  typingStats,
  setTypingStats,
}) {
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl text-white font-bold">{lesson.name}</h1>
        <h3 className="text-zinc-400 mt-4 text-center">{lesson.summary}</h3>
        <TypingArea
          key={lesson.id}
          id={lesson.id}
          lessonHistory={lessonHistory}
          setLessonHistory={setLessonHistory}
          command={lesson.command}
          nextCommand={() => {
            setActiveIndex((prev) => prev + 1);
          }}
          isReady={true}
          typingStats={typingStats}
          setTypingStats={setTypingStats}
        />

        <div className="flex justify-between text-zinc-500">
          <button
            onClick={() => {
              setActiveIndex((prev) => {
                if (prev > 0) {
                  return prev - 1;
                } else {
                  return 0;
                }
              });
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setActiveIndex((prev) => prev + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BattleLessonsBody;
