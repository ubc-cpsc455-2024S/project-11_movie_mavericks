import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const request = await axios.post("http://localhost:5000/users/login", data);
      console.log(request);
    } catch (error) {
      console.error(error);
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
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="email-address"
            {...register("email", { required: true })}
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
