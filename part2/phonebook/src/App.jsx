import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/Persons'
import Notification from './components/Notification'

const Filter = ({newSearchName, setSearchName}) => {
  const handleNewSearchName = (event) => {
    setSearchName(event.target.value);
  }
  return (
    <div>
      filter shown with a <input value={newSearchName} onChange={handleNewSearchName}/>
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleNewPerson, handleOnChangeName, handleOnChangeNumber}) => {
  return (
    <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChangeName}/>
        </div>
         <div>number: <input value={newNumber} onChange={handleOnChangeNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({newSearchName, persons, handleDeletePerson}) => {
  const predicate = name => name
    ? name.toLowerCase().startsWith(newSearchName.toLowerCase())
    : [];
  persons.forEach(person => console.log(person.name))
  const filteredPersons = persons.filter(person => predicate(person.name));
  return (
    <div>
      {filteredPersons.map(person => (
          <div key={person.id}>
            <p>{person.name} {person.number}</p> <button type="submit" onClick={() => handleDeletePerson(person)}>delete</button>
          </div>
        ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(response => 
        setPersons(response.data))
  }, [])

  const alreadyInPhoneBook = (newName, newNumber) => persons.some(person => person.name === newName 
                                                        && person.number === newNumber)
  const needUpdate = (newNumber, newName) => persons.some(person => person.number !== newNumber
                                                      && person.name === newName)
  const findId = newName => persons.find(person => person.name === newName);

  const handleNewPerson = (event) => {
    event.preventDefault();
    // if the person already in phonebook, then alert
    if (alreadyInPhoneBook(newName, newNumber)) {
      alert(`${newName} is already added to phonebook`);
    } else if (needUpdate(newNumber, newName)) {
      console.log("need update");
      if (window.confirm(`${newName} has already been added to the phonebook, replace their number ?`)) {
        const newPerson = {
          name: newName,
          number: newNumber,
          id : findId(newName).id
        }
        personServices
          .update(newPerson)
          .then(response => {
            setPersons(persons.filter(person => person.id !== newPerson.id).concat(response.data));
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setErrorMessage(`Information of ${newName} has already been removed from the server.`);
            setTimeout(() => setErrorMessage(null), 5000)
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id : persons.length + 1
      }
      personServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setErrorMessage(`${newName} has been added to the phonebook.`);
          setTimeout(() => setErrorMessage(null), 5000);
        })
    }
  }

  const handleDeletePerson = (person) => {
    if (window.confirm("u sure u wanna delete this bro?")) {
      personServices
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id != person.id))
      })
    } else {

    }
  }

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={errorMessage} />
      <Filter newSearchName={newSearchName} setSearchName={setSearchName}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNewPerson={handleNewPerson} handleOnChangeName={handleOnChangeName}
                  handleOnChangeNumber={handleOnChangeNumber} />
      <h2>Numbers</h2>
      <Persons newSearchName={newSearchName} persons={persons} 
               handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App
