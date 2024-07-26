import Posts from "../components/Posts";
import Share from "../components/Share";
import Stories from "../components/Stories";

function Home() {
  return (
    <div className="flex-5 w-full">
      <div className="sm:p-4 p-2 flex flex-col gap-4">
        <Stories />
        <Share />
        <Posts />
      </div>
    </div>
  );
}

export default Home;
