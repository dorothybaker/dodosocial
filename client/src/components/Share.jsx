import { useContext, useEffect, useRef, useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoImagesOutline, IoLocationSharp } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/axios";

function Share() {
  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "r5y9cmqc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setFile(result.info.secure_url);
        }
      }
    );
  }, []);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return API.post("/posts/post", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const addPost = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      mutation.mutate({ description, image: file });
      setDescription("");
      setFile(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 shadow-md rounded-lg">
      <div className="flex flex-col divide-y gap-2">
        <div className="flex items-center gap-x-2 pb-1">
          <div>
            <div className="block size-8">
              <img
                src={
                  currentUser?.profilePic ||
                  "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
                }
                className="rounded-full h-full w-full object-cover block"
                alt=""
              />
            </div>
          </div>
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser?.name}!`}
            className="w-full outline-none text-[15px] whitespace-nowrap overflow-hidden text-ellipsis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="pt-2 flex justify-between items-center sm:flex-row flex-col gap-2">
          <div className="flex sm:gap-3 gap-2 items-center w-full">
            <div>
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => widgetRef.current?.open()}
              >
                <LuImagePlus size={18} color="green" />
                <span className="lg:text-sm text-xs font-medium mt-1">
                  {file ? "Added" : "Photo"}
                </span>
              </div>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <IoLocationSharp size={19} color="#d90166" />
              <span className="lg:text-sm text-xs font-medium mt-1">
                Location
              </span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <BsPersonPlusFill size={18} className="text-primary" />
              <span className="lg:text-sm text-xs font-medium mt-1">
                Tag friends
              </span>
            </div>
          </div>
          <button
            className={`px-4 py-2 bg-primary text-sm rounded-md mt-0.5 ${
              loading ? "text-gray-400" : "text-white"
            } sm:w-max w-full`}
            onClick={addPost}
            disabled={loading}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share;
