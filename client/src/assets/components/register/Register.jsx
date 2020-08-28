import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../flux/actions/userActions";
import { clearError } from "../../flux/actions/errorAction";

import { useForm } from "../../utility";

export default function Register({ history }) {
  const dispatch = useDispatch();

  const [values, setValues] = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const error = useSelector((state) => state.error.message);
  const isLogin = useSelector((state) => state.user.login);

  useEffect(() => {
    dispatch(clearError());
  }, []);
  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(register(values));
    history.push("/home");
  };
  if (isLogin) return <Redirect to="/home" />;

  return (
    <div className="form">
      <form onSubmit={(e) => onSubmitForm(e)}>
        <h1>Register</h1>

        <div className="form-group">
          <label htmlFor="exampleInputName1">First name</label>
          <input
            onChange={(e) => setValues(e)}
            type="text"
            name="first_name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Last name</label>
          <input
            onChange={(e) => setValues(e)}
            type="text"
            name="last_name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter last name"
          />
        </div>
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
          Have an account <Link to="/login">login</Link>
        </small>
      </form>
    </div>
  );
}
