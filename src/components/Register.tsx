import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserAuth } from "../context/UserAuthContext";

export const Register = ({ setShowLogin }: any) => {
  const { signUp } = useUserAuth();

  const createNewUser = async (email: String, password: String, firstName: String, lastName: String) => {
    try {
      await signUp(email, password, firstName, lastName);
      setShowLogin(true)
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

  const onSubmit = (data: any) => {
    createNewUser(data.email, data.password, data.firstName, data.lastName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="formLabel">First name :</p>
      <input type="text" placeholder="Robert" {...register("firstName")} />
      <span className="error">{errors.firstName?.message as String}</span>
      <p className="formLabel">Last name :</p>
      <input type="text" placeholder="Lewandovski" {...register("lastName")} />
      <span className="error">{errors.lastName?.message as String}</span>
      <p className="formLabel">Email :</p>
      <input type="text" placeholder="email@mail.com" {...register("email")} />
      <span className="error">{errors.email?.message as String}</span>
      <p className="formLabel">Password :</p>
      <input type="password" placeholder="Password" {...register("password")} />
      <span className="error">{errors.password?.message as String}</span>
      <p className="formLabel">Password confirmation :</p>
      <input
        type="password"
        placeholder="Password Confirmation"
        {...register("confirmPassword")}
      />
      <span className="error">{errors.confirmPassword?.message as String}</span>
      <button className="loginBtn" type="submit">
        Register
      </button>
    </form>
  );
};
