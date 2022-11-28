import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserAuth } from "../context/UserAuthContext";

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    signInWithEmail(data.email, data.password);
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await signIn(email, password);
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="email" {...register("email")} />
        <span>{errors.email?.message}</span>
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
        <button type="submit">Submit</button>
      </form>
      <button onClick={signInWithGoogle}>Sign in w/ Google</button>
    </div>
  );
};
