import React, { useEffect, useState } from 'react'
import './App.css'
import Note from './Note';
import axios from 'axios'
const App = () => {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState([]);
  const [noteText, setNoteText] = useState('');

  const handleChange = (e) => {
    e.preventDefault()
    setNoteText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newNote = {
      id: note.length === 0 ? 1 : note[note.length - 1].id + 1,
      content: noteText,
      complete: false
    }
    setNote([...note, newNote])
  }
  const remove = (id) => {
    const filterID = note.filter((item) => item.id !== id)
    setNote(filterID)
  }
  const completeID = (id) => {
    setNote(note.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete
      } return item
    }))
  }
  const [catFact, setCatFact] = useState('')


  const factCat = () => axios.get('https://catfact.ninja/fact').then(res => setCatFact(res.data))

  useEffect(() => {
    factCat()
  }, [])


  const [age, setAge] = useState('')
  const [youAge, setYouAge] = useState(null)

  const ageInput = (e) => {
    setAge(e.target.value)
  }

  const getAge = () => {
    axios.get(`https://api.agify.io/?name=${age}`).then(res => setYouAge(res.data))
  }

  // useEffect(() => {
  //   getAge(age)
  // }, [age])
  // console.log(note);
  // console.log(youAge)


  const [reasons, setReasons] = useState([])
  const getExcuse = (excuse) => axios.get(`https://excuser.herokuapp.com/v1/excuse/${excuse}`).then(res => setReasons(res.data))


  console.log(reasons)
  return (
    <div className='App'>
      <input onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => setShow(() => !show)}>show</button>
      {show && note.map(note => (
        <Note id={note.id} text={note.content} remove={remove} complete={completeID} completeID={note.complete} />
      )
      )}
      <div>
        <button onClick={factCat}>Generate cat fact</button>
        <p>{catFact.fact}</p>

      </div>
      <div>
        <input onChange={ageInput} />
        <button onClick={getAge}>Submit</button>
        <h2>Your Age {youAge?.age}</h2>
        <h2>Your Count {youAge?.count}</h2>
        <h2>Your Name {youAge?.name}</h2>

      </div>
      <div>
        <h1>Generate an Excuse</h1>
        <button onClick={() => getExcuse('party')} >Party</button>
        <button onClick={() => getExcuse('family')} >Family</button>
        <button onClick={() => getExcuse('office')}>Office</button>
        <br />
        {reasons.map((item) => (
          <p>{item.excuse}</p>
        ))}

      </div>
    </div >
  )
}

export default App