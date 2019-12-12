import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Preflop from 'Preflop/Preflop'
import './App.css'

const App = () => {
  return (
    <Tabs defaultActiveKey="preflop" className="App">
      <Tab eventKey="preflop" title="Preflop">
        <Preflop />
      </Tab>
      <Tab eventKey="postflop" title="Postflop">
      </Tab>
    </Tabs>
  )
}

export default App
