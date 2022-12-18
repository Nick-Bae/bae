import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './splash.css'

const Splash = () => {
  
  
  useEffect(() => {
    
    
  }, []);

  

  return (
    <div className='mainContainer'>
        <div className='mainImageContainer'>
            <img className='mainImage' src="https://nbae.s3.amazonaws.com/mainImage.jpg" />
        </div>
        <div className='mainCategory'>
            <div className='categoryImg'>
                <img className="womenCollection" src="https://nbae.s3.amazonaws.com/men+collection.jpg" />
                <button className='categoryBtInMain'>Clothes</button>
            </div>
            <div className='categoryImg'>
                <img className="shoesCategory" src="https://nbae.s3.amazonaws.com/shoes(no).png" />
                <button className='categoryBtInMain'>Shoes</button>
            </div>
            <div className='categoryImg'>
                <img className="shoesCategory" src="https://nbae.s3.amazonaws.com/diamond2.png" />
                <button className='categoryBtInMain'>Jewelry</button>
            </div>
            
            <div className='categoryImg'>
                <img className="accesoryCategory" src="https://nbae.s3.amazonaws.com/watch2.png" />
                <button className='categoryBtInMain'>Accesories</button>
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
                            <img  className="trendSimages1" src="https://nbae.s3.amazonaws.com/heels.png" />
                        </div>
                    </div>
                    <div className='trendRow'>
                        <div className='trendSmallEach'>
                            <img  className="trendSimages" src="https://nbae.s3.amazonaws.com/jean+and+sweater.png" />
                        </div>
                        <div className='trendSmallEach'>
                            <img  className="trendSimages1" src="https://nbae.s3.amazonaws.com/short+pants.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default Splash;