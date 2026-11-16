
import React from 'react'
import { Link, Navigate, replace, useNavigate } from 'react-router-dom'
import './navbar.css'
import { logout } from '../features/auth/authSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const item=useSelector((state)=>state.cart.items)


     const total = item.reduce((total, ite) => total + ite.quantity,0);

    function handleLogout(){
      dispatch(clearCart())
        dispatch(logout())
        
        navigate('/login',{replace:true})
       
    }
    
  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">MyStore</h2>

        <div className="nav-links">
            <Link to="/">Products</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/cart">Cart</Link>
            <h3>cartItem:{total}</h3>

          <Link to="/myproducts">myproduct</Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
