import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../ContextAPI/CartContext";
import SingleProduct from "./SingleProduct";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const [productCounts, setProductCounts] = useState(
    cart.reduce((counts, product) => {
      counts[product.id] = 1; 
      return counts;
    }, {})
  );

  
  const updateProductCount = (productId, newCount) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: newCount,
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = cart.reduce((sum, product) => {
      const productCount = productCounts[product.id];
      const productPrice = product.price;
      return sum + productCount * productPrice;
    }, 0);

    return totalPrice;
  };

  return (
    <div className="text-center ">
      <hr />
      <h1 style={{ color: "#ededed", fontWeight: "bolder" }}>MY CART</h1>
      <hr />
      <span className="container"> Total : Rs{calculateTotalPrice()}</span>

      {cart.length === 0 && (
        <div className="NoItems">
          <img
            src="https://img.freepik.com/premium-vector/young-man-standing-with-shopping-cart-he-holding-paper-list-mall-supermarket_1150-51048.jpg?size=626&ext=jpg&ga=GA1.2.531849636.1695725146&semt=ais"
            alt="Cart Empty image"
          />
        </div>
      )}

      <div className="cart-product">
        {cart.map((product) => (
          <SingleProduct
            key={product.id}
            product={product}
            cartPage={true}
            count={productCounts[product.id]}
            setCount={(newCount) => updateProductCount(product.id, newCount)}
          />
        ))}
      </div>
      <br />
      <span className="container1">Total : Rs{calculateTotalPrice()}</span>
    </div>
  );
};

export default Cart;
