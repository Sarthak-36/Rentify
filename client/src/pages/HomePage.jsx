import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const HomePage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);
    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <Slide />
                <Categories />
                <Listings />
            </div>
            <Footer />
        </>
    );
};

export default HomePage;

