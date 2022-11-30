import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createItem } from "../../store/items";
import { createImage } from "../../store/image";
import './itemForm.css'

const ItemForm = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
  
    useEffect(() => {
    const errors =[];
    if (name.length >30) errors.push('Name must be less than 30 chracters');
    if ( price < 0) errors.push('Please enter your Correct Price');
    if (price > 10000) errors.push('Price should be less than $10,000');
    if (!category_id ) errors.push('Please select the category');
    if (image.length>255) errors.push('url should not be over 255 characters');
    if (!image.startsWith('https://') && 
        !image.startsWith('http://')) errors.push('url should starts with https:// or http://');
    if (!image.endsWith(".png") && !image.endsWith(".jpeg") 
        && !image.endsWith(".jpg") && !image.endsWith(".gif")) errors.push('Image url should end with jpeg, jpg, gif, png');
    setValidationErrors(errors);
  }, [price, image, name, category_id]);
  

  const onSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);
  

    const item = { 
        user_id: user.id, 
        name, 
        price:parseFloat(price).toFixed(2), 
        category_id, 
        description };
        // image, 

    const newItem = await dispatch(createItem(item)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(Object.values(data.errors));
            }
    });

    const imageUrl = {
        url:image,
        product_id: newItem.id
    }
    
    await dispatch(createImage( imageUrl))

    // var txt;
    // txt = document.getElementById('description').value;
    // var text = txt.split(".");
    // var str = text.join('.</br>');
    // document.write(str);
    
    reset();
    history.push(`/items/${newItem.id}`);
  };

  const cancelClick = (e) =>{
    e.preventDefault();
    history.push('/items')
  }

  const reset= () =>{
    setImage("");
    setName("");
    setPrice("");
    setDescription("");
  }
  let select;
  return (
    <section className='createItemForm'>
    { hasSubmitted && validationErrors.length > 0 && (
        <div id="itemErrors">
            <p id="spotErrorTItle">The following errors were found:</p>
            <ul >
                {validationErrors.map(error => (
                    <li id="errorMessages" key={error} style={{color: 'red'}}>
                        -{error}
                    </li>
                ))}
            </ul>
        </div>
    )}
    <form id="createItemForm" onSubmit={onSubmit}>
        <h2 id="formTitle">Create Item</h2>

        <div id="itemtInput">
            <label> Category:
            <select id="selectCategory" className="required" onChange={e=> setCategory_id(parseInt(e.target.value))}>
                <option  defaultValue="Click"> Click to see options </option>
                <option value="1">Shoes</option>
                <option value="2">Phones</option>
                <option value="3">Clothes</option>
                {/* <option value="mango">Mango</option> */}
            </select>
            </label>
        </div>

        <div id="itemtInput">
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
        
        <div id="itemtInput">
            <label htmlFor='price'>Price:</label>
            <input
                id='price'
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                required
                max="10000"
            />
        </div>
        

        <div id="itemtInput">
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
                </div>
        {/* <button type='submit'>Creat new itemt</button> */}
        <div>
        <input id="itemtBt" type="submit" /> &nbsp;
        <button id="itemtBt" type="button" onClick={cancelClick}>Cancel</button>
        </div>
    </form>
    
</section>
  );
};

export default ItemForm;
