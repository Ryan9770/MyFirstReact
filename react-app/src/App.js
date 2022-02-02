import React, {Component} from 'react';
import TOC from "./components/TOC"
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import './App.css';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
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
      mode:'welcome',
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
  getReadContent(){
    var i = 0;
      while(i < this.state.content.length){
        var data = this.state.content[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i += 1;
  }
}
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
    
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    
    } else if(this.state.mode === 'read'){
    
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    
    } else if(this.state.mode === 'create'){
    
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.content
        this.max_content_id = this.max_content_id+1;
        
        // push의 경우 original 데이터를 바꿔버림
        // this.state.content.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // concat은 데이터를 뒤에다가 추가함
        // var contents = this.state.content.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        var newContent = Array.from(this.state.content);
        newContent.push( {id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          content:newContent,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        var _content = Array.from(this.state.content);
        var i=0;
        while(i < _content.length){
          if(_content[i].id === _id){
            _content[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i+=1;
        }
        this.setState({
          content:_content,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
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
          if(mode==='delete'){
            if(window.confirm("삭제하시겠습니까?")){
              var _content = Array.from(this.state.content);
              var i =0;
              while(i< _content.length){
                if(_content[i].id===this.state.selected_content_id){
                  _content.splice(i,1);
                }
                i+=1;
              }
              this.setState({
                mode:'welcome',
                content:_content
              });
            }
          } else{
           this.setState({
            mode:mode
          });
        }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
