import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { API } from "../utils/axios";
import PostSkeletion from "../skeletons/post.skeleton";

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => API.get(`/posts?userId=${userId}`).then((res) => res.data),
  });

  if (isLoading) return <PostSkeletion />;

  return (
    <div className="flex flex-col gap-3">
      {!isLoading && data?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Posts;
