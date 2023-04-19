import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div style={{ width: "90%" }}>
        <Stories />
      </div>
      <Posts />
    </div>
  );
};

export default Home;
