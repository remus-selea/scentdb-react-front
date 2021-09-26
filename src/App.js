import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PerfumeDetails from './components/perfumes/PerfumeDetails';
import PerfumeContributionForm from './components/perfumes/PerfumeContributionForm';
import Notes from './components/notes/Notes'
import NoteContributionForm from './components/notes/NoteContributionForm'
import CompanyContributionForm from './components/brands/CompanyContributionForm'
import Perfumers from './components/perfumers/Perfumers'
import Brands from './components/brands/Brands'
import PerfumerContributionForm from './components/perfumers/PerfumerContributionForm';
import OAuth2RedirectHandler from './components/user/oauth2/OAuth2RedirectHandler';
import ProtectedRoute from './components/common/ProtectedRoute';
import Profile from "./components/user/profile/Profile"
import PublicRoute from "./components/common/PublicRoute";
import Login from './components/user/login/Login'
import AuthProvider from './contexts/AuthProvider';
import Header from "./components/common/header/Header";
import Home from './components/home/Home';
import Perfumes from './components/perfumes/Perfumes';
import GenderFilterProvider from './contexts/GenderFilterContext'
import YearFilterProvider from './contexts/YearFilterContext';
import PerfumeTypeFilterProvider from './contexts/PerfumeTypeFilterContext';
import BrandFilterProvider from './contexts/BrandFilterContext';
import AuthVerify from './components/common/AuthVerify';
import { BASE_NAME } from "./util/constants";

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css'
import 'primeicons/primeicons.css';
import './App.scss';


function App() {
  return (
    <AuthProvider>
      <Router basename={BASE_NAME}>
        <div className="App">
          <Header />
          <AuthVerify />

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

            <PublicRoute restricted={true} component={Login} path="/login" exact />
            <ProtectedRoute component={Profile} path="/profile" exact />

            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
          </Switch>

        </div>
      </Router>
    </AuthProvider>
  );

}

export default App;
