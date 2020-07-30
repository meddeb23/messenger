import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../flux/actions/userActions";
import { clearError } from "../../flux/actions/errorAction";

import { useForm } from "../../utility";

export default function Login() {
  const dispatch = useDispatch();

  const [values, setValues] = useForm({ email: "", password: "" });
  const error = useSelector((state) => state.error.message);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <div className="form">
      <form onSubmit={(e) => onSubmitForm(e)}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => setValues(e)}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => setValues(e)}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <small
          id="emailHelp"
          style={{ color: "#cc0000" }}
          className="form-text text-muted"
        >
          {error}
        </small>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <small id="emailHelp" className="form-text text-muted">
          Don't have an account <Link to="/register">Register</Link>
        </small>
      </form>
    </div>
  );
}
