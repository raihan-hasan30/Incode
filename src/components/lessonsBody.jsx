import React from "react"
import TypingArea from "./typing-area"

function LessonsBody() {
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl text-white font-bold">
          LIST RUNNING CONTAINER
        </h1>
        <h3 className="text-zinc-400 mt-4">
          DISPLAYS CONTAINER ID,IMAGE NAME ,STATUS AND OTHER DETAILS OF RUNNING
          CONTAINER
        </h3>
        <TypingArea command={"heloo"} nextCommand={() => {}} isReady={true} />
        <div className="flex justify-between">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  )
}

export default LessonsBody
