import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserAuth } from "../context/UserAuthContext";

export const Register = ({ setShowLogin }) => {
  const { signUp } = useUserAuth();

  const showLogin = () => {
    setShowLogin(true);
  };

  const createNewUser = async (email, password) => {
    try {
      await signUp(email, password);
      showLogin();
    } catch (err) {
      console.log(err);
    }
  };

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup
      .string()
      .email("Email adress not valid!")
      .required("Email is required!"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters!")
      .max(20, "Password must be below 20 characters!")
      .required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match!")
      .required("Confirm password is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    createNewUser(data.email, data.password);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="first name"
          {...register("firstName")}
        />
        <span>{errors.firstName?.message}</span>
        <input type="text" placeholder="last name" {...register("lastName")} />
        <span>{errors.lastName?.message}</span>
        <input type="text" placeholder="email" {...register("email")} />
        <span>{errors.email?.message}</span>
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
        <input
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />
        <span>{errors.confirmPassword?.message}</span>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
