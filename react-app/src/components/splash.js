import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams,useHistory } from 'react-router-dom';
import CategoryItems from './CategoryItems';
import Items from './Products/Items';

import './splash.css'

// const categories = ["1", "2", "3"]

const categories = [
    { categoryId: 1, img: "https://nbae.s3.amazonaws.com/men+collection.jpg", category: "Clothes" },
    { categoryId: 2, img: "https://nbae.s3.amazonaws.com/shoes(no).png", category: "Shoes" },
    { categoryId: 3, img: "https://nbae.s3.amazonaws.com/diamond2.png", category: "Jewelry" },
    { categoryId: 4, img: "https://nbae.s3.amazonaws.com/watch2.png", category: "Accessories" }
]

const Splash = () => {
    const history = useHistory();

    useEffect(() => {


    }, []);



    return (
        <div className='mainContainer'>
            <div className='mainImageContainer'>
                <img className='mainImage' src="https://nbae.s3.amazonaws.com/mainImage.jpg" />
            </div>
            <div className='mainCategory' onClick={() => <CategoryItems category={1} />}>
                <div className='singleCategory'>
                    {categories.map((category) => (
                        <div className='mainCategories'>
                            <NavLink className="categoryNav" to={`/categories/${category.categoryId}`}>
                                <div className='categoryImg'>
                                    <img className="womenCollection" src={category.img} />
                                    <button className='categoryBtInMain'> {category.category} </button>
                                </div>
                            </NavLink>
                                                
                        </div>
                    ))}
                </div>
                <div className="allItems">
                    <button className="allItemsBt" onClick={()=> history.push('/items') }> All </button>
                </div>
            </div>

            <div className='trendContainer'>
                <div className="trendLabel">
                    <p >Trending Products</p>
                </div>
                <div className='trendGroup'>
                    <div className='trendBig'>
                        <img className="trendBimages" src="https://nbae.s3.amazonaws.com/women+collection.png" />
                    </div>
                    <div className="trendSmall">
                        <div className='trendRow'>
                            <div className='trendSmallEach'>
                                <img className="trendSimages" src="https://nbae.s3.amazonaws.com/yellow+Tshirt.jpg" />
                            </div>
                            <div className='trendSmallEach'>
                                <img className="trendSimages1" src="https://nbae.s3.amazonaws.com/heels.png" />
                            </div>
                        </div>
                        <div className='trendRow'>
                            <div className='trendSmallEach'>
                                <img className="trendSimages" src="https://nbae.s3.amazonaws.com/jean+and+sweater.png" />
                            </div>
                            <div className='trendSmallEach'>
                                <img className="trendSimages1" src="https://nbae.s3.amazonaws.com/short+pants.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Splash;