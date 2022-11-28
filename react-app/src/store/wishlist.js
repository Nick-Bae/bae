// import { csrfFetch } from './csrf';

const ADD_ONE = 'Wishlist/ADD_ONE';
const DELETE = 'Wishlist/DELETE';
const READ = 'Wishlist/LOAD';

const read = wishlist => ({
    type: READ,
    wishlist
});

const addOne = itemId => ({
    type: ADD_ONE,
    itemId
});

const deleteLike = itemId => ({
    type: DELETE,
    itemId
});

export const getWishlist =itemId =>async dispatch =>{
    const response = await fetch(`/api/items/${itemId}/wishlists`)

    if (response.ok) {
        const wishlist = await response.json();

        dispatch(read(wishlist));
        return wishlist;
    };
}
export const userWishlist =userId =>async dispatch =>{
    const response = await fetch(`/api/users/${userId}/wishlists`)

    if (response.ok) {
        const wishlist = await response.json();

        dispatch(read(wishlist));
        return wishlist;
    };
}


export const postWishlist = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}/wishlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body is neccessary?
        body: JSON.stringify(itemId)
    });
    const wishlist = await response.json();
    dispatch(addOne(wishlist));
    dispatch(getWishlist(itemId))
    return wishlist;
}

export const deleteWishlist = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}/wishlists`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteLike(itemId));
        dispatch(getWishlist(itemId))
    }
};

export const wishlistReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case READ:
            // const allWishlist = action.wishlist
            // allWishlist.forEach((wish)=>{
            //     newState[wish.id] = wish
            // })
            // newState[action.wishlist] = action.wishlist;
            newState = action.wishlist;
            return newState;
        case ADD_ONE:
            newState[action.itemId] = action.itemId;
            return newState;
        case DELETE:
            delete newState[action.itemId]
            return newState;
        default:
            return state;
    }
}

export default wishlistReducer
