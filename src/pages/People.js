import { useState } from 'react';
import { Link } from 'react-router-dom';

function People(props) {

    // state to hold form data
    const [newForm, setNewForm] = useState({
        name: '',
        image: '',
        title: ''
    })

    const [newQuery, setNewQuery] = useState('')

    // handle change function for form
    const handleChange = (event) => {
        setNewForm({...newForm, [event.target.name]: event.target.value})
        console.log(newForm)
    }

    const handleQueryChange = (event) => {
        setNewQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createPeople(newForm);
        setNewForm({
            name: '',
            image: '',
            title: ''
        })
    }

    const handleQuerySubmit = (event) => {
        event.preventDefault();
        props.queryRunner(newQuery)
        setNewQuery('')
    }

    const loaded = () => {
        return props.people.map((person) => (
                <div key={person._id} className='person'>
                    <Link to={`/${person._id}`}>
                        <h1>{person.name}</h1>
                    </Link>
                        <img src={person.image} alt={person.name} />
                        <h3>{person.title}</h3>
                    <Link to={`/${person._id}`}>Delete This</Link>
                </div>
            )
        )
    }

    const loading = () => {
        return <h1>Loading.........</h1>
    }

    return (
        <section>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={newForm.name}
                        name='name'
                        placeholder='name'
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        value={newForm.image}
                        name='image'
                        placeholder='image URL'
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        value={newForm.title}
                        name='title'
                        placeholder='title'
                        onChange={handleChange}
                    />
                    <input type='submit' value='Create Person!' />
                </form>
                <form onSubmit={handleQuerySubmit} >
                    <input
                        type='text'
                        value={newQuery}
                        name='query'
                        placeholder='query'
                        onChange={handleQueryChange}
                    />
                </form>
                {props.people ? loaded() : loading()}
            </section>
        )
}

export default People