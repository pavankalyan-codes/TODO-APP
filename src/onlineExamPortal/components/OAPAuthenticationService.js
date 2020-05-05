import axios from 'axios'
class OAPAuthenticationService{
    makeLogin(_id,password)
    {
        return axios.post(`http://localhost:8080/login`,{
            _id,
            password
        })
    }
    createAccount(name,_id,email,password)
    {
        return axios.post(`http://localhost:8080/Register`,{
            _id,
            name,
            email,
            password
        })
    }
    fetchExam(_id)
    {
        return axios.post(`http://localhost:8080/FetchExam`,{
            _id
        })
    }
}
export default new OAPAuthenticationService()