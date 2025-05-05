import React, { useState } from "react"
import Lessons from "../components/lessons"
import LessonsBody from "../components/lessonsBody"
import LessonsSummary from "../components/lessonsSummary"

const dummyQuest = {
  id: "react-101",
  questName: "React Basics",
  challanges: 20,
  lessonsCount: 12,
  logo: "https://www.svgrepo.com/show/452092/react.svg",
  lessons: [
    {
      id: "react-101/create-component",
      name: "Create a React Component",
      summery: "Defines a reusable UI block using a function.",
      command: "function MyComponent() { return <div>Hello</div>; }"
    },
    {
      id: "react-101/export-component",
      name: "Export a Component",
      summery: "Makes a component available for import in other files.",
      command: "export default MyComponent;"
    },
    {
      id: "react-101/import-component",
      name: "Import a Component",
      summery: "Loads a component into another file for usage.",
      command: "import MyComponent from './MyComponent';"
    },
    {
      id: "react-101/props-basic",
      name: "Pass Props to Component",
      summery: "Sends data to a child component via attributes.",
      command: "<Greeting name='John' />"
    },
    {
      id: "react-101/props-object",
      name: "Pass Props as Object",
      summery: "Passes props as a single object using spread syntax.",
      command: "<Greeting {...user} />"
    },
    {
      id: "react-101/props-function",
      name: "Pass Function as Prop",
      summery: "Sends a callback function to a child component.",
      command: "<Button onClick={handleClick} />"
    },
    {
      id: "react-101/props-children",
      name: "Using Children Prop",
      summery: "Passes JSX as nested children inside a component.",
      command: "<Card><p>Hello</p></Card>"
    },
    {
      id: "react-101/use-props",
      name: "Access Props in Component",
      summery: "Reads props in the component for rendering dynamic data.",
      command: "function Greeting({ name }) { return <p>{name}</p>; }"
    },
    {
      id: "react-101/useState-import",
      name: "Import useState Hook",
      summery: "Imports the useState hook from React to use local state.",
      command: "import { useState } from 'react';"
    },
    {
      id: "react-101/useState-initial",
      name: "Declare State with useState",
      summery: "Creates a state variable and its setter.",
      command: "const [count, setCount] = useState(0);"
    },
    {
      id: "react-101/setState-update",
      name: "Update State with setState",
      summery: "Changes the state value and re-renders the component.",
      command: "setCount(count + 1);"
    },
    {
      id: "react-101/state-in-jsx",
      name: "Render State in JSX",
      summery: "Displays a state variable inside JSX.",
      command: "<p>Count: {count}</p>"
    }
  ]
}

function AllParctices() {
  const [lessonHistory, setLessonHistory] = useState({})
  const [activeIndex, setActiveIndex] = useState(5)
  return (
    <>
      <div className="flex justify-between py-8 gap-8">
        <Lessons lessons={dummyQuest.lessons} activeIndex={activeIndex} />
        <LessonsBody
          lesson={dummyQuest.lessons[activeIndex]}
          setActiveIndex={setActiveIndex}
          lessonHistory={lessonHistory}
          setLessonHistory={setLessonHistory}
        />
        <LessonsSummary />
      </div>
    </>
  )
}

export default AllParctices
