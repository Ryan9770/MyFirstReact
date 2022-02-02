import React, {Component} from 'react';
import TOC from "./components/TOC"
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import './App.css';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
// 생성자
// Component의 속성(props)에 생성자 안에있는 state를 사용
// constructor(props)..
// this.state={}...
// Component attribute={this.props}
class App extends Component {
  constructor(props){ // 제일먼저 실행되며 초기화 담당..init()?
    super(props);
    this.max_content_id= 3;
    this.state={
      mode:'create',
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
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
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
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.content
        this.max_content_id = this.max_content_id+1;
        
        // push의 경우 original 데이터를 바꿔버림
        // this.state.content.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // concat은 데이터를 뒤에다가 추가함
        var contents = this.state.content.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          content:contents
        });
      }.bind(this)}></CreateContent>
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
        <Control onChangeMode={function(mode){
          this.setState({
            mode:mode
          });
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
