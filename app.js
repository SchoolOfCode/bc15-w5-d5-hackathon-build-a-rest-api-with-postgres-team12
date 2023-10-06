// Import the required modules
import express from "express";
import morgan from "morgan";

// Import artist-related helper functions
import {
  getArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
} from "./artists.js";

// Import book-related helper functions
// import {
//   getBooks,
//   getBookById,
//   createBook,
//   updateBookById,
//   deleteBookById,
// } from "./books.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Artists Route Handlers

// Endpoint to retrieve all artists
app.get("/artists/", async function (req, res) {
  const artists = await getArtists();
  res.status(200).json({ status: "success", data: artists });
});

// Endpoint to retrieve a specific artist by id
app.get("/artists/:id", async function (req, res) {
  const id = req.params.id;
  const artist = await getArtistById(id);
  // Assume 404 status if the artist is not found
  if (!artist) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artist });
});

// Endpoint to create a new artist
app.post("/artists/", async function (req, res) {
  const data = req.body;
  const artist = await createArtist(data);
  res.status(201).json({ status: "success", data: artist });
});

// Endpoint to update a specific artist by id
app.patch("/artists/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const artist = await updateArtistById(id, data);
  // Assume 404 status if the artist is not found
  if (!artist) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artist });
});

// Endpoint to delete a specific artist by id
app.delete("/artists/:id", async function (req, res) {
  const id = req.params.id;
  const artist = await deleteArtistById(id);
  // Assume 404 status if the artist is not found
  if (!artist) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artist });
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
