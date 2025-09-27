import {  HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
     <HashLoader color="#4F46E5" className="h-10 w-10" />
    </div>
  );
};

export default Loader;
