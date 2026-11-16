import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { fetchProduct } from '../features/products/productsSlice'
import { addtoCart } from '../features/cart/cartSlice'
import './products.css'
import Navbar from '../components/Navbar'
function Products() {
        const [category,setCategory]=useState('')
        const [max_price,setPrice]=useState('')

        const dispatch=useDispatch()
        const navigate=useNavigate()

        const access = useSelector((state) => state.auth.access)

        const {loading,error,items}=useSelector((state)=>state.products)

        const cartItem=useSelector((state)=>state.cart.items)



        useEffect(() => {
                localStorage.setItem('cart',JSON.stringify(cartItem) );
            }, [cartItem]);





        useEffect(()=>{
          dispatch(fetchProduct({
            category,max_price

          }))

        },[access,category,max_price,dispatch])

    

        function handleCart(item) {
            dispatch(addtoCart(item))
        }


        return (
           <div>
            <Navbar/>

          <div className="products-page">
          <h1>Products</h1>


          <div className="filters">
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="furniture">Furniture</option>
                  <option value="books">Books</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="other">Other</option>
              </select>

              <input
                  type="number"
                  value={max_price}
                  onChange={(e)=>setPrice(e.target.value)}
                  placeholder="Maximum price"
              />
          </div>

          
            {loading && <p>Loading products...</p>}

            {error && <p>Failed to load products.</p>}

             {items.map((item) => (
            <div className="product-card" key={item.id}>
                <h2>{item.title}</h2>
                <p>₹{item.price}</p>
                <h5>{item.description}</h5>
               

              {!item.is_owner && (
                    <button onClick={() => handleCart(item)}>
                        Add to cart
                    </button>
                )}
                            
            

              {item.is_owner && (
                  <Link to={`/products/${item.id}/edit`}>
                      <button>Edit Product</button>
                  </Link>
              )}

              

            </div>
           ))}

           
            
                         

           




      </div>


      </div>
        )
}

export default Products
