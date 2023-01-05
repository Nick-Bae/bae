import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink,useHistory } from 'react-router-dom';
import { getAllCategory } from '../store/category';
import './CategoryBar.css'

const CategoryBar = () => {
    // const { categoryId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
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
                <div className='categoryAll' onClick={()=> history.push('/items') }> All </div>
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