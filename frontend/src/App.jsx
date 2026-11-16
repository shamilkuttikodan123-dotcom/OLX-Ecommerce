
import Signup from './pages/Signup'
import Login from './pages/Login'
import Products from './pages/Products'
import Sellproducts from './pages/Sellproducts'
import EditProduct from './pages/EditProduct'
import Cart from './pages/Cart'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Myproducts from './pages/Myproducts'
function App() {

  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)


  return (
   <div>




    <BrowserRouter>

    <Routes>
      <Route path='/login' element={isAuthenticated ?<Navigate to='/'/>  :<Login/>} />
      <Route path='/signup' element={isAuthenticated ?<Navigate to="/"/>:<Signup/>}/>
      <Route path='/' element={isAuthenticated ?<Products/>:<Navigate to="/login"/>} />
      <Route path='/sell' element={isAuthenticated ?<Sellproducts/> : <Navigate to='login'/>} />
      <Route path='/cart' element={isAuthenticated ?<Cart/> : <Navigate to='/login'/>} />
       <Route path="/products/:id/edit" element={isAuthenticated ? <EditProduct /> : <Navigate to="/login" /> }/>
       <Route path='/myproducts' element={isAuthenticated ? <Myproducts /> : <Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>

   </div>
  )
}

export default App
