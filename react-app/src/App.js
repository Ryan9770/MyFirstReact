import React, {Component} from 'react';
import TOC from "./components/TOC"
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';



class App extends Component {
  constructor(props){ // 제일먼저 실행되며 초기화 담당..init()?
    super(props);
    this.state={
      subject:{title:'WEB', sub:'world wide web!'}
    }
  }
  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} 
        sub={this.state.subject.sub} ></Subject>
        <Subject title="React" sub="For UI"></Subject>
        <TOC></TOC>
        <Content></Content>        
      </div>
    );
  }
}

export default App;
