import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('https://be-fmbi.onrender.com')
      .then((res) => {
        setUsers(res.data.message)
        console.log(res.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  users.sort((a, b) => b.score - a.score)

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    const formattedDate = date.toLocaleDateString('en-GB')
    const formattedTime = date.toLocaleTimeString()
    return { formattedDate, formattedTime }
  }
  const reset=()=>{
    axios.delete('https://be-fmbi.onrender.com/reset')
    .then((res)=>{
      console.log(res.data.message)
      setUsers([])
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
    <div class="divss">
      <h1>SolveMath</h1>
      <h2>Total Players : {users.length}</h2>
    </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Score</td>
            <td>Level</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const { formattedDate, formattedTime } = formatDateTime(user.time)
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.score}</td>
                <td>{user.level}</td>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={reset}>RESET</button>
    </>
  )
}

export default App