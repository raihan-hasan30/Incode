import React from "react"
import Card from "../components/card"
import Searchbar from "../components/searchbar"
import { useSelector } from "react-redux"

function QuestListing() {
  const quests = useSelector(state => state.quest)

  return (
    <>
      <Searchbar />
      <div className="flex gap-4 justify-center">
        {quests.map(quest => (
          <Card key={quest.questName} quest={quest} />
        ))}
      </div>
    </>
  )
}

export default QuestListing
