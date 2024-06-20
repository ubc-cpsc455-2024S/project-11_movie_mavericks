import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", data);

      // Registration successful
      if (typeof response.data === 'string') {
        alert(response.data);
        return;
      }

      // Login successful
      dispatch(login(response.data));

    } catch (error) {
      // Invalid credentials
      console.log(error.response.data.msg);
      alert(error.response.data.msg);
    }
  };

  const clearFields = () => {
    reset();
  };

  return (
    <>
      <div>
        <h1 style={{ color: "yellow" }}>Login</h1>
      </div>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={clearFields}>
          Clear Fields
        </button>
      </form>
    </>
  );
};

export default Login;
