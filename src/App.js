import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import Users from "./pages/Users";
import AboutUs from "./pages/restaurant/AboutUs";
import CusineTypes from "./pages/restaurant/CusineTypes";
import Resturants from "./pages/restaurant";
import Dashboard from "./pages/restaurant/Dashboard";
import Settings from "./pages/restaurant/Settings";
import RolesPermissions from "./pages/RolesPermissions";
import Statements from "./pages/restaurant/Statements";
import Menus from "./pages/restaurant/Menus";
import Coupons from "./pages/restaurant/Coupons";
import Schedule from "./pages/restaurant/Schedule";
import DeliveryZones from "./pages/restaurant/DeliveryZones";
import Banners from "./pages/restaurant/Banners";
import Photos from "./pages/restaurant/Photos";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/users" element={<Users/>} />
        <Route path="/restaurants" element={<Resturants/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/roles-permissions" element={<RolesPermissions/>} />
        <Route path="/statements" element={<Statements/>} />
        <Route path="/menus" element={<Menus/>} />
        <Route path="/coupons" element={<Coupons/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/delivery-zones" element={<DeliveryZones/>} />
        <Route path="/banners" element={<Banners/>} />
        <Route path="/photos" element={<Photos/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/cusine-types" element={<CusineTypes/>} />
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/update-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
