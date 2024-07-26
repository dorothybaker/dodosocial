function RightBar() {
  return (
    <div
      className="flex-3 sticky top-[55px] lg:flex hidden"
      style={{ height: "calc(100vh - 55px)" }}
    >
      <div className="flex flex-col gap-4 p-4 w-full h-full overflow-y-scroll">
        <div className="p-2 shadow-md rounded-md">
          <span className="text-sm text-gray-500 mb-2 block">
            Suggestions for you
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center lg:flex-row flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/boy"
                  alt=""
                  width={35}
                />
                <span className="text-sm">John Smith</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm py-1.5 px-2.5 rounded-sm bg-primary text-white">
                  Follow
                </button>
                <button className="text-sm py-1.5 px-2.5 rounded-sm bg-red-500 text-white">
                  Dismiss
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center lg:flex-row flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/girl"
                  alt=""
                  width={35}
                />
                <span className="text-sm">Hailey Doe</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm py-1.5 px-2.5 rounded-sm bg-primary text-white">
                  Follow
                </button>
                <button className="text-sm py-1.5 px-2.5 rounded-sm bg-red-500 text-white">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 shadow-md rounded-md">
          <span className="text-sm text-gray-500 mb-2 block">
            Latest Activites
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/job/police/male"
                  alt=""
                  width={35}
                />
                <div className="flex flex-col">
                  <span className="text-[13px]">
                    Henry Paul liked your post.
                  </span>
                  <div className="text-xs text-gray-600">1 min ago</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/job/doctor/female"
                  alt=""
                  width={35}
                />
                <div className="flex flex-col">
                  <span className="text-[13px]">
                    Venita Oz changed profile.
                  </span>
                  <div className="text-xs text-gray-600">10 hrs ago</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/job/designer/male"
                  alt=""
                  width={35}
                />
                <div className="flex flex-col">
                  <span className="text-[13px]">Jack Ma created a post.</span>
                  <div className="text-xs text-gray-600">3 day ago</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/job/teacher/female"
                  alt=""
                  width={35}
                />
                <div className="flex flex-col">
                  <span className="text-[13px]">Flora new to dodosocial.</span>
                  <div className="text-xs text-gray-600">1 hr ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 shadow-md rounded-md">
          <span className="text-sm text-gray-500 mb-2 block">
            Online Friends
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 relative">
              <img
                src="https://avatar.iran.liara.run/public/job/police/female"
                alt=""
                width={35}
              />
              <div
                className="h-2.5 w-2.5 rounded-full absolute left-[27px] top-0"
                style={{ background: "limegreen" }}
              />
              <span className="text-sm">Taiana Ray</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <img
                src="https://avatar.iran.liara.run/public/job/doctor/male"
                alt=""
                width={35}
              />
              <div
                className="h-2.5 w-2.5 rounded-full absolute left-[27px] top-0"
                style={{ background: "limegreen" }}
              />
              <span className="text-sm">Mitch Mayeh</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <img
                src="https://avatar.iran.liara.run/public/job/designer/female"
                alt=""
                width={35}
              />
              <div
                className="h-2.5 w-2.5 rounded-full absolute left-[27px] top-0"
                style={{ background: "limegreen" }}
              />
              <span className="text-sm">Ester Ricer</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <img
                src="https://avatar.iran.liara.run/public/job/chef/male"
                alt=""
                width={35}
              />
              <div
                className="h-2.5 w-2.5 rounded-full absolute left-[27px] top-0"
                style={{ background: "limegreen" }}
              />
              <span className="text-sm">Shaun Fudo</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <img
                src="https://avatar.iran.liara.run/public/job/farmer/female"
                alt=""
                width={35}
              />
              <div
                className="h-2.5 w-2.5 rounded-full absolute left-[27px] top-0"
                style={{ background: "limegreen" }}
              />
              <span className="text-sm">Cathy Tuha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
