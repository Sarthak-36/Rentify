import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_URL +`/properties?category=${category}`
      );

      const data = await response.data
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list text-blue-500 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-8 mx-auto text-center">
        {category} listings
      </h1>
      {listings.length === 0 ? (
        <div className="flex justify-center items-center text-xl  h-20  text-blue-900 mb-10 ">
         <h1 className="text-lg font-semibold"> No listings present 🥲</h1>
        </div>
      ) : (
        <div className="list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-8 md:px-16 xl:px-20">
          {listings.map(
            (
              {
                _id,
                creator,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              },
              index
            ) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                index={index}
              />
            )
          )}
        </div>
      )}
      <Footer/>
    </>
  );
};

export default CategoryPage;
