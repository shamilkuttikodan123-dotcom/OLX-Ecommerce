import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {loginUser} from '../features/auth/authSlice'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.css'
function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading,error} =useSelector((state)=>state.auth)
    const {register,handleSubmit,formState:{errors}}=useForm()

 

    const  onSubmit=async (data)=>{
        try{
            await dispatch(
                loginUser({
                    username:data.username,
                    password:data.password
                })
            ).unwrap()
            navigate('/',{replace:true})

        }catch(error){
            console.log(error)

        }
      
    }



  return (
   <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            {...register("username", {
              required: "username is required",
            })}
          />

          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {error && (
          <p>
            {typeof error === "string"
              ? error
              : error.detail || "Login failed. Please try again."}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
       <p className="signup-footer">
         dont you have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>
    </div>
  );
  
}

export default Login
