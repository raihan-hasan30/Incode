import React from "react"
import TypingArea from "./typing-area"

function LessonsBody({
  lesson,
  setActiveIndex,
  lessonHistory,
  setLessonHistory
}) {
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl text-white font-bold">
          {lesson.name}
        </h1>
        <h3 className="text-zinc-400 mt-4">{lesson.summery}</h3>
        <TypingArea
          key={lesson.id}
          id={lesson.id}
          lessonHistory={lessonHistory}
          setLessonHistory={setLessonHistory}
          command={lesson.command}
          nextCommand={() => {
            setActiveIndex(prev => prev + 1)
          }}
          isReady={true}
        />

        <div className="flex justify-between text-zinc-500">
          <button
            onClick={() => {
              setActiveIndex(prev => {
                if (prev > 0) {
                  return prev - 1
                } else {
                  return 0
                }
              })
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setActiveIndex(prev => prev + 1)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default LessonsBody
