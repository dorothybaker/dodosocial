import { Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { GoHeart, GoHeartFill, GoShareAndroid } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import Comments from "./Comments";
import { useContext, useState } from "react";

import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/axios";
import { AuthContext } from "../context/authContext";
import { commentNumber } from "../utils/comment";

function Post({ post }) {
  const { data: comments } = commentNumber(post.id);

  const { currentUser } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => API.get(`/likes?postId=${post.id}`).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return API.delete(`/likes/delete?postId=${post.id}`);
      }
      return API.post("/likes/like", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return API.delete(`/posts/delete/${postId}`);
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser?.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const [commentOpen, setCommentOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex flex-col gap-3 shadow-md rounded-lg sm:p-2 p-1 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={
              post?.profilePic ||
              "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
            }
            alt=""
            className="rounded-full object-cover h-[35px] block"
            width={35}
          />
          <div className="flex flex-col">
            <Link
              to={`/profile/${[post?.userId]}`}
              className="text-sm font-medium"
            >
              {post?.name}
            </Link>
            <span className="text-xs text-gray-500">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div>
          {currentUser.id === post.userId && (
            <IoEllipsisHorizontal
              size={23}
              onClick={() => setMenu(!menu)}
              className="cursor-pointer"
            />
          )}
          {menu && (
            <div className="absolute top-9 right-0 z-10 bg-white shadow-sm p-2 min-w-[200px] rounded-b-lg">
              <ul className="text-sm flex flex-col gap-2">
                <li className="shadow-sm px-4 py-2.5">Tag friends</li>
                <li className="shadow-sm px-4 py-2.5">Pin</li>
                <li>
                  <button
                    className="bg-red-500 text-white py-2 rounded-md w-full"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {post?.description && (
          <p className="text-[15px] leading-[25px]">{post?.description}</p>
        )}
        {post?.image && (
          <img
            src={post?.image}
            className="w-full h-full object-cover sm:max-h-[350px] max-h-[230px]"
          />
        )}
      </div>
      <div className="flex sm:gap-4 gap-3 items-center">
        <div className="flex text-sm gap-1 items-center cursor-pointer">
          {data?.includes(currentUser?.id) ? (
            <GoHeartFill
              className="text-primary cursor-pointer"
              size={19}
              onClick={handleLike}
            />
          ) : (
            <GoHeart size={19} onClick={handleLike} />
          )}
          <span className="sm:text-sm text-xs">
            <span className="text-primary">{data?.length}</span>{" "}
            {data?.length === 1 ? "like" : "likes"}
          </span>
        </div>
        <div
          className="flex text-sm gap-1 items-center cursor-pointer"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <LiaCommentSolid size={20} />
          <span className="sm:text-sm text-xs">
            <span className="text-primary">{comments?.length}</span>{" "}
            {comments === 1 ? "comments" : "comments"}
          </span>
        </div>
        <div className="flex text-sm gap-1 items-center cursor-pointer">
          <GoShareAndroid size={19} />
          <span className="sm:text-sm text-xs">Share</span>
        </div>
      </div>
      {commentOpen && <Comments postId={post?.id} />}
    </div>
  );
}

export default Post;
