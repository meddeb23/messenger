import axios from "axios";
import React, { useContext, useState } from "react";
import { NavBar, Paragraphe, Heading, InputField } from "../components";
import { UserContext } from "../context";
import { useForm } from "../utility/utility";

import Loader from "../components/loader/loader";

export function Setting() {
  const { user, setUser } = useContext(UserContext);
  const [values, setValues] = useForm(user);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreveiew] = useState(null);

  const saveChanges = (e) => {
    e.preventDefault();
    setFetching(true);
    const formData = new FormData();
    formData.append("file", file);
    if (file != null) {
      axios
        .post("/api/v1/user/upload_pic", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFetching(false);
          // console.log(res.data);
        })
        .catch((err) => {
          setFetching(false);
          if (err.response.status === 400) {
            setError(err.response.data.message);
          } else {
            setError("oops somthing went wrong!");
          }
        });
    }
    axios
      .post("/api/v1/user/information", { values })
      .then((res) => {
        setFetching(false);
        setUser(res.data.user);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
        setError(err);
      });
  };

  return (
    <>
      <NavBar />
      <section className="flex-auto">
        <div className="md:w-2/3 lg:w-3/5 mt-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center  md:space-x-10">
            <div className="relative w-28">
              <label htmlFor="file">
                <svg
                  className="w-6 h-6 rounded-full p-1 cursor-pointer bg-indigo-700 text-white absolute bottom-0 right-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
              <div className="w-28 h-28 shadow-xl rounded-full overflow-hidden ">
                <img
                  src={preview || values.profile_img}
                  className="object-cover h-28 w-28"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-4 text-center md:text-left">
              {/* <h1 className="text-gray-800 text-2xl font-bold">{user.name}</h1> */}
              <Heading size={"1.5rem"}>{user.name}</Heading>
              <Paragraphe>{user.bio}</Paragraphe>
            </div>
          </div>
          <form onSubmit={(e) => saveChanges(e)}>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setPreveiew(URL.createObjectURL(e.target.files[0]));
              }}
              id="file"
              className="hidden"
            />
            <div className="grid md:grid-cols-2 md:grid-row-2 gap-4 mt-10 justify-items-center">
              <InputField
                label="Name"
                name="name"
                onChange={(e) => setValues(e)}
                placeholder="name..."
                type="text"
                value={values.name}
              />
              <InputField
                label="bio"
                name="bio"
                onChange={(e) => setValues(e)}
                placeholder="bio..."
                type="text"
                value={values.bio}
              />
              <InputField
                label="phone"
                name="phone"
                onChange={(e) => setValues(e)}
                placeholder="phone..."
                type="text"
                value={values.phone}
              />
              <InputField
                label="location"
                name="location"
                onChange={(e) => setValues(e)}
                placeholder="location..."
                type="text"
                value={values.location}
              />
            </div>
            {fetching ? (
              <Loader />
            ) : (
              <button className="block w-72 bg-indigo-700 rounded-md text-center text-white font-bold py-2 cursor-pointer mx-auto mt-8">
                Save Changes
              </button>
            )}
            {error && (
              <p className="font-bold text-red-600 text-sm mt-4 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
