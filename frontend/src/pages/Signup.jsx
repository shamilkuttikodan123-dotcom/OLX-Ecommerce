import './Signup.css'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link,replace } from "react-router-dom";
import { useEffect } from "react";
import {registerUser,} from "../features/auth/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {register,handleSubmit,formState: { errors },} = useForm();




  const onSubmit = async (data) => {
    try {
      await dispatch(
        registerUser({
          username: data.username,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      navigate("/login",{replace:true});
    } catch (err) {

    }
  };



   return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Username must contain only letters",
              },
              })}
            />
            {errors.username && (
              <p className="signup-error">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="signup-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="signup-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="signup-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="signup-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="signup-error">
              {typeof error === "string"
                ? error
                : error.detail ||
                  Object.values(error).flat().join(" ") ||
                  "Registration failed. Please try again."}
            </p>
          )}

          <button
            className="signup-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
