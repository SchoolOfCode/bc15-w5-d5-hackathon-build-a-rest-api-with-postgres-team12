import { pool } from "./index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS songs CASCADE;
      DROP TABLE IF EXISTS artists CASCADE;
    `);

    // Create the artists table with a foreign key to the songs table
    await pool.query(`
      CREATE TABLE artists (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        music_genre VARCHAR(255) NOT NULL
      );
    `);

    // Create the songs table
    await pool.query(`
      CREATE TABLE songs (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        song_name VARCHAR(255) NOT NULL,
        album_name VARCHAR(255) NOT NULL,
        artist_id INT REFERENCES artists(id)
      );
    `);

    // Seed the artists table
    await pool.query(`
      INSERT INTO artists (name, music_genre)
      VALUES 
        ('Michael Jackson', 'pop'),
        ('Kylie Minogue', 'pop'),
        ('Green Day', 'rock')
    `);

    // Seed the books table
    await pool.query(`
      INSERT INTO songs (song_name, album_name, artist_id)
      VALUES 
        ('All the lovers', 'Aphrodite', 2),
        ('Padam Padam', 'Tension', 2),
        ('Billie Jean', 'Thriller', 1),
        ('Wake me up when September ends', 'American Idiot', 3),
        ('Black or White', 'Dangerous', 1)
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
