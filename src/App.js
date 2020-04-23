import React, { Component } from 'react';
import './App.css'
import './bootstrap.css'
import TodoApp from './todo/TodoApp';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp></TodoApp>
            {/* <Counter /> */}
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

