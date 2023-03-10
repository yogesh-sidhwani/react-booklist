import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const [redirectToBookDisplay, setRedirectToBookDisplay] = useState(false);
  const [total, setTotal] = useState(false);

  function handleRemoveFromCart(bookToRemove) {
    const cartValue = cart.filter((book) => book.id !== bookToRemove.id);
    setCart(cartValue);
  }

  useEffect(() => {
    let sum = cart.reduce((total, currentValue) => {
      return total + currentValue.price;
    }, 0);
    setTotal(sum);
    if (cart.length === 0) {
      setRedirectToBookDisplay(true);
    }
  }, [cart]);

  if (redirectToBookDisplay) {
    return <Redirect to="/books" />;
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((book) => (
          <li key={book.id}>
            {book.bookName} by {book.authorName}
            <span>
              {book.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <button onClick={() => handleRemoveFromCart(book)}>
              Remove from cart
            </button>
          </li>
        ))}
      </ul>
      <p className="total">
        {" "}
        Total:{" "}
        {total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}{" "}
      </p>
    </div>
  );
}

export default Cart;
