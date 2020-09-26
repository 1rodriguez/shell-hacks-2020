import React from 'react';
import './App.css';

import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'

import SubmitPage from './components/SubmitPage'
import ResultPage from './components/ResultPage'

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/" component={SubmitPage}/>
          <Route path="/result" component={ResultPage}/>
        </Switch>
      </Router>


     
    </div>
  );
}

export default App;
