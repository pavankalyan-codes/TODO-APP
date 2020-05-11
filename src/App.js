import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import FinalExam from './FinalExamApp';
import { SnackbarProvider } from 'notistack';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SnackbarProvider >

        <FinalExam></FinalExam>
        </SnackbarProvider>
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

