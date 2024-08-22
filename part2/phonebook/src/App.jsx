import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)


  // Fetch data from server
  useEffect(() => {
    console.log('effect')
    personService.getAll()
          .then(initialPersons => {
            console.log('promise fulfilled')
            setPersons(initialPersons)
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        
        personService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        return
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService.create(nameObject)
    .then(newPerson => {
      console.log(newPerson)
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }).then(() => {
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
        personService.remove(id)
        .then(() => {
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setPersons(persons.filter(person => person.id !== id))
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
      <Notification message={message} />
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
      <Persons filteredPersons={filteredItems} deletePerson={deletePerson}/>
    </div>
  )
}

export default App