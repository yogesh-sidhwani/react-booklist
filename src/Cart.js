import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const [redirectToBookDisplay, setRedirectToBookDisplay] = useState(false);

  function handleRemoveFromCart(bookToRemove) {
    const cartValue = cart.filter((book) => book.id !== bookToRemove.id);
    setCart(cartValue);
  }

  useEffect(() => {
    if (cart.length === 0) {
      setRedirectToBookDisplay(true);
    }
  }, [cart]);

  if (redirectToBookDisplay) {
    return <Redirect to="/books" />;
  }
let total = 0;
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((book) => (
         
          <li key={book.id}>
            {book.bookName} by {book.authorName}
            <button onClick={() => handleRemoveFromCart(book)}>
              Remove from cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
