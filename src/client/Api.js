import axios from "axios";
// using axois instead of fetch()
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

// right now only one function (insertUser) is used and called from inside useForm
export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis