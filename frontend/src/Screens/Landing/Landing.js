import React, { useEffect } from "react";
import { getPosts } from "../../Actions/posts";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../Components/Structure/Main";
import "./css/Landing.css";
import LandingCard from "../../Components/Cards/LandingCard";
import AddPostModal from "./AddPostModal";
import Loader from "../../Components/Loader/loader";

export default function Landing(props){
  const dispatch = useDispatch();
  const {posts,savedPosts} = useSelector((state) => state.posts);
  const auth = useSelector((state)=>state.auth)
  useEffect(() => {
    dispatch(getPosts(auth._id));
  }, [dispatch,auth]);

    return (
        <MainLayout type="landing">
          <AddPostModal />
          {posts.length > 0 ? <div className="landing-main">
            {posts.map((post) => (
              <LandingCard
                post={post}
                saved={savedPosts.some(sPost=>sPost._id === post._id)}
              />
            ))}
          </div> : 
          <Loader />
          }
        </MainLayout>
    );
}


