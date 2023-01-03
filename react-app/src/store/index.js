import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { productReducer } from './items';
import itemDetailReducer from './itemDetail';
import imageReducer from './image';
import { commentReducer } from './comment';
import wishlistReducer from './wishlist';
import cartReducer from './cart';
import bidReducer from './bid';
import categoryReducer from './category';
import orderReducer from './order';

const rootReducer = combineReducers({
  session,
  items: productReducer,
  item: itemDetailReducer,
  images: imageReducer,
  comments: commentReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  bid: bidReducer,
  category: categoryReducer,
  orders: orderReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
