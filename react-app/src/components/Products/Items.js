import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItems } from '../../store/items';
import './items.css'
import { getAllImages } from '../../store/image';

const Items = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
  // const images =Object.values( useSelector(state=>state.images));
  // const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(getItems());
    dispatch(getAllImages());
  }, [dispatch]);

  return (
    <main>
        <div className='mainContainer'>
            <div >
              <img className='banner' src="https://nbae.s3.amazonaws.com/mainImage.jpg"  alt=""/>
            </div>
            <div className="itemDetail">
              <div className="itemLayout">
            {items.map((item, ind)=>(
              <Link  key={ind} 
                     to={{ pathname:`/items/${item?.id}`,
                     state:{item:item}   
                    }}
              > 
                    <div key={item?.id} className='imageContainer'>
                    { item?.image &&(
                                    <img key={item?.id} className="itemImage" src={item?.image[0]} alt="" />
                                 )} 
                    </div>
                    <div className='previewNamePrice'>
                        <div className='previewName'>
                            {item?.name}
                        </div>
                        <div className="previewPrice">
                            ${parseFloat(item?.price).toFixed(2)}
                        </div>
                    </div>
              </Link>
            ))}
            </div>
            </div>
        </div>
        <div className='about'>
          <p className='aboutMe'> About me </p>
          <a className="socialNetwork" target="_blank" rel="noreferrer" href='https://github.com/Nick-Bae'>  
            <i class="fa-brands fa-github"></i>
          </a> &nbsp; &nbsp;
          <a className="socialNetwork" target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/namju-bae-4274893a/'>  
            <i class="fa-brands fa-linkedin"></i>
          </a>
          
        </div>
    </main>
  );
};

export default Items;