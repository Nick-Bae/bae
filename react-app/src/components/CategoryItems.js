import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getCategoryItem } from '../store/category';
import './CategoryItems.css'

const CategoryItems = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const items = Object.values(useSelector(state => state.category))
    // const items = (useSelector(state => state.category))
    console.log("items is ", categoryId)

    useEffect(() => {
        dispatch(getCategoryItem(categoryId))

    }, [dispatch, categoryId]);



    return (
        <>
            <div className='mainContainer'>
                <div >
                    <img className='banner' src="https://nbae.s3.amazonaws.com/mainImage.jpg" alt="" />
                </div>
                <div className="itemDetail">
                    <div className="itemLayout">
                        {items.map((item, ind) => (
                            <NavLink key={ind} to={`/items/${item?.id}`}>
                                <div key={item?.id} className='imageContainer'>
                                    <img key={item?.id} className="itemImage" src={item?.image} alt="" />
                                </div>
                                <div className='previewNamePrice'>
                                    <div>
                                        {item?.name}
                                    </div>
                                    <div>
                                        ${parseFloat(item?.price).toFixed(2)}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryItems;