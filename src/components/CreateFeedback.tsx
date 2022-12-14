import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase'
import { useUserAuth } from "../context/UserAuthContext";
import Dialog from '@mui/material/Dialog';
import "../styles/createFeedback.css";


interface CreateFeedbackData {
  title: string;
  description: string;
  category: string;
}

export const CreateFeedback = ({ open, handleClose, getPosts }: any) => {
  const { user } = useUserAuth();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add description"),
    category: yup.string().required("You must select a category")
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFeedbackData>({
    resolver: yupResolver(schema),
  });
  const postsRef = collection(db, "posts");

  const onCreateFeedback = async (data: CreateFeedbackData) => {
    try {
      await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
        comments: [],
        likes: 0,
        createdAt: new Date().toString()
      })
      getPosts()
      handleClose();
    } catch (err) {
      console.log(err)
    }

    //close modal

  };

  return (
    <Dialog open={open}
      onClose={handleClose} fullScreen PaperProps={{ classes: { root: "createFeedbackDialog" } }} >
      <div className="wrapCreateFeedback">
        <p className='goBackFeedback' onClick={handleClose}> {"<"} Go Back </p>
        <h1 className="feedbackTitle" > Create New Feedback  </h1>
        <form className="feedbackForm" onSubmit={handleSubmit(onCreateFeedback)}>
          <span className="formSubtitle">Feedback Title</span>
          <span className="formDesc">Add a short, descriptive headline</span>
          <input className="formInput" type="text"  {...register("title")} />
          <span className="formError" >{errors.title?.message}</span>

          <span className="formSubtitle">Category</span>
          <span className="formDesc">Choose a category for your feedback</span>
          <select className="selectForm" defaultValue={"UI"} {...register("category")} >
            <option value="UI">UI</option>
            <option value="UX">UX</option>
            <option value="Enhancement"> Enhancement</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
          </select>
          <span className="formError" >{errors.category?.message}</span>

          <span className="formSubtitle">Feedback Detail</span>
          <span className="formDesc">Include any specific comments on what should be improved, added, etc..</span>
          <textarea
            className="formTextarea"
            placeholder="Type your feeback detail here"
            {...register("description")}
            rows={5}
            cols={33}
          />
          <span className="formError" >{errors.description?.message}</span>
          <div className="wrapBtns">
            <button onClick={handleClose} className="cancel">Cancel</button>
            <input className="addFeedback" value="Add Feedback" type="submit" />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
