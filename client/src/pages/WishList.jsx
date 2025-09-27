// import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list text-blue-500 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mt-10 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40">Your Wish List</h1>
      <div className="list px-4 md:px-8 lg:px-12 xl:px-20 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 flex justify-center flex-wrap gap-4">
        {wishList?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
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
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
