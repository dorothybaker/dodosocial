import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { API } from "../utils/axios";
import ProfileUpload from "./ProfileUpload";
import { useState } from "react";
import CoverUpload from "./CoverUpload";

export default function Update({ setUpdate, user }) {
  const [coverPic, setCoverPic] = useState(user.coverPic);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    caption: user.caption,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userInfo) => {
      return API.put("/users/update", userInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
    },
  });
  const updateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      mutation.mutate({ ...inputs, coverPic, profilePic });
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUpdate(false);
    }

    window.location.reload();
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen h-full bg-black/30 flex justify-center items-center z-[100]">
      <div className="lg:w-1/2 md:w-2/3 sm:w-[75%] w-[90%] mx-auto bg-white h-max relative p-4 rounded-xl overflow-y-auto">
        <button
          onClick={() => setUpdate(false)}
          className="absolute right-2 top-2 bg-primary text-white h-7 w-7 rounded-full flex items-center justify-center"
        >
          <IoClose size={20} />
        </button>
        <h1 className="text-lg font-medium">Update your profile status</h1>
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex gap-3 items-center">
            <CoverUpload coverPic={coverPic} setCoverPic={setCoverPic} />

            <ProfileUpload
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              className="px-3 h-12 w-full shadow-sm border border-gray-200 rounded-md outline-none text-[15px] text-[#222]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
              className="px-3 h-12 w-full shadow-sm border border-gray-200 rounded-md outline-none text-[15px] text-[#222]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Your caption</label>
            <input
              type="text"
              placeholder="Your dodosocial caption"
              value={inputs.caption}
              name="caption"
              onChange={handleChange}
              required
              className="px-3 h-12 w-full shadow-sm border border-gray-200 rounded-md outline-none text-[15px] text-[#222]"
            />
          </div>
          <button
            onClick={updateProfile}
            disabled={loading}
            className={`${
              loading ? "text-gray-400" : "text-white"
            } bg-primary h-11 rounded-md text-[15px]`}
          >
            {loading ? "Submitting" : "Submit your changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
