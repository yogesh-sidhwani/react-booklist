import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TableRow,
  IconButton,
  Badge,
} from "@mui/material";
import "./BookDisplay.css";
import { ShoppingCart } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

function BookDisplay({ cart, setCart }) {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8080/book/getAllBooks/1")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));

    // remove the mock data
    // const books = [
    //   {
    //     id: 1,
    //     bookName: "Harry Potter",
    //     noOfBooks: 5,
    //     description: "Goblet of fire",
    //     price: 19.99,
    //     authorName: "JK Rowling",
    //     inStock: true,
    //     image: "book_image",
    //   },
    //   {
    //     id: 2,
    //     bookName: "Scary Potter",
    //     noOfBooks: 5,
    //     description: "Goblet of fire",
    //     price: 19.99,
    //     authorName: "JK Rowling",
    //     inStock: true,
    //     image: "book_image",
    //   },
    // ];

    setBooks(books);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books?.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleAddToCart(book) {
    if (!cart.filter((cartBook) => book.id === cartBook.id).length > 0) {
      setCart([...cart, book]);
    }
  }

  const handleCartClick = () => {
    history.push("/cart");
  };

  const removeFromCart = (bookToRemove) => {
    setCart(cart.filter((book) => book.id !== bookToRemove.id));
  };

  return (
    <div>
      <h2>Books</h2>
      <TextField
        label="Search books by title"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IconButton onClick={handleCartClick}>
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.authorName}</TableCell>
              <TableCell>
                {book.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>
                <button
                  disabled={
                    cart.filter((cartBook) => book.id === cartBook.id).length >
                    0
                  }
                  onClick={() => handleAddToCart(book)}
                >
                  Add
                </button>
              </TableCell>
              <TableCell>
                <button
                  disabled={
                    !cart.filter((cartBook) => book.id === cartBook.id).length >
                    0
                  }
                  onClick={() => removeFromCart(book)}
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BookDisplay;
