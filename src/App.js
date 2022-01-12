import React from "react"
import "./App.css"

import axios from "axios"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
    this.host = "http://localhost:3001/"
  }

  componentDidMount() {
    axios
      .get(`${this.host}todos`)
      .then(res => {
        this.setState({ todos: res.data })
      })
      .catch(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <div className="App">
      </div>
    )
  }
}

export default App