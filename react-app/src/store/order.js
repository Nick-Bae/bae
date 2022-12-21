// import { csrfFetch } from './csrf';

const LOAD = "Order/LOAD"
const CREATE = 'Order/ADD_ONE';
const DELETE = 'Order/DELETE';
const READ = 'Order/LOAD';
const UPDATE = "Order/UPDATE"

// const load = (cart) => ({
//     type: LOAD,
//     cart
// });

const read = order => ({
    type: READ,
    order
});

const create = data => ({
    type: CREATE,
    data
});

const deleteCart = orderId => ({
    type: DELETE,
    orderId
});

const update = data => ({
    type: UPDATE,
    data
})

// export const getItems = () =>async dispatch =>{
//     const response = await fetch(`/api/Order`);
//     if (response.ok) {
//         const items = await response.json();
//         dispatch(load(items));
//         return items;
//     };
// }

export const getUserOrder = (userId) => async dispatch =>{
    const response = await fetch(`/api/users/${userId}/order`)

    if (response.ok) {
        const order = await response.json();
        dispatch(read(order));
        return order;
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

export const createOrder = (data) => async (dispatch) => {
    const response = await fetch("/api/orders", {
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

export const updateOrder = (data) => async (dispatch) => {
    const response = await fetch(`/api/orders/${data.orderId}`, {
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

export const deleteOneOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      }); 
      
        // const data = await response.json()
      if (response.ok) {
        dispatch(deleteCart(orderId));
        return response
    }
};

export const orderReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD:
            newState = action.order;
            return newState;
        case READ:
            newState = action.order;
            return newState;
        case CREATE:
            newState[action.data] = action.data;
            return newState;
        case UPDATE:
            newState[action.data] = action.data;
            return newState;    
        case DELETE:
            delete newState[action.orderId]
            return newState;
        default:
            return state;
    }
}

export default orderReducer
