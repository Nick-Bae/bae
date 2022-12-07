import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItems } from '../../store/items';
import './items.css'
import { getAllImages } from '../../store/image';

const Items = () => {
  const dispatch = useDispatch();
  // const items = Object.values(useSelector(state => state.items));
  const images =Object.values( useSelector(state=>state.images));
  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getItems());
    dispatch(getAllImages());
  }, [dispatch]);

  return (
    <main>
        <div className='mainContainer'>
            <div >
              <img className='banner' src="/images/banner1.jpg"  alt=""/>
            </div>
            <div className="itemDetail">
              <div className="itemLayout">
            {images.map(item=>(
              // <Link key={item?.id} to={{pathname:`/items/${item?.product_id}`, state:{item:item}}}> 
              <Link  key={item?.id} to={`/items/${item?.product_id}`}> 
                    {/* <ItemDetail item={item}/> */}
                    {item?.Product?.name} 
                    <div key={item?.id} className='imageContainer'>
                      <img key={item?.id} className="itemImage" src={item?.url} alt="" />
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