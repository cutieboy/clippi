import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import UserData from './UserData'
import Nav from './Nav'

import '../styles/App.css'
import '../styles/Nav.css'
import '../styles/Login.css'

function App() {
  return (
      <div className="App">
        <div className="root-container">
          <Router>
            <AuthProvider>
              <Nav />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/user-data" component={UserData} />
                <PublicRoute path="/signup" component={Signup} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </div>
    
  );
}

export default App
