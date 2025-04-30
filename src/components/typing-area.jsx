import React, { useState, useEffect } from "react"

function TypingArea({ command, nextCommand, isReady }) {
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    if (!isReady) return

    const handleKeyDown = event => {
      if (event.key === "Tab") {
        event.preventDefault()
        if (typedText.length >= command.length) {
          nextCommand()
          setTypedText("")
        }
      } else if (event.key === "Backspace") {
        setTypedText(prev => prev.slice(0, -1))
      } else if (event.key.length === 1) {
        setTypedText(prev => prev + event.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isReady, typedText, command, nextCommand])

  const renderCharacters = () => {
    const chars = command.split("")
    const typedChars = typedText.split("")
    const elements = []

    for (let i = 0; i < chars.length; i++) {
      let className = "text-zinc-700"
      if (i < typedChars.length) {
        if (typedChars[i] === chars[i]) {
          className = "text-amber-700"
        } else {
          className = "text-red-700"
        }
      }
      elements.push(
        <span key={i} className={className}>
          {chars[i]}
        </span>
      )
    }

    return elements
  }

  return (
    <div className="min-h-96 flex items-center justify-center relative">
      <h2 className="text-2xl font-bold">{renderCharacters()}</h2>
      {typedText.length >= command.length && (
        <button
          onClick={nextCommand}
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tab
        </button>
      )}
    </div>
  )
}

export default TypingArea
