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
}
export default new OAPAuthenticationService()