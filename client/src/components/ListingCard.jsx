import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdFavorite, MdFavoriteBorder, MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
import { toast } from "sonner";
import axios from "axios";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  index,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isWished = wishList?.find((item) => item?._id === listingId);
  const staticImages = ["/assets/register.jpg", "/assets/lux_cat.jpg", "/assets/beach_cat.jpg", "/assets/desert_cat.webp"];

  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/properties/likes/${listingId}`
      );
      setLikeCount(response.data.likeCount);
      const userId = user?._id;
      const userHasLiked = response.data.likeIds.includes(userId);
      setIsLiked(userHasLiked);
    } catch (error) {
      toast.error("something went wrong")
    }
  };
  
  useEffect(() => {
    fetchLikes();
  }, [listingId, user]);
  
  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/properties/like/${listingId}/${user._id}`
      );
      if (response.data.success) {
        setLikeCount((prevCount) => prevCount + 1);
        toast.success("Property liked!");
        fetchLikes();
      } else {
        toast.info(response.data.message); 
      }
    } catch (error) {
      // console.error("Failed to like property:", error);
    }
  };
  
  const handleUnlike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/properties/unlike/${listingId}/${user._id}`
      );
      if (response.data.success) {
        setLikeCount(likeCount - 1);
        toast.success("Property unliked!");
        fetchLikes(); 
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  


  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_URL}/users/${user?._id}/${listingId}`
        );
        const data = await response.data;
        dispatch(setWishList(data.wishList));
        toast.success(
          isWished ? "Removed from wishlist!" : "Added to wishlist!"
        );
      } catch (error) {
     
        toast.error("Failed to update wishlist");
      }
    }
  };

  const navigateToDetails = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/properties/${listingId}`);
    }
  };

  return (
    <div className="listing-card relative cursor-pointer p-4 rounded-md shadow-md hover:shadow-lg">
      <div className="w-full overflow-hidden rounded-md mb-2">
        <div className="relative flex-shrink-0 w-full h-72">
          <img
            src={staticImages[index % staticImages.length]}
            alt="property"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-center bg-slate-200 rounded-lg">
        <button
          className="border-none text-2xl cursor-pointer px-1 py-1"
          onClick={handleLikeClick}
          onDoubleClick={handleUnlike}
          disabled={!user}
        >
           {isLiked ? (
            <MdThumbUp color="blue" className="h-5 w-5" />
          ) : (
            <MdThumbUpOffAlt color="gray" className="h-5 w-5" />
          )}
        </button>
        <span className="ml-1 text-black font-semibold">{likeCount}</span>
      </div>

      <h3 className="text-lg font-semibold text-blue-800">
        {city}, {province}, {country}
      </h3>
      <p className="text-base font-medium">{category}</p>

      {!startDate && !endDate ? (
        <>
          <p className="text-base">{type}</p>
          <p className="text-base">
            <span className="font-semibold">${price}</span>/ Month
          </p>
        </>
      ) : (
        <>
          <p className="text-base">
            {startDate} - {endDate}
          </p>
          <p className="text-base">
            <span className="font-semibold">${totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className={`favorite absolute top-8 right-10 border-none text-2xl cursor-pointer ${
          isWished ? "text-red-500" : "text-gray-500"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isWished ? (
          <MdFavorite color="red" className="h-5 w-5" />
        ) : (
          <MdFavoriteBorder color="white" className="h-5 w-5" />
        )}
      </button>

      <button
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
        onClick={navigateToDetails}
      >
        I am Interested
      </button>
    </div>
  );
};

export default ListingCard;
