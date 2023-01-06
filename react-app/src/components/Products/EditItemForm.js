import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { updateImage } from "../../store/image";
import { updateItem } from "../../store/items";

const EditItemForm = ( ) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.session.user);
    const { item } = location.state;
    const { itemId } = useParams();
    const history = useHistory();
    const [name, setName] = useState(item?.name);
    const [price, setPrice] = useState(item?.price);
    const [category_id, setCategory_id] = useState(item?.category_id);
    const [description, setDescription] = useState(item?.description);
    const [image, setImage] = useState(item?.image);
    const [quantity, setQuantity] = useState(item.quantity);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false)

    useEffect(() => {
        const errors = [];
        if (name?.length > 20) errors.push('Title must be less than 20 chracters');
        if (price < 0) errors.push('Please enter your Correct Price');
        if (price > 10000) errors.push('Price should be less than $10,000');
        if (!category_id) errors.push('Please select the category');
        if (image?.length > 255) errors.push('url should not be over 255 characters');
        // if (!image.startsWith('https://') &&
        //     !image.startsWith('http://')) errors.push('url should starts with https:// or http://');
        // if (!image.endsWith(".png") && !image.endsWith(".jpeg")
        //     && !image.endsWith(".jpg") && !image.endsWith(".gif")) errors.push('Image url should end with jpeg, jpg, gif, png');
        if (description?.length > 500) errors.push('Description must be less than 500 chracters');
        setValidationErrors(errors);
    }, [price, image, name, category_id, description]);

    const editSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        let item = {
            id: itemId,
            user_id: user.id,
            name,
            price: parseFloat(price).toFixed(2),
            quantity,
            category_id,
            description
        };

        let updatedItem = await dispatch(updateItem(item))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors((data.errors));
            });

        const imageUrl = {
            url: image,
            product_id: item.id
        }

        await dispatch(updateImage(imageUrl))
        item.image = imageUrl.url
        console.log("what is the editing item", item)
        history.push({
            pathname: `/items/${item.id}`,
            state: { item: item }
          });
    };

    const cancelClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: `/items/${item.id}`,
            state: { item: item }
          });
    }

    return (
        <section className='createItemForm'>
            {hasSubmitted && validationErrors.length > 0 && (
                <div id="itemErrors">
                    <p id="itemErrorTItle">The following errors were found:</p>
                    <ul id="errorMessages">
                        {validationErrors.map(error => (
                            <li key={error} style={{ color: 'red' }}>-{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form id="createItemForm" onSubmit={editSubmit}>
                <h2 id="formTitle">Edit Item</h2>

                <div id="itemtInput">
                    <label> Category:
                        <select id="selectCategory" defaultValue={category_id} onChange={e => setCategory_id(parseInt(e.target.value))}>
                            <option > Click to see options </option>
                            <option value="1">Clothes</option>
                            <option value="2">Shoes</option>
                            <option value="3">Jewelry</option>
                            <option value="4">Accessoreis</option>
                        </select>
                    </label>
                </div>

                <div id="itemtInput">
                    <label htmlFor='name'>Title:</label>
                    <input
                        id='name'
                        type='text'
                        placeholder='title'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>

                <div id="itemtInput">
                    <label htmlFor='price'>Price:</label>
                    <input
                        id='price'
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        max="10000"
                        required
                    />
                </div>

                <div id="quantityInput">
                    <label id="quantityLabel" htmlFor='quantity'>Quantity</label>
                    <input
                        id='quantity'
                        type='number'
                        onChange={e => setQuantity(e.target.value)}
                        value={quantity}
                        required
                        max="1000"
                    />
                </div>            

                <div id="itemtInput" >
                    <label htmlFor='description'>description:</label>
                    <textarea
                        id='description'
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </div>

                <div id="itemtInput">
                    <label htmlFor='url'>Image:</label>
                    <textarea
                        // maxLength='255'
                        id='imageUrl'
                        type='text'
                        onChange={e => setImage(e.target.value)}
                        value={image}
                        required
                    />

                    {/* <button type='submit'>Creat new spot</button> */}
                </div>

                <div>
                    <input id="itemtBt" type="submit" /> &nbsp;
                    {/* <button id="itemtBt" type="button" onClick={editSubmit}>Cancel</button> */}
                    <button id="itemtBt" type="button" onClick={cancelClick}>Cancel</button>
                    <button onClick={()=>{history.push(`/items/${itemId}/images`)}}>edit image</button>
                </div>
            </form>
        </section>
    );
};

export default EditItemForm;
