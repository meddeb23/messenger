import React from "react";
import { useForm } from "../../utility";
import { search } from "../../flux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

import { deleteSearch, getReceiver } from "../../flux/actions/userActions";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [values, setValues] = useForm({ search: "" });
  const resualt = useSelector((state) => state.user.search);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(search(values));
  };

  return (
    <div className="form-warpper">
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div className="form-group">
          <input
            onChange={(e) => setValues(e)}
            type="text"
            name="search"
            className="form-control"
            id="search"
            placeholder="Search"
          />
        </div>
        <button>Search</button>
      </form>
      {resualt && (
        <ul className="resualt">
          {resualt.map((user) => (
            <li key={user._id} onClick={() => dispatch(getReceiver(user._id))}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
