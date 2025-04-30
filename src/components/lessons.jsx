import React from "react"

function Lessons() {
  const allLessons = [
    {
      name: "array-join"
    },
    {
      name: "array-slice"
    },
    {
      name: "array-reduce"
    },
    {
      name: "array-sum"
    }
  ]
  return (
    <div>
      <h1 className="text-2xl mb-4">ALL the lessons</h1>
      {allLessons.map(lesson => (
        <ul key={lesson.name} className="flex gap-2 text-lg">
          <span>{">"}</span>
          <li className="text-zinc-400">{lesson.name}</li>
        </ul>
      ))}
    </div>
  )
}

export default Lessons
