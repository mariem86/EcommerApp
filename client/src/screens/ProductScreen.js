import React,{useEffect,useState} from 'react'
//import data from '../data'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../js/actions/productAction';
import {getrate,addrate} from "../js/actions/rateAction"
import StarRatingComponent from 'react-star-rating-component';
 function ProductScreen(props) {
  const [qty, setQty] = useState(1);
    //const product=data.products.find(x=>x._id===props.match.params.id)
    const rates=useSelector(state=>state.rateReducer.rates)
    const rate=rates.filter(e=>e.product==props.match.params.id)
    const productDetails = useSelector((state) => state.productDetailsReducer);
    const { product, loading, error } = productDetails;
    const userSignin = useSelector(state => state.userSigninReducer);
  const {  userInfo } = userSignin;
    const dispatch = useDispatch();
    const [rating,setRating]=useState("")
    let counter=0;
  for (let i = 0; i < rate.length; i++) {
    if (userInfo && userInfo._id == rate[i].userInfo){
    counter = counter+1
    } 
  }
  const addratee = (e) => {
    e.preventDefault();
    // dispatch actions
    if (counter == 0){
    dispatch(
      addrate(props.match.params.id, { 
        rating: rating
      })
    );
     } setRating("")
  };
  
  useEffect(()=>{
    dispatch(getrate())
},[])
let count =0 ;
    let sum =0;
    let moy=0;
      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count
    useEffect(() => {
      dispatch(detailsProduct(props.match.params.id));
      return () => {
        
      }
    }, [])
    const handleAddToCart = () => {
      props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    };
    return( 
        
        <div>
        <div className="back-to-result">
          <Link to="/">Back to result</Link>
        </div>
        {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (<>
        <div className="details">
        <div className="details-image">
          <img  src="https://img.giglio.com/images/prodZoom/A82717.051_5.jpg" alt=""></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
           
              <li>
              <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">{count}</h6>
                                <p class="m-0px font-w-600">reviews number</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <StarRatingComponent name ="t" value={moy}/>
                            <br/>
                            <p class="m-0px font-w-600">Total rating </p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <select
                            className="form-control"
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">   select rating  </option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <button onClick={addratee} className="btn btn-primary btn-block">add</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
                  </li>
              
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        
      </div>
    
      <div className="details-action">
        <ul>
          <li>Price: ${product.price}</li>
          <li>
            Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
          </li>
          <li>
            Qty:
            <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
              {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
            </select>
          </li>
          <li>
            
          {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
           
          </li>
        </ul>
      </div>
      </>
      )}
         
           
      </div>
      )
}
export default ProductScreen;