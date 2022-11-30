import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItems } from '../../store/items';
import './items.css'
import { getAllImages } from '../../store/image';
import ItemDetail from './itemDetail';

const Items = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
  const images =Object.values( useSelector(state=>state.images));
  const user = useSelector(state => state.session.user)

  
  useEffect(() => {
    dispatch(getItems());
    dispatch(getAllImages());
  }, [dispatch]);


  //   onClick={() => {
  const login = (!user) ? false : true
  //     // if (!login) return ("please log in first")

  return (
    <main>
        <div className='mainContainer'>
            <div >
              <img className='banner' src="/images/banner1.jpg"  />
            </div>
            <div className="itemDetail">
            {images.map(item=>(
              // <Link key={item?.id} to={{pathname:`/items/${item?.product_id}`, state:{item:item}}}> 
              <Link key={item?.id} to={`/items/${item?.product_id}`}> 
                    {/* <ItemDetail item={item}/> */}
                    {item?.Product?.name} 
                    <div key={item?.id} className='imageContainer'>
                      <img className="itemImage" src={item?.url} />

                    </div>
              </Link>
            ))}
            </div>
        </div>
    </main>
  );
};

export default Items;