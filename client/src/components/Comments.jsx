import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { API } from "../utils/axios";
import moment from "moment";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { GoTrash } from "react-icons/go";

function Comments({ postId }) {
  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      API.get(`/comments?postId=${postId}`).then((res) => res.data),
  });

  const [loading, setLoading] = useState(false);
  const [commentMenu, setCommentMenu] = useState(false);
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment) => {
      return API.post("/comments/comment", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
      return API.delete(`/comments/delete/${commentId}`);
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const addComment = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      mutation.mutate({ description, postId });
      setDescription("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get current user
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <div className="flex gap-1 items-center mb-2 w-full">
        <img
          src={
            currentUser?.profilePic ||
            "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
          }
          className="rounded-full h-[32px] object-cover block"
          alt=""
          width={32}
        />
        <div className="rounded-md h-10 flex items-center w-full">
          <input
            type="text"
            placeholder="Write a comment"
            className="outline-none w-full px-2 rounded-s-md text-sm whitespace-nowrap overflow-hidden text-ellipsis border h-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className={`px-3 h-full bg-primary text-sm rounded-r-md ${
              loading ? "text-gray-400" : "text-white"
            }`}
            disabled={loading}
            onClick={addComment}
          >
            Send
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 divide-y">
        {data?.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-2 pt-1 relative"
          >
            <div>
              <div className="w-[30px]">
                <img
                  src={
                    comment.profilePic ||
                    "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
                  }
                  alt=""
                  width={30}
                  className="block mt-2 rounded-full h-[30px] object-cover"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full">
                <Link
                  to={`/profile/${comment?.userId}`}
                  className="text-sm w-max"
                >
                  {comment?.name}
                </Link>
                {comment.commentUserId === currentUser.id && (
                  <IoEllipsisHorizontal
                    size={20}
                    onClick={() => setCommentMenu(!commentMenu)}
                    className="cursor-pointer"
                  />
                )}
                {commentMenu && comment.commentUserId === currentUser.id && (
                  <div className="absolute top-6 right-0 bg-white shadow-sm min-w-[50px] p-2">
                    <ul className="flex flex-col gap-2 text-sm text-end">
                      <li className="flex items-center justify-end">
                        <button
                          className="h-6 w-6 rounded-full bg-red-500 flex justify-center items-center"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <GoTrash color="white" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-[13px]">{comment?.description}</p>
              <span className="text-xs text-gray-500">
                {moment(comment?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
