import { categories } from "../data";
import { Link } from "react-router-dom";
import { FaPhone } from 'react-icons/fa'; 

const Categories = () => {
  return (
    <div className="categories px-8 py-12 sm:px-4">
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-pink-400 to-purple-400 p-8 rounded-lg shadow-lg mb-5">
      <h1 className="text-white text-4xl font-bold mb-6 ">Explore Top Categories</h1>
      <p className="text-center text-slate-200 max-w-lg text-lg  mb-8">
        Explore our wide range of vacation rentals that cater to all types of People. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div className="relative category w-full h-48 overflow-hidden rounded-lg cursor-pointer">
              <img src={category.img} alt={category.label} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <FaPhone className="text-3xl mb-2" />
                <p className="font-semibold">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
