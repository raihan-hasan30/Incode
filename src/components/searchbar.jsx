import React from "react"

function Searchbar() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1 text-white flex justify-center">
        AVAILABLE QUESTS
      </h1>
      <div className="text-gray-400 text-sm mb-8 flex justify-center">
        DISPLAYS CONTAINER ID, IMAGE NAME, STATUS, AND OTHER DETAILS OF RUNNING
        CONTAINERS
      </div>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          className="bg-[#1e1e1e] border-none rounded-md py-3 px-5 w-full max-w-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          placeholder="Search"
        />
      </div>
    </div>
  )
}

export default Searchbar
