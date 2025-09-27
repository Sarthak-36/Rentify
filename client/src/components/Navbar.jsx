import { useEffect, useState } from "react";
import { MdMenu,  } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { BsPerson } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";



const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [initials, setInitials] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const getInitials = () => {
        const initi = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        setInitials(initi);
      };
      getInitials();
    } else {
      setInitials("");
    }
  }, [user]);

 

  return (
    <div className="navbar p-3 flex justify-between items-center relative">
      <Link to="/">
        <h1 className="text-3xl text-blue-800 font-bold"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>RENTIFY</h1>
      </Link>

      <div className="navbar_search hidden lg:flex border border-gray-300 rounded-full p-2">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />
        <button
          className={`flex justify-center items-center p-2 rounded-full ${search === "" ? "pointer-events-none" : "pointer-events-auto"}`}
          disabled={search === ""}
          onClick={() => navigate(`/properties/search/${search}`)}
        >
          <FaSearch className="text-pink-500" />
        </button>
      </div>

      <div className="navbar_right flex items-center gap-4">
        <Link to={user ? "/create-listing" : "/login"} className="host text-blue-500 font-semibold cursor-pointer hidden sm:inline">
          Become A Seller
        </Link>

        <button
          className="navbar_right_account flex items-center justify-center border border-gray-300 rounded-full p-2  px-4 cursor-pointer"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <MdMenu className="text-gray-500" />
          {!user ? (
            <BsPerson className="text-gray-500" />
          ) : (
            <div className="ml-1 w-7 h-7 flex items-center justify-center bg-pink-500 rounded-full text-white">
            {initials}
          </div>
          )}
        </button>

        {dropdownMenu && (
          <div className="navbar_right_accountmenu absolute bg-white right-4 top-16 flex flex-col w-48 border border-gray-300 rounded-lg shadow-lg z-10">
            {!user ? (
              <>
                <Link to="/login" className="p-2 hover:bg-gray-100 text-blue-500 font-semibold">Log In</Link>
                <Link to="/register" className="p-2 hover:bg-gray-100 text-blue-500 font-semibold">Sign Up</Link>
              </>
            ) : (
              <>
  
                <Link to={`/${user._id}/wishList`} className="p-2 hover:bg-gray-100 text-blue-500 font-semibold">Wish List</Link>
                <Link to={`/${user._id}/properties`} className="p-2 hover:bg-gray-100 text-blue-500 font-semibold">Property List</Link>
                <Link to="/create-listing" className="p-2 hover:bg-gray-100 text-blue-500 font-semibold">Become A Seller</Link>
                <Link
                  to="/"
                  className="p-2 hover:bg-gray-100 text-blue-500 font-semibold"
                  onClick={() => dispatch(setLogout())}
                >
                  Log Out
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
