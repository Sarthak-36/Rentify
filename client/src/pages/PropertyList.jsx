import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import axios from "axios";
import WishListCard from "../components/WishListCard";
const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  // console.log(propertyList);

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_URL+ `/users/${user._id}/properties`,
       
      );
      const data = await response.data
      console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list text-blue-500 text-4xl text-center font-bold md:mx-4 lg:mx-16">
        Your Property List
      </h1>
      <div className="list flex justify-center flex-wrap gap-4 md:p-4 lg:p-16">
        {propertyList?.map(
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
          }) => (
            <WishListCard
              key={_id}
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
              getPropertyList={getPropertyList}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
