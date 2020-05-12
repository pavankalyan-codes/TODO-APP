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
    fetchAllExams()
    {
        return axios.get(`http://localhost:8080/FetchAll`)
    }
    submitExam(examid,answers)
    {
        return axios.post(`http://localhost:8080/SubmitExam`,{
            examid,
            answers
        })
    }
    getProfile(_id)
    {   
        return axios.post(`http://localhost:8080/getProfile`,{
            _id
        })
    }
    updateProfile(_id,name,email,password)
    {   
        return axios.post(`http://localhost:8080/updateProfile`,{
            _id,
            name,
            email,
            password
        })
    }
    createExam(_id,subject,questions)
    {   
        return axios.post(`http://localhost:8080/CreateExam`,{
            _id,
            subject,
            questions
        })
    }
}
export default new OAPAuthenticationService()