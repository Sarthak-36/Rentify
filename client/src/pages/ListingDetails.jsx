import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { facilities } from "../data";
import axios from "axios";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [initials, setInitials] = useState("");

 

  const getListingDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_URL + `/properties/${listingId}`
      );
      const data = await response.data;
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  useEffect(() => {
    if (listing && listing.creator.firstName && listing.creator.lastName) {
      const getInitials = () => {
        const initi = `${listing.creator.firstName.charAt(
          0
        )}${listing.creator.lastName.charAt(0)}`.toUpperCase();
        setInitials(initi);
      };
      getInitials();
    } else {
      setInitials("");
    }
  }, [listing]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="px-10 py-10 md:px-20 md:py-20 lg:px-32 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-800">{listing.title}</h1>
        </div>

        <div className="flex  mb-6">
          <img
            src="/assets/modern_cat.webp"
            alt="listing photo"
            className="w-2/3 max-h-screen rounded-md"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p className="text-lg font-semibold mb-4">
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr className="mb-4" />

        <div className="flex items-center gap-4 mb-6">
          <div className="ml-1 w-10 h-10 flex items-center font-semibold justify-center bg-red-800 rounded-full text-white">
            {initials}
          </div>
          <h3 className="text-xl font-semibold ">
            Hosted by <span className="text-blue-500">{listing.creator.firstName.toUpperCase()} {listing.creator.lastName.toUpperCase()}</span>
          </h3>
          <h3 className="text-xl font-semibold">
            Contact No:  <span className="text-blue-500 underline">{listing.creator.phone} </span>
          </h3>
        </div>

        
        <hr className="mb-4" />

        <h3 className="text-xl font-semibold mb-2 text-slate-800">Description</h3>
        <p className="text-lg mb-4 text-gray-500">{listing.description}</p>
        <hr className="mb-4" />

        <h3 className="text-xl font-semibold mb-2 text-slate-800">{listing.highlight}</h3>
        <p className="text-lg mb-4 text-gray-500">{listing.highlightDesc}</p>
        <hr className="mb-4" />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">
            What this place offers?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listing.amenities[0].split(",").map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-2xl">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
   <Footer />
    </>
  );
};

export default ListingDetails;
