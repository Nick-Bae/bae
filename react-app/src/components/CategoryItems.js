import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCategoryItem } from '../store/category';
import './CategoryItems.css'

const CategoryItems = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const items = Object.values(useSelector(state => state.category))
    // const items = (useSelector(state => state.category))
    console.log("items is ", items)

    useEffect(() => {
        dispatch(getCategoryItem(categoryId))

    }, [dispatch, categoryId]);

    if (!items) return null
    return (
        <>
            <div className='mainContainer'>
                <div >
                    <img className='banner' src="https://nbae.s3.amazonaws.com/mainImage.jpg" alt="" />
                </div>
                <div className="itemDetail">
                    <div className="itemLayout">
                        {items.map((item, ind) => (
                            <Link key={ind} 
                                to={{ pathname:`/items/${item?.id}`,
                                state:{item:item}
                                }}
                            >
                                <div key={item?.id} className='imageContainer'>
                                 { item.image &&(
                                    <img key={item?.id} className="itemImage" src={item?.image[0]} alt="" />
                                 )}   
                                </div>
                                <div className='previewNamePrice'>
                                    <div>
                                        {item?.name}
                                    </div>
                                    <div>
                                        ${parseFloat(item?.price).toFixed(2)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryItems;