import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Items from './components/Products/Items';
import ItemDetail from './components/Products/itemDetail';
import ItemForm from './components/Products/ItemForm';
import EditItemForm from './components/Products/EditItemForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Items />
        </Route>
        <ProtectedRoute path='/items' exact={true} >
          <Items />
        </ProtectedRoute>
        <ProtectedRoute path='/items/:itemId' exact={true} >
          <ItemDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/items/:itemId/edit' exact={true} >
          <EditItemForm />
        </ProtectedRoute>
        <ProtectedRoute path='/new-item' exact={true} >
          <ItemForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
