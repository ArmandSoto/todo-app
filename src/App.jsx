import { useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center">
      <TodoList />
    </div>
  )
}

export default App
