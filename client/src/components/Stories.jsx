import { useContext, useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { AuthContext } from "../context/authContext";
import { API } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import StoryUpload from "./StoryUpload";

function Stories() {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      API.get("/stories").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="grid grid-cols-5 gap-2 sm:h-[200px] h-[150px] justify-center items-center">
      <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative text-white bg-primary/10">
        {currentUser?.coverPic && (
          <img
            src={currentUser?.coverPic}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30">
          <button
            className="sm:size-8 size-7 rounded-full bg-primary flex justify-center items-center"
            onClick={() => setUpload(!upload)}
          >
            <HiPlus size={20} />
          </button>
        </div>
        <div className="absolute left-[7px] bottom-1 flex items-center gap-1">
          <div>
            <div className="w-[25px]">
              <img
                src={
                  currentUser?.profilePic ||
                  "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
                }
                className="rounded-full h-[25px] object-cover block"
                alt=""
                width={25}
              />
            </div>
          </div>
          <span className="text-xs lg:block hidden truncate">
            @{currentUser?.username}
          </span>
        </div>
      </div>
      {data?.map((story) => (
        <div
          key={story.id}
          className="flex-1 w-full h-full rounded-2xl overflow-hidden relative text-white"
        >
          <img
            src={story.storyImg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-end">
            <div className="flex items-center gap-1 pl-[7px] pb-[4px]">
              <div>
                <div className="w-[25px]">
                  <img
                    src={
                      story?.profilePic ||
                      "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
                    }
                    className="rounded-full h-[25px] object-cover block"
                    alt=""
                    width={25}
                  />
                </div>
              </div>
              <span className="text-xs truncate lg:block hidden">
                @{story.username}
              </span>
            </div>
          </div>
        </div>
      ))}
      {upload && (
        <StoryUpload setImage={setImage} image={image} setUpload={setUpload} />
      )}
    </div>
  );
}

export default Stories;
