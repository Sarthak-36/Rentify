import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";

const WishListCard = ({
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
  getPropertyList,
}) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/properties/${listingId}`);
  };
  const navigateToEdit = () => {
    navigate(`/properties/edit/${listingId}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_URL}/properties/delete/${listingId}`,
          { data: { userId: creator._id } }
        );
        if (response.data.success) {
          toast.success("Listing deleted successfully");
          getPropertyList();
        } else {
          toast.error("Failed to delete listing:", response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete listing:", error.message);
      }
    }
  };

  return (
    <div className="listing-card relative cursor-pointer p-4 rounded-md shadow-md hover:shadow-lg">
      <div className="w-full overflow-hidden rounded-md mb-4">
        <div className="relative flex-shrink-0 w-full h-72">
          <img
            src="/assets/card2.jpg"
            alt="property"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <h3 className="text-lg">
        {city}, {province}, {country}
      </h3>
      <p className="text-base">{category}</p>

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
        className="mt-4 w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800 transition-colors duration-300"
        onClick={navigateToDetails}
      >
        Detail View
      </button>
      <div className="mt-3 mb-4 flex justify-center items-center gap-x-10">
        <button
          className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md flex justify-center items-center gap-x-2"
          onClick={navigateToEdit}
        >
          <FaEdit className="text-white" />
          <span className="text-white font-medium">Edit Property</span>
        </button>
        <button
          className="px-5 py-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-md flex justify-center items-center gap-x-2"
          onClick={handleDelete}
        >
          <FaTrash className="text-white" />
          <span className="text-white font-medium">Delete Property</span>
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
