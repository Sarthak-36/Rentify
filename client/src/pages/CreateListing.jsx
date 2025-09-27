import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import axios from "axios";

import { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      if(!category){
       toast.info("category is require");
       return
      }
      if(!type){
        toast.info("type is require");
        return
       }
       if(!guestCount){
        toast.info("guestCount is require");
        return
       }
       if(!bedroomCount){
        toast.info("bedroomCount is require");
        return
       }
       if(!bedCount){
        toast.info("bedCount is require");
        return
       }
       if(!bathroomCount){
        toast.info("bathroomCount is require");
        return
       }
       if(!amenities){
        toast.info("amenities is require");
        return
       }

      const formFields = {
        creator: creatorId,
        category,
        type,
        streetAddress: formLocation.streetAddress,
        aptSuite: formLocation.aptSuite,
        city: formLocation.city,
        province: formLocation.province,
        country: formLocation.country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title: formDescription.title,
        description: formDescription.description,
        highlight: formDescription.highlight,
        highlightDesc: formDescription.highlightDesc,
        price: formDescription.price,
      };
      /* Send a POST request to server */
      const response = await axios.post(
        import.meta.env.VITE_URL + "/properties/create",
        formFields  
      );
      if (response.data) {
        toast.success("Property Created Successfully");
        navigate("/");
      } else {
        toast.error(response.data?.message);
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 px-6 lg:px-16">
        <h1 className="text-3xl text-blue-600 font-bold mb-8">
          Publish Your Property
        </h1>
        <form onSubmit={handlePost} className="space-y-8">
          <div className="bg-white p-8 rounded-xl space-y-6">
            <h2 className="text-2xl text-pink-600 font-semibold">
              Step 1: Tell us about your place
            </h2>
            <hr className="border-t border-gray-200" />
            <h3 className="text-xl text-blue-600 font-medium">
              Which of these categories best describes your place?
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center w-28 h-24 border rounded-lg cursor-pointer transition duration-200 ${
                    category === item.label
                      ? "border-pink-600 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <p className="font-semibold">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl text-blue-600 font-medium">
              What type of place will guests have?
            </h3>
            <div className="space-y-4">
              {types?.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center max-w-xl p-4 border rounded-lg cursor-pointer transition duration-200 ${
                    type === item.name
                      ? "border-pink-600 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setType(item.name)}
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="text-3xl">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3 className="text-xl text-blue-600 font-medium">
              Where&apos;s your place located?
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold">
                    Apartment, Suite, etc. (if applicable)
                  </p>
                  <input
                    type="text"
                    placeholder="Apt, Suite, etc. (if applicable)"
                    name="aptSuite"
                    value={formLocation.aptSuite}
                    onChange={handleChangeLocation}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">City</p>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formLocation.city}
                    onChange={handleChangeLocation}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold">Province</p>
                  <input
                    type="text"
                    placeholder="Province"
                    name="province"
                    value={formLocation.province}
                    onChange={handleChangeLocation}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Country</p>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formLocation.country}
                    onChange={handleChangeLocation}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-xl text-blue-600 font-medium">
              Share some basics about your place
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Basic Count Elements */}
              {[
                { label: "Guests", count: guestCount, setCount: setGuestCount },
                {
                  label: "Bedrooms",
                  count: bedroomCount,
                  setCount: setBedroomCount,
                },
                { label: "Beds", count: bedCount, setCount: setBedCount },
                {
                  label: "Bathrooms",
                  count: bathroomCount,
                  setCount: setBathroomCount,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <p className="font-semibold">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <IoRemoveCircleOutline
                      onClick={() =>
                        item.count > 1 && item.setCount(item.count - 1)
                      }
                      className="text-xl cursor-pointer hover:text-pink-600"
                    />
                    <p className="text-xl">{item.count}</p>
                    <IoAddCircleOutline
                      onClick={() => item.setCount(item.count + 1)}
                      className="text-xl cursor-pointer hover:text-pink-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl space-y-6">
            <h2 className="text-2xl text-pink-600 font-semibold">
              Step 2: Make your place stand out
            </h2>
            <hr className="border-t border-gray-200" />

            <h3 className="text-xl text-blue-600 font-medium">
              Tell guests what your place has to offer
            </h3>
            <div className="flex flex-wrap gap-4">
              {facilities?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center w-48 h-24 border rounded-lg cursor-pointer transition duration-200 ${
                    amenities.includes(item.name)
                      ? "border-pink-600 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <p className="font-semibold">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="w-full   p-6 ">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Describe your place to guests
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formDescription.title}
                  onChange={handleChangeDescription}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold"
                >
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  name="description"
                  value={formDescription.description}
                  onChange={handleChangeDescription}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="highlight"
                  className="block text-gray-700 font-semibold"
                >
                  Highlight
                </label>
                <input
                  type="text"
                  placeholder="Highlight"
                  name="highlight"
                  value={formDescription.highlight}
                  onChange={handleChangeDescription}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="highlightDesc"
                  className="block text-gray-700 font-semibold"
                >
                  Highlight details
                </label>
                <textarea
                  placeholder="Highlight details"
                  name="highlightDesc"
                  value={formDescription.highlightDesc}
                  onChange={handleChangeDescription}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-semibold"
                >
                  Now, set your PRICE
                </label>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">$</span>
                  <input
                    type="number"
                    placeholder="100"
                    name="price"
                    value={formDescription.price}
                    onChange={handleChangeDescription}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full ml-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl space-y-6">
            <h2 className="text-2xl text-pink-600 font-semibold">
              Step 3: Finish up and publish
            </h2>
            <hr className="border-t border-gray-200" />

            <h3 className="text-xl text-blue-600 font-medium">
              Submit your listing
            </h3>
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg transition duration-200 hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
