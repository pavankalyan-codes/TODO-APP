import React, { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import './App.css'
import './bootstrap.css'
import TodoApp from './todo/TodoApp';
import Counter from './components/counter/Counter';
import CounterButton from './components/counter/Counter';
 
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
class LearningComponents extends Component{
  render() {
    return (
      <div className="LearningComponents">
        My Hello World!
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}
export default App;

