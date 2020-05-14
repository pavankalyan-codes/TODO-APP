import axios from 'axios'
class OAPAuthenticationService{
    makeLogin(_id,password)
    {
        return axios.post(`http://localhost:8080/login`,{
            _id,
            password
        })
    }
    registerSuccessfulLogin(userId)
    {
        sessionStorage.setItem('authenticatedUser',userId);

    }
    getLoggedInUsername()
    {
        let user=sessionStorage.getItem('authenticatedUser')
        if(user===null) return ''
        return user
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
    fetchExam(examId,studentId)
    {
        return axios.post(`http://localhost:8080/getQuestions`,{
            examId,
            studentId
        })
    }
    fetchAllExams()
    {
        return axios.get(`http://localhost:8080/FetchAll`)
    }
    submitExam(examId,studentId,date,submittedAnswers)
    {
        return axios.post(`http://localhost:8080/saveExam`,{
            examId,
            studentId,
            date,
            submittedAnswers
        })
    }
    getScore(examId,studentId)
    {
        return axios.post(`http://localhost:8080/getScores`,{
            examId,
            studentId
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
    createExam(_id,subject,minutes,marksForEach,questions)
    {   
        return axios.post(`http://localhost:8080/CreateExam`,{
            _id,
            subject,
            minutes,
            marksForEach,
            questions
        })
    }
}
export default new OAPAuthenticationService()