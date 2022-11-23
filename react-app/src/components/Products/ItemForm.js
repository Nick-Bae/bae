import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemDetail } from "../../store/itemDetail";
import { createItem } from "../../store/items";
import { createImage } from "../../store/image";
const ItemForm = () => {
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [inventory_id, setInventory_id] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false); 


//   useEffect(() => {
//     dispatch(getItemDetail());
//   }, [dispatch]);


  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const item = { 
        user_id: user.id, 
        name, 
        price, 
        category_id, 
        description };
        // image, 

    const newItem = await dispatch(createItem(item))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors((data.errors));
    });

    const imageUrl = {
        image,
        product_id: newItem.id
    }
    
    await dispatch(createImage( imageUrl))
    
    history.push(`/items/${newItem.id}`);
  };

  const cancelClick = (e) =>{
    e.preventDefault();
    history.push('/items')
  }

  return (
    <section className='createSpotForm'>
    {hasSubmitted && validationErrors.length > 0 && (
        <div id="spotErrors">
            <p id="spotErrorTItle">The following errors were found:</p>
            <ul id="errorMessages">
                {validationErrors.map(error => (
                    <li key={error}>-{error}</li>
                ))}
            </ul>
        </div>
    )}
    <form id="createItemForm" onSubmit={onSubmit}>
        <h2 id="formTitle">Create Item</h2>
    
        <div id="spotInput">
            <label htmlFor='name'>Title:</label>
            <input 
                id='name'
                type='text'
                // placeholder='address'
                onChange={e => setName(e.target.value)}
                value={name}
                required
            />
        </div>
        
        <div id="spotInput">
            <label htmlFor='price'>Price:</label>
            <input
                id='state'
                type='text'
                onChange={e => setPrice(e.target.value)}
                value={price}
                required
            />
        </div>
        <div id="spotInput">
            <label> Category:
            <select onChange={e=> setCategory_id(parseInt(e.target.value))}>
                <option  defaultValue="Click to see options"> Click </option>
                <option value="1">Shoes</option>
                <option value="2">Phones</option>
                <option value="3">Clothes</option>
                {/* <option value="mango">Mango</option> */}
            </select>
            </label>
        </div>
            {category_id}

        <div id="spotInput">
            <label htmlFor='description'>description:</label>
            <textarea
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
            />
        </div>
        
        <div >
            <label htmlFor='url'>url image:</label>
                <textarea
                        // maxLength='255'
                    id='imageUrl'
                    type='text'
                    onChange={e => setImage(e.target.value)}
                    value={image}
                    />
                </div>
        {/* <button type='submit'>Creat new spot</button> */}
        <div>
        <input id="spotBt" type="submit" /> &nbsp;
        <button id="spotBt" type="button" onClick={cancelClick}>Cancel</button>
        </div>
    </form>
</section>
  );
};

export default ItemForm;
