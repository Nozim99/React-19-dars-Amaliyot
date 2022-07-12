import { Component } from "react";
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      isCounting: false,
    }
  }

  componentDidMount() {
    console.log('Mount');
    // userCount ma'lumot turi string bo'ladi
    const userCount = localStorage.getItem("timer");
    if(userCount){
      this.setState({count: +userCount})
    }
  }

  componentDidUpdate() {
    console.log('Update');
    localStorage.setItem("timer", this.state.count)
  }

  componentWillUnmount() {
    console.log('Unmount');
    clearInterval(this.counterId)
  }

  handleStart = () => {
    this.setState({ isCounting: true })
    // this.counterId ni funksiyadan tashqarida ishlatsa bo'ladi
    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }

  handleStop = () => {
    this.setState({ isCounting: false })
    clearInterval(this.counterId)
  }

  HandleReset = () => {
    this.setState({ isCounting: false, count: 0 })
    clearInterval(this.counterId)
  }


  render() {
    return (
      <div className="square">
        <div className="container">
          <h1 className="h1">React Timer</h1>
          <h1>{this.state.count}</h1>
          {this.state.isCounting ? (<button className="stop" onClick={this.handleStop}>Stop</button>) :
            (<button className="start" onClick={this.handleStart}>Start</button>)}
          <button onClick={this.HandleReset}>Reset</button>
        </div>
      </div>
    )
  }
}