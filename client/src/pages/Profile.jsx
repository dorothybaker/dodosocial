import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import Posts from "../components/Posts";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/axios";
import { useLocation } from "react-router-dom";
import Update from "../components/Update";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => API.get(`/users/find/${userId}`).then((res) => res.data),
  });

  const { data: rData } = useQuery({
    queryKey: ["relationships", userId],
    queryFn: () =>
      API.get(`/relationships?followedUserId=${userId}`).then(
        (res) => res.data
      ),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return API.delete(`/relationships/delete?userId=${userId}`);
      }
      return API.post("/relationships/add", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships", userId] });
    },
  });
  const handleFollow = () => {
    mutation.mutate(rData?.includes(currentUser?.id));
  };

  const [update, setUpdate] = useState(false);

  return (
    <div className="flex-5 flex flex-col gap-4 w-full overflow-y-scroll h-full">
      <div className="sm:h-[200px] h-[150px] relative bg-gray-300">
        {data?.coverPic && (
          <img
            src={data?.coverPic}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <img
          src={
            data?.profilePic ||
            "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
          }
          alt=""
          className="absolute left-0 right-0 mx-auto sm:top-[130px] sm:w-[130px] sm:h-[130px] h-[100px] top-[100px] w-[100px] rounded-full object-cover"
        />
      </div>
      <div className="px-4 flex flex-col gap-4">
        <div className="shadow-md w-[95%] mx-auto min-h-[180px] flex items-end justify-center">
          <div className="flex flex-col items-center gap-2 py-4  justify-center text-center">
            <div className="flex flex-col items-center font-medium">
              <h1 className="font-semibold">{data?.name}</h1>
              <span className="text-sm text-primary">@{data?.username}</span>
              <span className="text-sm text-gray-500">
                {data?.caption || "Your caption here. <dodosocial>"}
              </span>
            </div>

            {data?.id === currentUser?.id ? (
              <button
                className="w-[100px] bg-primary py-2 text-white text-sm rounded-sm"
                onClick={() => setUpdate(true)}
              >
                Update
              </button>
            ) : (
              <button
                className="w-[100px] bg-primary py-2 text-white text-sm rounded-sm"
                onClick={handleFollow}
              >
                {rData?.includes(currentUser?.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <Posts userId={userId} />
      </div>

      {update && <Update setUpdate={setUpdate} user={data} />}
    </div>
  );
}

export default Profile;
