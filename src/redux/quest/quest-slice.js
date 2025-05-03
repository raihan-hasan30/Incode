import { createSlice } from "@reduxjs/toolkit"

const initial = [
  {
    id : "docker-101",
    questName: "Docker",
    challanges: 32,
    lessons: 10,
    logo: "https://www.svgrepo.com/show/349342/docker.svg"
  },
  {
    id : "python-101",
    questName: "Python",
    challanges: 22,
    lessons: 30,
    logo: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=4472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id : "javascript-101",
    questName: "Javascript",
    challanges: 12,
    lessons: 10,
    logo: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=4472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id : "java-101",
    questName: "Java",
    challanges: 22,
    lessons: 20,
    logo: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=4472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

const questSlice = createSlice({
  name: "quest",
  initialState: initial,
  reducers: {
    increment: state => {
      state.value += 1
    }
  }
})
export const { increment } = questSlice.actions
export default questSlice.reducer
