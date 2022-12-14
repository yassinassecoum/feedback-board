import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserAuth } from "../context/UserAuthContext";

import googleIcon from "../assets/google.png";

export const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn, signIn } = useUserAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email adress not valid!")
      .required("Email is required!"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters!")
      .max(20, "Password must be below 20 characters!")
      .required("Password is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });

  const onSubmit = (data: any) => {
    signInWithEmail(data.email, data.password);
  };

  const signInWithGoogle = async (e: any) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithEmail = async (email: String, password: String) => {
    try {
      await signIn(email, password);
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="formLabel">Email :</p>
      <input type="text" placeholder="email@mail.com" {...register("email")} />
      <span className="error">{errors.email?.message as String}</span>
      <p className="formLabel">Password :</p>
      <input type="password" placeholder="Password" {...register("password")} />
      <span className="error">{errors.password?.message as String}</span>
      <button className="loginBtn" type="submit">
        Sign in
      </button>
      <button className="googleBtn" onClick={(e) => signInWithGoogle(e)}>
        Sign in with
        <img className="googleIcon" src={googleIcon} alt="google icon" />
      </button>
    </form>
  );
};
