import React, { Component } from 'react';
import './App.css'
import './bootstrap.css'
import TodoApp from './todo/TodoApp';
import ExamComponent from './exam/ExamComponent'
class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp></TodoApp>
        {/* <ExamComponent></ExamComponent> */}
      </div>
    );
  }
}
// class LearningComponents extends Component{
//   render() {
//     return (
//       <div className="LearningComponents">
//         My Hello World!
//         <FirstComponent></FirstComponent>
//         <SecondComponent></SecondComponent>
//         <ThirdComponent></ThirdComponent>
//       </div>
//     );
//   }
// }
export default App;

