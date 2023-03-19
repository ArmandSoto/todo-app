import { useState } from 'react'
import TodoList from './components/TodoList'
import Header from './components/Header'
import './App.css'



function App() {

  return (
    <div className=" flex-col text-base font-extralight tracking-wide ">
       <Header />
      <section className="flex justify-center mt-4">
        <TodoList />
      </section>
      
    </div>
  )
}

export default App
