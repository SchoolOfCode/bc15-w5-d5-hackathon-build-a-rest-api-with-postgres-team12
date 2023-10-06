// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./index.js";

export async function getArtists() {
  // Query the database and return all authors

  // Define the SQL query to fetch all books from the 'books' table
  const queryText = "SELECT * FROM artists ";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getArtistById(id) {
  // Query the database and return the author with a matching id or null
  // Define the SQL query to fetch the book with the specified id from the 'books' table
  const queryText = "SELECT * FROM artists WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createArtist(artist) {
  // Query the database to create an author and return the newly created author
  const queryText =
    "INSERT INTO authors (first_name, last_name ) VALUES($1, $2) RETURNING *";
  const values = [artist.name, artist.music_genre];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function updateArtistById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
  //const { first_name, last_name } = updates;
  const queryText = `UPDATE artists SET name = ($2), music_genre = ($3) 
    WHERE id = $1 RETURNING *`;
  const values = [id, updates.name, updates.music_genre];
  // Query the database to update a book agnd return the newly updated book or null
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function deleteArtistById(id) {
  // Query the database to delete an author and return the deleted author or null
  // Query the database to delete a book and return the deleted book or null
  const queryText = `DELETE FROM artists
    WHERE id = $1 RETURNING *`;
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
}
