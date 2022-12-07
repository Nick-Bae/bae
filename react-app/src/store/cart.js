// import { csrfFetch } from './csrf';

const LOAD = "Carts/LOAD"
const CREATE = 'Cart/ADD_ONE';
const DELETE = 'Cart/DELETE';
const READ = 'Cart/LOAD';
const UPDATE = "Cart/UPDATE"

// const load = (cart) => ({
//     type: LOAD,
//     cart
// });

const read = cart => ({
    type: READ,
    cart
});

const create = data => ({
    type: CREATE,
    data
});

const deleteCart = cartId => ({
    type: DELETE,
    cartId
});

const update = data => ({
    type: UPDATE,
    data
})

// export const getItems = () =>async dispatch =>{
//     const response = await fetch(`/api/carts`);
//     if (response.ok) {
//         const items = await response.json();
//         dispatch(load(items));
//         return items;
//     };
// }

export const getUserCart = (userId) => async dispatch =>{
    const response = await fetch(`/api/users/${userId}/cart`)

    if (response.ok) {
        const cart = await response.json();
        dispatch(read(cart));
        return cart;
    };
}
// export const getUserItem =userId =>async dispatch =>{
//     const response = await fetch(`/api/users/${userId}/items`)

//     if (response.ok) {
//         const item = await response.json();
//         dispatch(read(item));
//         return item;
//     };
// }

export const createCart = (data) => async (dispatch) => {
    const response = await fetch("/api/carts", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body is neccessary?
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    };
};

export const updateCart = (data) => async (dispatch) => {
    const response = await fetch(`/api/carts/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
    }
}

export const deleteOneCart = (cartId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartId}`, {
        method: "DELETE",
      }); 
      
        // const data = await response.json()
      if (response.ok) {
        dispatch(deleteCart(cartId));
        return response
    }
};



export const cartReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD:
            newState = action.cart;
            return newState;
        case READ:
            newState = action.cart;
            return newState;
        case CREATE:
            newState[action.data] = action.data;
            return newState;
        case UPDATE:
            newState[action.data] = action.data;
            return newState;    
        case DELETE:
            delete newState[action.cartId]
            return newState;
        default:
            return state;
    }
}

export default cartReducer
