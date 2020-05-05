import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import FinalExam from './FinalExamApp';
class App extends Component {
  render() {
    return (
      <div className="App">
        <FinalExam></FinalExam>
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

