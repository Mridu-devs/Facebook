import { makeRequest } from "../../axios";
import PostCard from "../postcard/PostCard";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
export default function Posts() {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  console.log("data posts---------", data);

  return (
    <div className="posts">
      {error
        ? "Ooopss! Something went Wrong"
        : isLoading
        ? "loading.."
        : data.map((post) => <PostCard post={post} key={post.id} />)}
    </div>
  );
}
