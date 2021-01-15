import React from "react";
import useForm from "./useForm";
import validate from "./ValidateInfo";
// import Link from "react-router-dom";

const Signup = ({ submitForm, showModal }) => {
  const { handleChange, handleSignup, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <>
      {showModal ? (
        <div className="form">
          <form className="sign-up" onSubmit={handleSignup} noValidate>
            {/* username */}
            <label name="username">Username </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Jane Doe"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username ? <p>{errors.username}</p> : null}
            {/* email */}
            <label name="email">Email </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="janedoe@email.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
            {/* password */}
            <label name="password">Password </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
            {/* confirm password */}
            <label name="confirmPassword">Confirm Password </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <br />
            <button type="submit">Sign up</button>
            <hr />
            <span className="input-login">
              {/* Already have an account? Log in <Link to="/login/">here</Link> */}
            </span>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Signup;
