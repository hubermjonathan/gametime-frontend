import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AuthContext from './common/context/auth';
import Account from './components/Account/Account';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Communication from './components/Communication/Communication';
import Register from './components/Register/Register';
import TeamManagement from './components/TeamManagement/TeamManagement';
import Store from './components/Store/Store';
import reducer from './reducers/reducer';
import JoinTeamPage from './components/TeamManagement/JoinTeamPage';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Redux store
const store = createStore(reducer);

const App = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const login = () => setAuth(!isAuthenticated);

  return (
    <div className="bg-white">
      <AuthContext.Provider
        value={{
        isAuthenticated,
        login,
      }}
      >
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            {/* <Route path="/logout" exact component={Logout} /> */}
            <Route path="/register" exact component={Register} />
            <Route path="/account" exact component={Account} />
            <Route path="/home" exact component={Home} />
            <Route path="/TeamManagement" exact component={TeamManagement} />
            <Route path="/communication" exact component={Communication} />
            {/* <Route path="/documentation" exact component={Documentation} /> */}
            {/* <Route path="/resources" exact component={Resources} /> */}
            <Route path="/store" exact component={Store} />
            <Route path="/joinTeam" exact component={JoinTeamPage} />
            <Route path="/" exact component={Landing} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
