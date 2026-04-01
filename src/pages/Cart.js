import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { Button, Panel, InputNumber, Message } from "rsuite";
import { motion } from "framer-motion";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  // TOTAL
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleOrder = async () => {
    const orderData = {
      user: "Guest User",
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      totalAmount,
    };

    await createOrder(orderData);

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <Message type="info" className="empty-cart">
          Your cart is empty
        </Message>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <motion.div
                key={item._id}
                className="cart-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Panel bordered shaded>
                  <div className="cart-item-content">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />

                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <p className="price">₹{item.price}</p>

                      <div className="cart-actions">
                        <InputNumber
                          min={1}
                          value={item.qty}
                          onChange={(value) => updateQty(item._id, value)}
                        />

                        <Button
                          appearance="ghost"
                          color="red"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Panel>
              </motion.div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Panel bordered shaded>
              <h3>Total: ₹{totalAmount}</h3>

              <Button
                appearance="primary"
                size="lg"
                block
                onClick={handleOrder}
              >
                Place Order 🚀
              </Button>
            </Panel>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Cart;
