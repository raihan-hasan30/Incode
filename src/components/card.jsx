import React from "react"
import { Link } from "react-router"

function Card({ quest }) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-5 w-64 transition-transform duration-300 hover:-translate-y-1 ">
      <img src={quest.logo} className="w-12 h-12 mb-4" />
      <h1 className="text-white text-2xl font-bold mb-5">{quest.questName}</h1>
      <div className="flex items-center mb-2 text-gray-400">
        <img
          src="/tick.svg"
          alt="tick"
          className="w-4 h-4 text-yellow-400 mr-2"
        />
        <span>{quest.lessons}</span>
      </div>
      <div className="flex items-center mb-2 text-gray-400">
        <img
          src="/tick.svg"
          alt="tick"
          className="w-4 h-4 text-yellow-400 mr-2"
        />
        <span>{quest.challanges}</span>
      </div>
      <div className="flex justify-between mt-8">
        <Link to={`/practice/${quest.id}`} className="flex items-center text-gray-400 hover:text-white text-sm">
          <img
            src="/link.svg"
            alt="link"
            className="w-4 h-4 text-yellow-400 mr-2"
          />
          <span className="mr-1"></span> Practice
        </Link>

        <button className="flex items-center text-gray-400 hover:text-white text-sm">
          <img
            src="/link.svg"
            alt="link"
            className="w-4 h-4 text-yellow-400 mr-2"
          />
          <span className="mr-1"></span> Battle
        </button>
      </div>
    </div>
  )
}

export default Card
