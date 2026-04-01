import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input, SelectPicker, Button, Panel } from "rsuite";
import { motion } from "framer-motion";
import "./Home.css";
import { useCallback } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { logout } = useAuth();

  const categories = [...new Set(products.map((p) => p.category))];

  const categoryOptions = [
    { label: "All", value: "" },
    ...categories.map((cat) => ({
      label: cat.toUpperCase(),
      value: cat,
    })),
  ];

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchProducts = useCallback(async () => {
    const res = await getProducts(filters);
    setProducts(res.data);
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      {/* HEADER */}
      <div className="home-header">
        <h2>🛒 Mohan Store</h2>
        <Button appearance="ghost" color="red" onClick={logout}>
          Logout
        </Button>
      </div>

      {/* FILTER SECTION */}
      <div className="filters">
        <Input
          placeholder="Search products..."
          onChange={(value) => setFilters({ ...filters, keyword: value })}
        />

        <SelectPicker
          data={categoryOptions}
          onChange={(value) => setFilters({ ...filters, category: value })}
        />

        <Input
          type="number"
          placeholder="Min Price"
          onChange={(value) => setFilters({ ...filters, minPrice: value })}
        />

        <Input
          type="number"
          placeholder="Max Price"
          onChange={(value) => setFilters({ ...filters, maxPrice: value })}
        />

        <Button appearance="primary" onClick={fetchProducts}>
          Apply
        </Button>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map((p, index) => (
          <motion.div
            key={p._id}
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Panel bordered shaded>
              <img src={p.image} alt={p.name} className="product-img" />

              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>

              <Link to={`/product/${p._id}`}>
                <Button appearance="primary" block>
                  View Details
                </Button>
              </Link>
            </Panel>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
