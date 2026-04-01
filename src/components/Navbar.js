import { Link, useNavigate } from "react-router-dom";
import { Navbar as RsNavbar, Nav, Badge } from "rsuite";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // TOTAL ITEMS COUNT
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <RsNavbar className="nav-container">
      <RsNavbar.Brand>👋 {user?.name || "User"}</RsNavbar.Brand>

      <Nav>
        <Nav.Item as={Link} to="/">
          Home
        </Nav.Item>
        <Nav.Item as={Link} to="/cart">
          Cart <Badge content={cartCount} className="cart-badge" />
        </Nav.Item>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={handleLogout}>Logout</Nav.Item>
      </Nav>
    </RsNavbar>
  );
};

export default Navbar;
