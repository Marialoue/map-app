import React from "react";
import useForm from "./useForm";
import validate from "./ValidateInfo";
// import Link from "react-router-dom";
import { ReactComponent as User } from "../icons/user.svg";

const Signup = ({ submitForm, showModal, setShowModal }) => {
  const { handleChange, handleSignup, values, errors } = useForm(
    submitForm,
    validate
  )

  const closeModal = () => {
    setShowModal((prev) => !prev);
  };
  
  ;

  return (
    <>
      {showModal ? (
        <div className="modal">
          <form className="modal-form" onSubmit={handleSignup} noValidate>
            <div className="modal-top">
            <User className="avatar"/>
            <span className="close" onClick={closeModal} title="Close Modal">&times;</span>
            </div>
            <div className="modal-content">
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
              {errors.username ? <label>{errors.username}</label> : null}
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
              {errors.email && <label>{errors.email}</label>}
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
              {errors.password && <label>{errors.password}</label>}
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
              {errors.confirmPassword && <label>{errors.confirmPassword}</label>}
              <br />
              <button type="submit">Sign up</button>
            </div>
            <div className="modal-bottom">
              <hr />
              <span className="input-login">
                {/* Already have an account? Log in <Link to="/login/">here</Link> */}
              </span>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Signup;
