import { useEffect, useState } from "react";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import axios from "axios";
const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  const [listingsPerPage] = useState(6); 
  const [currentPage, setCurrentPage] = useState(1);
  const getFeedListings = async () => {
    try {
      const response = await axios.get(
        selectedCategory !== "All"
          ? `${import.meta.env.VITE_URL}/properties?category=${selectedCategory}`
          : `${import.meta.env.VITE_URL}/properties`
      );
  
      dispatch(setListings({ listings: response.data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = Array.isArray(listings) ? listings.slice(indexOfFirstListing, indexOfLastListing) : []; 

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="category-list flex justify-center flex-wrap gap-4 sm:gap-8 p-8">
        {categories?.map((category, index) => (
          <div
            className={`category flex flex-col items-center border-[3px] rounded-md border-pink-500 py-1.5 hover:bg-pink-100 px-3.5 text-darkgrey cursor-pointer ${category.label === selectedCategory ? "text-pinkred" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p className="text-lg font-semibold">{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings flex flex-wrap justify-center gap-4 sm:gap-8 px-4 lg:px-20 pb-20">
          {currentListings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }, index
             ) => (
              <ListingCard
                key={_id}
                index={index}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}

              />
            )
          )}
        </div>
      )}
  {/* paggination  */}
<div className="pagination flex justify-center  mb-5">
        {Array?.from({ length: Math.ceil(listings?.length / listingsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 border rounded-md ${
              currentPage === index + 1 ? "bg-pink-500 text-white" : "bg-white text-pink-500"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Listings;
