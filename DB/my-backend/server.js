const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "sa",
  password: "Voyage2024",
  server: "localhost",
  port: 1433,
  database: "VoyageDiary",
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};


async function initDatabase() {
  try {
    await sql.connect(config);
    
   
    await sql.query(`IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'VoyageDiary')
                     CREATE DATABASE VoyageDiary`);
    
    await sql.query(`USE VoyageDiary`);
    
   
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tag')
      CREATE TABLE Tag (
        Tag_ID INT PRIMARY KEY IDENTITY(1,1),
        Tag_Name VARCHAR(50) NOT NULL
      );
      
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
      CREATE TABLE Users (
        User_ID INT PRIMARY KEY IDENTITY(1,1),
        Username VARCHAR(25) NOT NULL UNIQUE,
        Vorname VARCHAR(25),
        Nachname VARCHAR(25),
        Email VARCHAR(50) NOT NULL UNIQUE,
        Passwort VARCHAR(255) NOT NULL
      );
      
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Beitrag')
      CREATE TABLE Beitrag (
        Beitrag_ID INT PRIMARY KEY IDENTITY(1,1),
        Text VARCHAR(MAX),
        Bildverweis VARCHAR(500),
        Likes INT DEFAULT 0,
        User_ID INT NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
      );
      
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Beitrag_Tag')
      CREATE TABLE Beitrag_Tag (
        Beitrag_ID INT NOT NULL,
        Tag_ID INT NOT NULL,
        PRIMARY KEY (Beitrag_ID, Tag_ID),
        FOREIGN KEY (Beitrag_ID) REFERENCES Beitrag(Beitrag_ID) ON DELETE CASCADE,
        FOREIGN KEY (Tag_ID) REFERENCES Tag(Tag_ID) ON DELETE CASCADE
      );
      
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Kommentar')
      CREATE TABLE Kommentar (
        Kommentar_ID INT PRIMARY KEY IDENTITY(1,1),
        Kommentar_Text VARCHAR(MAX),
        User_ID INT NOT NULL,
        Beitrag_ID INT NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE,
        FOREIGN KEY (Beitrag_ID) REFERENCES Beitrag(Beitrag_ID) ON DELETE CASCADE
      );
    `);
    
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}


app.get("/api/users", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT User_ID, Username, Vorname, Nachname, Email FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { Username, Vorname, Nachname, Email, Passwort } = req.body;
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Username", sql.VarChar(25), Username)
      .input("Vorname", sql.VarChar(25), Vorname)
      .input("Nachname", sql.VarChar(25), Nachname)
      .input("Email", sql.VarChar(50), Email)
      .input("Passwort", sql.VarChar(255), Passwort)
      .query(`
        INSERT INTO Users (Username, Vorname, Nachname, Email, Passwort)
        VALUES (@Username, @Vorname, @Nachname, @Email, @Passwort);
        SELECT SCOPE_IDENTITY() AS User_ID;
      `);
    
    res.status(201).json({ User_ID: result.recordset[0].User_ID, message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/beitrag", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT b.*, u.Username 
      FROM Beitrag b
      JOIN Users u ON b.User_ID = u.User_ID
      ORDER BY b.CreatedAt DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/beitrag/:id", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Beitrag_ID", sql.Int, req.params.id)
      .query(`
        SELECT b.*, u.Username 
        FROM Beitrag b
        JOIN Users u ON b.User_ID = u.User_ID
        WHERE b.Beitrag_ID = @Beitrag_ID
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Beitrag not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/beitrag", async (req, res) => {
  const { Text, Bildverweis, User_ID, Tags } = req.body;
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Text", sql.VarChar(sql.MAX), Text)
      .input("Bildverweis", sql.VarChar(500), Bildverweis)
      .input("User_ID", sql.Int, User_ID)
      .query(`
        INSERT INTO Beitrag (Text, Bildverweis, User_ID)
        VALUES (@Text, @Bildverweis, @User_ID);
        SELECT SCOPE_IDENTITY() AS Beitrag_ID;
      `);
    
    const beitragId = result.recordset[0].Beitrag_ID;
    
   
    if (Tags && Tags.length > 0) {
      for (const tagName of Tags) {
        // Get or create tag
        const tagResult = await pool.request()
          .input("Tag_Name", sql.VarChar(50), tagName)
          .query(`
            IF NOT EXISTS (SELECT * FROM Tag WHERE Tag_Name = @Tag_Name)
              INSERT INTO Tag (Tag_Name) VALUES (@Tag_Name);
            SELECT Tag_ID FROM Tag WHERE Tag_Name = @Tag_Name;
          `);
        
        const tagId = tagResult.recordset[0].Tag_ID;
        
      
        await pool.request()
          .input("Beitrag_ID", sql.Int, beitragId)
          .input("Tag_ID", sql.Int, tagId)
          .query(`
            INSERT INTO Beitrag_Tag (Beitrag_ID, Tag_ID)
            VALUES (@Beitrag_ID, @Tag_ID)
          `);
      }
    }
    
    res.status(201).json({ Beitrag_ID: beitragId, message: "Beitrag created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/beitrag/:id/like", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("Beitrag_ID", sql.Int, req.params.id)
      .query(`
        UPDATE Beitrag 
        SET Likes = Likes + 1 
        WHERE Beitrag_ID = @Beitrag_ID
      `);
    
    res.json({ message: "Liked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/beitrag/:id/kommentare", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Beitrag_ID", sql.Int, req.params.id)
      .query(`
        SELECT k.*, u.Username 
        FROM Kommentar k
        JOIN Users u ON k.User_ID = u.User_ID
        WHERE k.Beitrag_ID = @Beitrag_ID
        ORDER BY k.CreatedAt ASC
      `);
    
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/kommentar", async (req, res) => {
  const { Kommentar_Text, User_ID, Beitrag_ID } = req.body;
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Kommentar_Text", sql.VarChar(sql.MAX), Kommentar_Text)
      .input("User_ID", sql.Int, User_ID)
      .input("Beitrag_ID", sql.Int, Beitrag_ID)
      .query(`
        INSERT INTO Kommentar (Kommentar_Text, User_ID, Beitrag_ID)
        VALUES (@Kommentar_Text, @User_ID, @Beitrag_ID);
        SELECT SCOPE_IDENTITY() AS Kommentar_ID;
      `);
    
    res.status(201).json({ Kommentar_ID: result.recordset[0].Kommentar_ID, message: "Comment added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/tags", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Tag ORDER BY Tag_Name");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/beitrag/tag/:tagName", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("Tag_Name", sql.VarChar(50), req.params.tagName)
      .query(`
        SELECT b.*, u.Username 
        FROM Beitrag b
        JOIN Users u ON b.User_ID = u.User_ID
        JOIN Beitrag_Tag bt ON b.Beitrag_ID = bt.Beitrag_ID
        JOIN Tag t ON bt.Tag_ID = t.Tag_ID
        WHERE t.Tag_Name = @Tag_Name
        ORDER BY b.CreatedAt DESC
      `);
    
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

initDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Available endpoints:");
    console.log("  GET  /api/users");
    console.log("  POST /api/users");
    console.log("  GET  /api/beitrag");
    console.log("  GET  /api/beitrag/:id");
    console.log("  POST /api/beitrag");
    console.log("  PUT  /api/beitrag/:id/like");
    console.log("  GET  /api/beitrag/:id/kommentare");
    console.log("  POST /api/kommentar");
    console.log("  GET  /api/tags");
    console.log("  GET  /api/beitrag/tag/:tagName");
  });
});