import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { HiPlus } from "react-icons/hi";
import { API } from "../utils/axios";
import { IoClose } from "react-icons/io5";

export default function StoryUpload({ setImage, image, setUpload }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (img) => {
      return API.post("/stories/add", img);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

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
          setImage(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleStory = () => {
    image && mutation.mutate({ image });

    setUpload(false);
    setImage(null);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-[100]">
      <div className="m-auto min-h-[300px] bg-white w-full max-w-[400px] p-4 relative">
        <button
          onClick={() => setUpload(false)}
          className="absolute right-2 top-2 bg-primary text-white h-7 w-7 rounded-full flex items-center justify-center"
        >
          <IoClose size={20} />
        </button>
        <div className="flex flex-col gap-y-0">
          <h1 className="font-medium text-lg">Upload a story</h1>
          <span className="text-sm text-slate-500">
            Select a file to update your story status.
          </span>
        </div>
        <div className="w-full aspect-square mt-5 relative">
          {image && (
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover block rounded-xl"
            />
          )}
          <div className="absolute top-0 left-0 flex items-center justify-center bg-primary/10 rounded-2xl w-full h-full">
            <button
              className="h-9 w-9 rounded-full bg-primary flex justify-center items-center"
              onClick={() => {
                widgetRef.current?.open();
              }}
            >
              <HiPlus size={18} color="white" />
            </button>
          </div>
        </div>
        <button
          onClick={handleStory}
          className="bg-primary text-[15px] text-white h-11 rounded-md w-full mt-3"
          disabled={image === null}
        >
          Upload story thumbnail
        </button>
      </div>
    </div>
  );
}
