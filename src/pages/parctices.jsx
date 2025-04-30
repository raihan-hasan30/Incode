import React from "react"
import Lessons from "../components/lessons"
import LessonsBody from "../components/lessonsBody"
import LessonsSummary from "../components/lessonsSummary"

function AllParctices() {
  return (
    <>
      <div className="flex justify-between ml-4">
        <Lessons />
        <LessonsBody />
        <LessonsSummary />
      </div>
    </>
  )
}

export default AllParctices
