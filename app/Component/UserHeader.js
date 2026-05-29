import Navbar2 from "../Component/Navbar2";
import LoginPopup from "../Component/LoginPopup";
export default function UserHeader() {
  return (
    <div className="d-flex align-items-center gap-3 text-primary">
  {/* Cart button */}
    <Navbar2 />

  {/* Login link */}
  
    {/* <LoginPopup /> */}
 

  {/* User icon */}
  <i className="bi bi-person-circle fs-3"></i>

  {/* Divider (hidden on small screens) */}
  <span className="text-secondary d-none d-md-inline">|</span>
</div>
  );
}