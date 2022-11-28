import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

interface CreateFeedbackData {
  title: string;
  description: string;
}

export const CreateFeedback = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add description"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFeedbackData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreateFeedback = async (data: CreateFeedbackData) => {
    console.log(data);
    console.log(postsRef)
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      likes: 0
    })
    //close modal

  };

  return (
    <form onSubmit={handleSubmit(onCreateFeedback)}>
      <input type="text" placeholder="Title.." {...register("title")} />
      <span>{errors.title?.message}</span>
      <textarea
        placeholder="Description.."
        {...register("description")}
      />
      <span>{errors.description?.message}</span>
      <input type="submit" />
    </form>
  );
};
