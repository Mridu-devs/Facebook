import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Stories from "../../components/stories/Stories";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div style={{ width: "90%" }}>
        <Stories />
      </div>
      <Share/>
      <Posts />
    </div>
  );
};

export default Home;
