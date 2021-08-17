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
import PerfumeDetails from './components/perfumes/PerfumeDetails';
import PerfumeContributionForm from './components/perfumes/contribution/PerfumeForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Notes from './components/notes/Notes'
import NoteContributionForm from './components/notes/NoteContributionForm'
import CompanyContributionForm from './components/brands/CompanyContributionForm'
import Perfumers from './components/perfumers/Perfumers'
import Brands from './components/brands/Brands'

import GenderFilterProvider from './contexts/GenderFilterContext'
import YearFilterProvider from './contexts/YearFilterContext';
import PerfumeTypeFilterProvider from './contexts/PerfumeTypeFilterContext';
import BrandFilterProvider from './contexts/BrandFilterContext';
import PerfumerContributionForm from './components/perfumers/PerfumerContributionForm';


function App() {

  return (

    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/perfumes">
            <GenderFilterProvider>
              <YearFilterProvider>
                <PerfumeTypeFilterProvider>
                  <BrandFilterProvider>
                    <Perfumes />
                  </BrandFilterProvider>
                </PerfumeTypeFilterProvider>
              </YearFilterProvider>
            </GenderFilterProvider>
          </Route>

          <Route exact path="/notes">
            <Notes />
          </Route>

          <Route exact path="/perfumers">
            <Perfumers />
          </Route>

          <Route exact path="/brands">
            <Brands />
          </Route>

          <Route exact path="/perfumes/new">
            <PerfumeContributionForm />
          </Route>

          <Route exact path="/notes/new">
            <NoteContributionForm />
          </Route>

          <Route exact path="/perfumers/new">
            <PerfumerContributionForm />
          </Route>

          <Route exact path="/companies/new">
            <CompanyContributionForm />
          </Route>

          <Route path="/perfumes/:name">
            <PerfumeDetails />
          </Route>

        </Switch>

      </div>
    </Router>
  );

}

export default App;
