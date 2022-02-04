import {BrowserRouter, Route, Switch} from 'react-router-dom'
import UsersList from './components/UsersList'

import NotFound from './components/NotFound'
import UserPosts from './components/UserPosts'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={UsersList} />
      <Route path="/posts/:id" component={UserPosts} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
