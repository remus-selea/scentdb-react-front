import './App.scss';
import Header from './components/header/Header';
import Main from './components/Main';
import Footer from './components/footer/Footer';
import Home from './components/Home';
import Perfumes from './components/perfumes/Perfumes';
import React from "react";
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  return (
    
    <Router>
      <div className="App">
      <Header/> 
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/perfumes">
            <Perfumes />
          </Route>
        </Switch>

      </div>
    </Router>
  );

}

export default App;
