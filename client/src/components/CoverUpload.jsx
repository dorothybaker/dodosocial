import { useEffect, useRef } from "react";
import { HiPlus } from "react-icons/hi";

export default function CoverUpload({ coverPic, setCoverPic }) {
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
          setCoverPic(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="bg-primary/10 w-full h-[150px] relative rounded-2xl overflow-hidden">
      {coverPic && (
        <img src={coverPic} className="w-full h-full object-cover" />
      )}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
        <button
          onClick={() => {
            widgetRef.current?.open();
          }}
          className="size-7 flex justify-center items-center bg-primary text-white rounded-full"
        >
          <HiPlus size={17} />
        </button>
        <h1 className="font-medium text-[13px] text-primary mt-2">
          Your cover picture
        </h1>
      </div>
    </div>
  );
}
