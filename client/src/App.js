import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import UserDash from "./Pages/UserDash";
import AdminDash from "./Pages/AdminDash";
import UserPrivateRoute from "./Components/UserPrivateRoute";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import Courses from "./Pages/Courses";
import SevFivVideos from "./Pages/SevFivVideos";
import Videos from "./Pages/Videos";
import AmazonCourse from "./Pages/AmazonCourse";
import WebsiteCourse from "./Pages/WebsiteCourse";
import EBook from "./Pages/EBook";
import RegularUpdate from "./Pages/RegularUpdate";
import SocialMediaContent from "./Pages/SocialMediaContent";
import Testimonial from "./Pages/Testimonial";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import SevFivTraining from "./Pages/SevFivTraining";
import LiveTraining from "./Pages/LiveTraining";
import LiveTraningAdmin from "./Pages/LiveTraningAdmin";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import Imfw from "./Pages/Imfw";
import Artists from "./Pages/Artists";
import HowWeWork from "./Pages/HowWeWork";
import Themes from "./Pages/Themes";
import Banner from "./Pages/Banner";
import ProductImage from "./Pages/ProductImage";
import ProductVideos from "./Pages/ProductVideos";
import Manufacturing from "./Pages/Manufacturing";
import AdminSocialMedia from "./Pages/AdminSocialMedia";
import UserSevFivPlayer from "./Pages/UserSevFivPlayer";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<LogIn />} />
          <Route path="/testimonials" exact element={<Testimonial />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/artists" exact element={<Artists />} />
          <Route path="/contactus" exact element={<ContactUs />} />
          <Route path="/how-we-work" exact element={<HowWeWork />} />

          <Route element={<UserPrivateRoute />}>
            <Route path="/userdash" exact element={<UserDash />} />
            <Route path="/amazon" exact element={<AmazonCourse />} />
            <Route path="/website" exact element={<WebsiteCourse />} />
            <Route path="/ebook" exact element={<EBook />} />
            <Route path="/regular-update" exact element={<RegularUpdate />} />
            <Route
              path="/75daystraining"
              exact
              element={<UserSevFivPlayer />}
            />
            <Route path="/live-training" exact element={<LiveTraining />} />
            <Route path="/themes" exact element={<Themes />} />
            <Route path="/banner" exact element={<Banner />} />
            <Route path="/product-images" exact element={<ProductImage />} />
            <Route path="/product-videos" exact element={<ProductVideos />} />
            <Route path="/manufacturing" exact element={<Manufacturing />} />
            <Route
              path="/social-media-content"
              exact
              element={<SocialMediaContent />}
            />
            <Route path="/video-player" element={<VideoPlayerPage />} />
            <Route path="/imfw" element={<Imfw />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admindash" element={<AdminDash />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/75videos" element={<SevFivVideos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/livetraining" element={<LiveTraningAdmin />} />
            <Route path="/social-media" element={<AdminSocialMedia />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
