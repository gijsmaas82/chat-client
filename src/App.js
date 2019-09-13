import React from 'react';
import './App.css';
import request from 'superagent'

class App extends React.Component {
  state ={ text: ''}
  
  source = new EventSource(
    'http://localhost:4000/stream'
    )
  
  componentDidMount() {
    this.source.onmessage = (event) => {
      const { data } = event
      console.log('data:', data)

      const messages = JSON.parse(data)
      console.log(
        'messages test:', messages
      )
    }
  }

  onChange = (event) => {
    const { target: { value } } = event
    console.log('value test:', value)

    this.setState({ text: value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { text } = this.state

    request
      .post('http://localhost:4000/message')
      .send( { text })
      .then(console.log)
      .catch(console.error)
  }

  render() {
  return (
    <div className="App">
      <form onSubmit={this.onSubmit}>
        <input 
        type='text'
        onChange={this.onChange}
        value={this.state.text} />
        <button > send </button>
      </form>
    </div>
  );
  }
}

export default App;
