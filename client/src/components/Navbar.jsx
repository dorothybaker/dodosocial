import { Link, useNavigate } from "react-router-dom";
import { MdOutlineApps } from "react-icons/md";
import { HiOutlineHome, HiOutlineSearch } from "react-icons/hi";
import {
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="shadow-md sticky top-0 bg-white z-[100]">
      <div className="h-[55px] flex justify-between items-center p-4 max-w-[1350px] w-full mx-auto gap-4">
        <div className="flex-1 flex items-center sm:gap-5 gap-3">
          <Link to="/">
            <span className="text-primary text-xl font-semibold">
              dodosocial.
            </span>
          </Link>
          <div className="sm:flex hidden items-center gap-5">
            <div>
              <HiOutlineHome size={19} />
            </div>
            <div>
              <MdOutlineApps size={19} />
            </div>
          </div>

          <div className="sm:flex hidden items-center gap-2 bg-gray-100 p-2 w-full rounded-lg">
            <HiOutlineSearch size={17} />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center sm:gap-5 gap-3 justify-end">
          <div>
            <IoPersonOutline
              size={21}
              className="hidden sm:block cursor-pointer"
            />
          </div>
          <div>
            <IoNotificationsOutline
              size={21}
              className="hidden sm:block cursor-pointer"
            />
          </div>
          <div>
            <IoLogOutOutline
              size={21}
              onClick={() => logout()}
              className="cursor-pointer"
            />
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(`/profile/${currentUser?.id}`)}
          >
            <img
              src={
                currentUser?.profilePic ||
                "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.avif"
              }
              alt="avatar"
              className="rounded-full size-8 object-cover block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
