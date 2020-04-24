import React, {Component} from 'react'
import TodoDataService from '../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService.js'
class ListTodosComponent extends Component{
    constructor(props){
        console.log('constructor')
        super(props)
        this.state={
            todos : 
            [
         
            ],
            message:null
        }
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this)
        this.refershTodos=this.refershTodos.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
    }
    componentWillUnmount() {
        console.log('componentUnMount')
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true

    }
    componentDidMount(){
        console.log('componenetDidMount')
        this.refershTodos()
        console.log(this.state)
    }
    refershTodos() {
        let username=AuthenticationService.getLoggedInUserName
        //console.log(username+"------------------")
        TodoDataService.retrieveAllTodos(username)
         .then(
             response =>{
                 //console.log(response)
                 this.setState({todos: response.data})
             }
         )  
    }
    deleteTodoClicked(id) {
        let username=AuthenticationService.getLoggedInUserName();
        //console.log(id+" "+username);
        TodoDataService.deleteTodo(username,id)
         .then(
             response => {
                 this.setState({
                     message:`Delete of todo ${id} successfull`
                 })
                 this.refershTodos()
             }
         )
    }
    updateTodoClicked(id) {
        console.log('update clicked'+id)
        let username=AuthenticationService.getLoggedInUserName();
        //console.log(id+" "+username);
        this.props.history.push(`/todos/${id}`)
        
        // let username=AuthenticationService.getLoggedInUserName();
        // //console.log(id+" "+username);
        // TodoDataService.deleteTodo(username,id)
        //  .then(
        //      response => {
        //          this.setState({
        //              message:`Delete of todo ${id} successfull`
        //          })
        //          this.refershTodos()
        //      }
        //  )
    }
    render() {
        console.log('render')
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>IsCompleted</th>
                                <th>Target Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListTodosComponent