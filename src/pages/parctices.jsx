import React, { useState } from "react"
import Lessons from "../components/lessons"
import LessonsBody from "../components/lessonsBody"
import LessonsSummary from "../components/lessonsSummary"

const dummyQuest = {
  id: "docker-101",
  questName: "Docker",
  challanges: 32,
  lessonCount: 10,
  logo: "https://www.svgrepo.com/show/349342/docker.svg",
  lessons: [
    {
      id: "docker-101/docker-build",
      name: "Build Docker Image",
      summery: "Builds an image from a Dockerfile in the current directory.",
      command: "docker build"
    },
    {
      id: "docker-101/docker-run",
      name: "Run Container",
      summery: "Runs a container from a Docker image.",
      command: "docker run"
    },
    {
      id: "docker-101/docker-ps",
      name: "List Running Containers",
      summery: "Lists all currently running containers.",
      command: "docker ps"
    },
    {
      id: "docker-101/docker-ps-a",
      name: "List All Containers",
      summery: "Shows all containers, including stopped ones.",
      command: "docker ps -a"
    },
    {
      id: "docker-101/docker-images",
      name: "List Docker Images",
      summery: "Displays all locally stored Docker images.",
      command: "docker images"
    },
    {
      id: "docker-101/docker-rm",
      name: "Remove Container",
      summery: "Deletes one or more containers.",
      command: "docker rm"
    },
    {
      id: "docker-101/docker-rmi",
      name: "Remove Image",
      summery: "Deletes one or more Docker images.",
      command: "docker rmi"
    },
    {
      id: "docker-101/docker-stop",
      name: "Stop Container",
      summery: "Stops a running container.",
      command: "docker stop"
    },
    {
      id: "docker-101/docker-start",
      name: "Start Container",
      summery: "Starts a previously stopped container.",
      command: "docker start"
    },
    {
      id: "docker-101/docker-exec",
      name: "Execute Inside Container",
      summery: "Runs a command inside a running container.",
      command: "docker exec"
    },
    {
      id: "docker-101/docker-logs",
      name: "View Container Logs",
      summery: "Shows logs from a running or stopped container.",
      command: "docker logs"
    },
    {
      id: "docker-101/docker-pull",
      name: "Pull Docker Image",
      summery: "Downloads an image from Docker Hub.",
      command: "docker pull"
    },
    {
      id: "docker-101/docker-compose-up",
      name: "Start Multi-Container App",
      summery: "Starts services defined in docker-compose.yml.",
      command: "docker-compose up"
    },
    {
      id: "docker-101/docker-compose-down",
      name: "Stop Multi-Container App",
      summery: "Stops and removes services and networks.",
      command: "docker-compose down"
    },
    {
      id: "docker-101/docker-inspect",
      name: "Inspect Container",
      summery: "Returns detailed info on container or image.",
      command: "docker inspect"
    }
  ]
}

function AllParctices() {
  const [activeIndex, setActiveIndex] = useState(1)
  return (
    <>
      <div className="flex justify-between py-8 gap-8">
        <Lessons lessons={dummyQuest.lessons} activeIndex={activeIndex} />
        <LessonsBody
          lesson={dummyQuest.lessons[activeIndex]}
          setActiveIndex={setActiveIndex}
        />
        <LessonsSummary />
      </div>
    </>
  )
}

export default AllParctices
