import React, {Component} from 'react';
import TOC from "./components/TOC"
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

// 생성자
// Component의 속성(props)에 생성자 안에있는 state를 사용
// constructor(props)..
// this.state={}...
// Component attribute={this.props}
class App extends Component {
  constructor(props){ // 제일먼저 실행되며 초기화 담당..init()?
    super(props);
    this.state={
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'welcome', desc:'Hello, React!!'},
      content:[
        {id:1, title:'HTML', desc:'HTML is for information...'},
        {id:2, title:'CSS', desc:'CSS is for design...'},
        {id:3, title:'JAVASCRIPT', desc:'JS is for interactive...'}
      ]
    }
  }
  render() {
    console.log("App Rendering!");
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.content.length){
        var data = this.state.content[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i += 1;
      }
    }
    return (
      <div className="App">
        <Subject title={this.state.subject.title} 
        sub={this.state.subject.sub} 
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
        ></Subject>
        <TOC 
        onChangePage={function(id){
          this.setState({mode:'read',
          selected_content_id:Number(id)
        });
        }.bind(this)} 
        data={this.state.content}
        ></TOC>
        <Content title={_title} desc={_desc}
        ></Content>        
      </div>
    );
  }
}

export default App;
