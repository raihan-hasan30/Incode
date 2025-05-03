import React from "react"

function LessonsSummary() {
  return (
    <>
      <div className="flex flex-col align-self: center ">
        <div className="mb-7">
          <div className="flex gap-2">
            <span>
              <img src="./tick.svg" />
            </span>
            <p className="text-zinc-500">Attempt : 20</p>
          </div>
          <div className="flex gap-2">
            <span>
              <img src="./tick.svg" />
            </span>
            <p className="text-zinc-500">wrong : 20</p>
          </div>
          <div className="flex gap-2">
            <span>
              <img src="./tick.svg" />
            </span>
            <p className="text-zinc-500">Remaining : 20</p>
          </div>
          <div className="flex gap-2">
            <span>
              <img src="./tick.svg" />
            </span>
            <p className="text-zinc-500">completed : 20</p>
          </div>
        </div>
        <div className="mt-11">
          <h2>Share on Social Media</h2>
          <div className="h-2 w-2 bg-zinc-300"></div>
        </div>
      </div>
    </>
  )
}

export default LessonsSummary
