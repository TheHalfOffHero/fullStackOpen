import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  // Fetch data from server
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
  }, [])
  console.log('render', persons.length, 'persons')

  // Filter items with reduce method
  const filteredItems = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Add name to the list with event hook, checks if name is already in the list
  const addName = (event) => {
    console.log('addName', event)
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  // Event handlers for input fields
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      < Filter filter={searchTerm} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <div>debug: {newName}</div>
      < PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredItems} />
    </div>
  )
}

export default App