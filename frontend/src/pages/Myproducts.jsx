
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { myproduct } from '../features/products/productsSlice';
import Navbar from '../components/Navbar';
import './myproduct.css'

function Myproducts() {
    const {error,loading,myitems}=useSelector((state)=>state.products)
    const dispatch=useDispatch()
    
            useEffect(()=>{
              dispatch(myproduct())
    
            },[dispatch])

    
        
  return (
    <div>
            <Navbar/>


      <div className="myproducts-page">
    <h1 className="myproducts-title">My Products</h1>

    {loading && (
        <p className="myproducts-loading">Loading products...</p>
    )}

    {error && (
        <p className="myproducts-error">Failed to load products.</p>
    )}

    {!loading && !error && myitems.length === 0 && (
        <p className="myproducts-empty">No products found.</p>
    )}

    <div className="myproducts-grid">
        {myitems.map((item) => (
            <div className="myproduct-card" key={item.id}>
                <h2 className="myproduct-name">{item.title}</h2>

                <p className="myproduct-price">₹{item.price}</p>

                <h5 className="myproduct-description">
                    {item.description}
                </h5>

                {item.is_owner && (
                    item.is_sold ? (
                        <button
                            className="myproduct-sold-button"
                            disabled
                        >
                            Sold Out
                        </button>
                    ) : (
                        <Link
                            className="myproduct-edit-link"
                            to={`/products/${item.id}/edit`}
                        >
                            <button className="myproduct-edit-button">
                                Edit Product
                            </button>
                        </Link>
                    )
                )}
            </div>

        ))}
    </div>
</div>


      </div>
  )
}

export default Myproducts
