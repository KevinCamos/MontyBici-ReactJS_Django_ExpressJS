import React from "react";
import { useForm } from "react-hook-form";

import "./Login.css";
//   import people from "assets/images/people_SVG.svg";
import useUser from "../../hooks/useUser";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onSubmit } = useUser();

  console.log(errors);

  return (
    <div className="row justify-content-md-center m-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="col-6">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.Email && <small className="error">El email es requerido</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" {...register("Password1", { required: true, maxLength: 12 })} />
          {errors.Password1 && <small className="error">El password es requerido</small>}
        </div>

        <button type="submit" className="btn btn-primary form-control">
          Submit
        </button>
      </form>
    </div>
  );
}
