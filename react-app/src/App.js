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
import CommentDisplay from './components/Comment/CommentDisplay';
import CommentEditForm from './components/Comment/CommentEditForm';
// import Cart from './components/Cart';
import Mymenu from './components/Mymenu/Mymenu';
import WishList from './components/Products/WishList';
import UploadPicture from './components/UploadPicture';

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

        <ProtectedRoute path='/mymenu' exact={true} >
          <Mymenu />
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/users/:userId/cart' exact={true} >
          <Cart />
        </ProtectedRoute> */}

        <ProtectedRoute path='/users/:userId/wishlists' exact={true} >
          <WishList />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Items />
        </Route>

        <ProtectedRoute path='/items' exact={true} >
          <Items />
        </ProtectedRoute>

        <Route path='/items/:itemId' exact={true} >
          <ItemDetail />
        </Route>

        <ProtectedRoute path='/items/:itemId/edit' exact={true} >
          <EditItemForm />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/items/:itemId/images' exact={true} >
          <EditItemForm />
        </ProtectedRoute> */}
        
        {/* <ProtectedRoute path='/images' exact={true} >
          <EditItemForm />
        </ProtectedRoute> */}

        <ProtectedRoute path='/items/:itemId/comments' exact={true} >
          <CommentDisplay />
        </ProtectedRoute>

        <ProtectedRoute path='/comments/:id' exact={true} >
          <CommentEditForm />
        </ProtectedRoute>

        <ProtectedRoute path='/new-item' exact={true} >
          <ItemForm />
        </ProtectedRoute>
        
        <ProtectedRoute path='/upload' exact={true} >
          <UploadPicture />
        </ProtectedRoute>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
