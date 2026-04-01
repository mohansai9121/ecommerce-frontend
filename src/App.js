import "./App.css";
import AppRoutes from "./routes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />} {/* 👈 only if logged in */}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
