import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import TaskDetails from "./components/TaskDetails"


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks')
    const data = await res.json()

    console.log(data)
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await res.json()

    console.log(data)
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:3001/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data]);


  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => (
      task.id !== id
    )))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()
    // const taskToToggle = await fetchTask(id).then(data => {
    //     fetch(`http://localhost:3001/tasks/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(...data, !data.reminder)
    //   })
    // }

    // const res = await fetch(`http://localhost:3001/tasks/${id}`,
    // method: 'UPDATE',
    // headers: {
    //   'Content-type': 'application/jso'
    // },
    // body: JSON.stringify({...task, reminder: !(res.json().)}))

    setTasks(tasks.map((taskToToggle) =>
      taskToToggle.id === id ?
        { ...taskToToggle, reminder: !taskToToggle.reminder }
        : taskToToggle))
  }

  return (
    <Router>
      <div className="container">
        <Header title='Tracker App' onAdd={() => setShowAddTask(!showAddTask)} addFlag={showAddTask} />
        {/* {showAddTask && <AddTask onAdd={addTask} />} */}


        <Routes>
          <Route path='/'
            element={
              <>
                {showAddTask ? <AddTask onAdd={addTask}
                  toggleForm={() => setShowAddTask(!showAddTask)} /> : ''}

                {tasks.length !== 0 ?
                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                  : 'No Tasks'}
              </>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}


export default App;
