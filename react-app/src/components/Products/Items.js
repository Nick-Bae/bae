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

  console.log("items is",items)

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
              // <Link key={item?.id} to={{pathname:`/items/${item?.product_id}`, state:{item:item}}}> 
              <Link  key={ind} to={`/items/${item?.id}`}> 
                    {/* <ItemDetail item={item}/> */}
                    {item?.name} 
                    <div key={item?.id} className='imageContainer'>
                      <img key={item?.id} className="itemImage" src={item?.image} alt="" />
                    </div>
              </Link>
            ))}
            </div>
            </div>
        </div>
        <div className='about'>
          <p> about me </p>
          <a target="_blank" rel="noreferrer" href='https://github.com/Nick-Bae'>  Github</a> &nbsp; &nbsp;
          <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/namju-bae-4274893a/'>  Linkedin</a>
          
        </div>
    </main>
  );
};

export default Items;