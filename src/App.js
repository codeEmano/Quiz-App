import React from 'react';
import QuizData from './QuizData'
class App extends React.Component
 {
  constructor()
  {
    super();
    this.state=
    {
        question:"",
        userAns:null,
        currentQues:0,
        options:[],
        answers:[],
        disabled:true,
        quizEnd:false,
        score:0,
        myAns:[]
    }
  }
  loadQuiz= () =>{
    const {currentQues} = this.state
    this.setState(() => {
      return {
        question:QuizData[currentQues].question,
        options:QuizData[currentQues].options,
        answers:QuizData[currentQues].answer
      }
    })
  }
  componentDidMount()
  {
    this.loadQuiz()
  }
  nextQuestion= ()=>{
        //const {userAns,answers,score} = this.state
    this.setState({
      currentQues:this.state.currentQues+1
    })
    /*if (userAns === answers) {
      this.setState({score:score+1})
    }*/
   // console.log(score)
  }
  componentDidUpdate(prevProp,prevState)
  {
    const {currentQues, userAns, answers, score}=this.state

    if(currentQues!==prevState.currentQues) {
      if (userAns === answers) {
      this.setState({score:score+1})
    }
      this.setState(() =>{
        return {
          question:QuizData[currentQues].question,
          options:QuizData[currentQues].options,
          answers:QuizData[currentQues].answer,
          disabled:true
        }
      })
    }
  }
  checkAnswer= (option) => {
    var {myAns} = this.state
    this.setState(() =>{
      return {
        userAns:option,
        myAns:myAns.concat(option),
        disabled:false
      }
    })
    /* if (userAns === answers) {
      this.setState({score:score+1})
    }*/
  }
  lastQuestion= ()=> {
    const {userAns,answers,score} = this.state
    this.setState({quizEnd:true,disabled:false})
    if (userAns === answers) {
      this.setState({score:score+1})
    }
    console.log(score)
  }
  removeDup=(array) => {return array.filter((a, b) => array.indexOf(a) === b)}
  render()
  {
    const { userAns, question, options ,currentQues, quizEnd, score }=this.state
    if (quizEnd) {
      return  <div><h2 align="center">Thanks for taking the quiz,
      your score is {score}/5</h2>
      <h3 align="center">Your answers:</h3>
      {this.removeDup(this.state.myAns).map((item,index) =><p key={index} align="center" 
      className="ui floating message">{item}</p> )}
      <h3 align="center">The correct answers were: </h3>
      {
        QuizData.map((item,index) =><p key={index} align="center" 
      className="ui floating message">{item.answer}</p> )
      }</div>
    }
    return (
      <div>
      <h2 align="center">{question}</h2>
      <br />
      <p align="center">{`Question ${currentQues+1} of ${QuizData.length}`}</p>
      {options.map(option => (<p key={option.id} align="center" 
      className={`ui floating message options  
      ${userAns === option ? "selected" : null}`}
      onClick={() => this.checkAnswer(option)}>{option}</p>))}
      <p align="center">
        {currentQues < QuizData.length-1 && 
        <button onClick={this.nextQuestion} 
        disabled={this.state.disabled}>Next</button>}</p>
        <p align="center">{currentQues === QuizData.length-1 && 
        <button onClick={this.lastQuestion}
        disabled={this.state.disabled}>Finish</button>}
      </p>

      </div>
      )
  }
}

export default App;
