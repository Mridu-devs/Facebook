import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../postcard/PostCard";
import "./posts.scss";
export default function Posts() {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );
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
