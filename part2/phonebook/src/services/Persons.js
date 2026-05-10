import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseURL)
const create = newPerson => axios.post(baseURL, newPerson);
const remove = id => axios.delete(`${baseURL}/${id}`);
const update = newPerson => axios.put(`${baseURL}/${newPerson.id}`, newPerson)

export default { getAll, create, remove, update };