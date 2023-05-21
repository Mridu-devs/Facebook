import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Comments({ postId }) {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  // console.log("postid of comment:", postId);

  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      // console.log("res-comment", res.data);
      return res.data;
    })
  );
  // console.log("datacomment", data);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const onClickSend = async (e) => {
    mutation.mutate({ desc, postId });
    // console.log("desc,postid", desc, postId);
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={onClickSend}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}
