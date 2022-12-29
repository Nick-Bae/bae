import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCategory, getCategoryItem } from '../store/category';
import './CategoryBar.css'

const CategoryBar = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const categories =['Clothes', 'Shoes', 'Jewelry','Accessories']
    // const categories = Object.values(useSelector(state => state.category))
    // const items = (useSelector(state => state.category))

    useEffect(() => {
        dispatch(getAllCategory())

    }, [dispatch]);



    return (
        <>
            <div className="categoryBarContainer">
                <div className="categorySingle">
                    {categories.map((item, ind) => (
                        <NavLink key={ind} to={`/categories/${(ind+1)}`}>
                            {/* <div key={item?.id} className='imageContainer'>
                                    <img key={item?.id} className="itemImage" src={item?.image[0]} alt="" />
                                </div> */}
                            <div className='categoryBarName'>
                                    {item}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryBar;