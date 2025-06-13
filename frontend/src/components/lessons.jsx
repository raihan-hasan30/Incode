function Lessons({ lessons = [], activeIndex = 3 }) {
  function LessonItem({ lesson, index }) {
    return (
      <li
        key={lesson.name}
        className={`transition-all ease-in-out hover:text-zinc-400 cursor-pointer overflow-ellipsis line-clamp-1 ${
          index == activeIndex && "text-amber-400 font-medium"
        }`}
      >
        <span>{">"}</span> {lesson.name}
      </li>
    );
  }

  function EmptyLesson() {
    return <div className="max-h-72 h-72 bg-zinc-900 grid place-items-center rounded-md">Lesson Seems Empty</div>;
  }

  return (
    <div>
      <h1 className="text-xl mb-4 font-bold text-zinc-300 uppercase">ALL the lessons</h1>
      <ul className="text-sm space-y-2 text-zinc-600">
        {lessons.length ? (
          lessons.map((lesson, index) => <LessonItem key={index} lesson={lesson} index={index} />)
        ) : (
          <EmptyLesson />
        )}
      </ul>
    </div>
  );
}

export default Lessons;
