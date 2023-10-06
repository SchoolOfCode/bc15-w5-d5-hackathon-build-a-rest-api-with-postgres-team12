// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./index.js";

export async function getSongs() {
  // Query the database and return all songs

  // Define the SQL query to fetch all songs from the 'songs' table
  const queryText = "SELECT * FROM songs";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getSongById(id) {
  // Query the database and return the song with a matching id or null

  // Define the SQL query to fetch the song with the specified id from the 'songs' table
  const queryText = "SELECT * FROM songs WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a song with the specified id exists, it will be the first element in the rows array
  // If no song exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createSong(song) {
  const queryText =
    "INSERT INTO songs(song_name, album_name, artist_id) VALUES($1, $2, $3) RETURNING *";
  const values = [song.song_name, song.album_name, song.artist_id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function updateSongById(id, updates) {
  const queryText = `UPDATE songs SET song_name = $2, album_name = $3, artist_id = $4
    WHERE id = $1 RETURNING *`;
  const values = [id, updates.song_name, updates.album_name, updates.artist_id];
  // Query the database to update a song and return the newly updated song or null
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function deleteSongById(id) {
  // Query the database to delete a song and return the deleted song or null
  const queryText = "DELETE FROM songs WHERE id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
}
