import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { Button, Panel, Loader } from "rsuite";
import { motion } from "framer-motion";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // ✅ NOW USED
    }
  };

  fetchProduct();
}, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="lg" content="Loading Product..." />
      </div>
    );
  }

  return (
    <div className="details-container">
      <motion.div
        className="details-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Panel bordered shaded>
          <div className="details-content">
            {/* IMAGE */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="details-image"
              whileHover={{ scale: 1.05 }}
            />

            {/* DETAILS */}
            <div className="details-info">
              <h2>{product.name}</h2>

              <p className="description">{product.description}</p>

              <h3 className="price">₹{product.price}</h3>

              <Button
                appearance="primary"
                size="lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart 🛒
              </Button>
            </div>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
