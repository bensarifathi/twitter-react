import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import HomeScreen from './screen/HomeScreen'
import LoginScreen from './screen/LoginScreen'
import PostDetailsScreen from './screen/PostDetailsScreen'
import ProfileScreen from './screen/ProfileScreen'
import RegisterScreen from './screen/RegisterScreen'
import TweetDetailsScreen from './screen/TweetDetailsScreen'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/profile/:id" component={ProfileScreen} />
        <Route path="/post/:id" component={PostDetailsScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/tweet/:id" component={TweetDetailsScreen}/>
      </Switch>
    </Router>
  )
}

export default App
