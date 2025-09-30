import { useParams } from "react-router-dom";
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import axios from "axios";

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)

  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await axios.get( import.meta.env.VITE_URL +`/properties/search/${search}`,)

      const data = await response.data
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list text-blue-500 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mt-5 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-25">{search}</h1>
      {listings.length === 0 ? (
        <div className="flex justify-center items-center text-xl h-20 text-blue-900 mb-10">
          <h1 className="text-lg font-semibold"> No listings present 🥲</h1>
        </div>
      ) : (
        <div className="list px-4 md:px-8 lg:px-12 xl:px-20 mt-8 flex justify-start flex-wrap gap-4">
          {listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }, index) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              index = {index}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
  
}

export default SearchPage