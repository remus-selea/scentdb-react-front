import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop';


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

          <Route path="/about">
            <About />
          </Route>

          <Route path="/shop">
            <Shop />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );

}

export default App;
