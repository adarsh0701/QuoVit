import React, { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import User from "../User/User.jsx";
import "./css/LandingCard.css";
import following from '../Cards/img/Follow.png'
import friends from '../Cards/img/Friends.png'
import up from '../Cards/img/up.png'
import down from '../Cards/img/down.png'
import comment from '../Cards/img/comment.png'
import savenow from '../Cards/img/save.png'
import saved from '../Cards/img/savedItem.png'
import pic from './img/1.png'
import { deletePost, dislikePost, likePost, toggleSavePost } from "../../Actions/posts";
import DeleteIcon from '@material-ui/icons/Delete';

export default function LandingCard(props) {
  const [fullText,setFullText] = useState(true)
  const { creator , caption , desc , likes , dislikes , img , _id } = props.post;
  console.log("props",props)
  const [save,setSave] = useState(props.saved)
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth)
  const handleLikeClick = () => {
    dispatch(likePost(_id,auth._id));
  };
  const handleDislikeClick = () => {
    dispatch(dislikePost(_id,auth._id))
  }
  const handleSaveClick = () => {
    setSave(!save)
    dispatch(toggleSavePost(_id,auth._id))
  }
  const handleDelete = () => {
    dispatch(deletePost(_id,auth._id))
  }
  const [follow, setFollow] = useState(true);
  const likeCircleColors = ["#91C196","#C5D226", "#F6E015","#DA6767"];
  let diff = likes.length - dislikes.length
  const bgcolor = diff >= 10 ? 0 : diff>= 5 ? 1 : diff>= 3 ? 2 : 3;
  return (
    <div className="landingCard">
      {props.remove && <div className="bin-post"><DeleteIcon onClick={handleDelete}/></div>}
      <User user={creator} />
      <h3>{caption}</h3>
      <div>
        <div className="desc-div">
          {(desc.length>200 && fullText) ? 
              <p style={{fontSize:"small",color:"black"}}>{desc.substring(0,200)} &nbsp;<span onClick={()=>{setFullText(false);console.log("hello")}}>More</span></p> :
              <p style={{fontSize:"small",color:"black"}}>{desc}</p> 
          }
        </div>
        {img &&        
        <div className="post-img">
          <img src={img} alt="pic" />
        </div>}
        <div className="lcs-div">
          <div>
          <img src={up} alt="upvote" onClick={handleLikeClick} />
          <div className="like-circle" style={{borderColor:likeCircleColors[bgcolor]}}>
            {diff}
          </div>
          <img src={down} alt="downvote" onClick={handleDislikeClick} />
          </div>
          <div>
            <img src={comment} alt="comments" style={{marginRight:"0.3rem"}}/>
            {/* <p>{comments}</p> */}
            <p>5kk</p>
          </div>
          <div>
            <img src={save ? saved : savenow} alt="save" style={{marginRight:"0.3rem"}} onClick={handleSaveClick} />
            <p>{save ? "Saved" : "Save"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}



