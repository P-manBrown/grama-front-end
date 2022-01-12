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

  deleteTodo = id => {
    const { todos } = this.state

    axios
      .delete(`${this.host}todos/${id}`)
      .then(res => {
        this.setState({
          todos: todos.filter(todo => {
            return todo.id !== id
          }),
        })
      })
      .catch(data => {
        console.log(data)
      })
  }

  addTodo = todo => {
    const { todos } = this.state
    axios
      .post(`${this.host}todos`, todo)
      .then(res => {
        this.setState({
          todos: [...todos, res.data],
        })
      })
      .catch(data => {
        console.log(data)
      })
  }
}

export default App