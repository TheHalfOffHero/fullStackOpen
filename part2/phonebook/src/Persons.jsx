/* eslint-disable react/prop-types */
const Persons = ({ filteredPersons, deletePerson }) => {

    return (
    <div>
        {filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>)}
    </div>
    )
}

export default Persons