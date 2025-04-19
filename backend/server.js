// Import required modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // Use verbose for detailed logging
const cors = require("cors");
const path = require("path"); // To handle file paths consistently
// --- Configuration ---
const PORT = 3001; // Port for the backend server
const DB_FILE = path.join(__dirname, "database", "inventory.db"); // Path to the SQLite database file

// --- Initialize Express App ---
const app = express();

// --- Middleware ---
// Enable CORS for all origins (simplest setup for development)
// In production, you might want to restrict this to your frontend's domain
app.use(cors());

// Middleware to parse JSON request bodies (needed for POST/PUT requests later)
app.use(express.json());

// --- Database Setup ---
// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(DB_FILE, (err) => {
	if (err) {
		console.error("Error connecting to database:", err.message);
		// Exit the process if we can't connect to the database
		process.exit(1);
	} else {
		console.log("Connected to the SQLite database.");
		// Create the 'items' table if it doesn't already exist
		db.run(
			`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 0,
            description TEXT
        )`,
			(err) => {
				if (err) {
					console.error("Error creating table:", err.message);
					// Consider if the app should exit here too, depending on severity
				} else {
					console.log("'items' table created or already exists.");
				}
			},
		);
	}
});

// --- API Endpoints (Routes) ---

// GET /api/items - Retrieve all inventory items
app.get("/api/items", (req, res) => {
	const sql = "SELECT * FROM items ORDER BY name ASC"; // Get all items, ordered by name

	db.all(sql, [], (err, rows) => {
		if (err) {
			console.error("Database error fetching items:", err.message);
			// Send a generic server error response
			res.status(500).json({ error: "Failed to retrieve items from database" });
			return; // Stop further execution in this callback
		}
		// Send the retrieved rows as a JSON array
		res.json(rows);
	});
});

// POST /api/items - Add a new inventory item
app.post("/api/items", (req, res) => {
	// Extract item details from the request body
	const { name, quantity, description } = req.body;

	// --- Input Validation ---
	// Basic validation: Check if name and quantity are provided
	if (!name || quantity === undefined || quantity === null) {
		return res
			.status(400)
			.json({ error: "Missing required fields: name and quantity" });
	}
	// Check if quantity is a valid number
	const numQuantity = Number(quantity);
	if (isNaN(numQuantity) || !Number.isInteger(numQuantity) || numQuantity < 0) {
		return res
			.status(400)
			.json({ error: "Quantity must be a non-negative integer" });
	}
	// Optional: Validate name length, description length etc. if needed

	if (name.length > 100) {
		return res
			.status(400)
			.json({ error: "Name must be 100 characters or less" });
	}
	if (description && description.length > 255) {
		return res
			.status(400)
			.json({ error: "Description must be 255 characters or less" });
	}

	// --- Database Insertion ---
	const sql = `INSERT INTO items (name, quantity, description) VALUES (?, ?, ?)`;
	const params = [name, numQuantity, description || null]; // Use null if description is empty/undefined

	// Use db.run for INSERT, UPDATE, DELETE operations
	db.run(sql, params, function (err) {
		// Use 'function' to access 'this.lastID'
		if (err) {
			console.error("Database error inserting item:", err.message);
			return res.status(500).json({ error: "Failed to add item to database" });
		}
		// If insertion is successful:
		console.log(`A new item has been added with ID: ${this.lastID}`);
		// Send back the newly created item (including its auto-generated ID)
		res.status(201).json({
			id: this.lastID,
			name: name,
			quantity: numQuantity,
			description: description || null,
		});
	});
});

// DELETE /api/items/:id - Delete an inventory item by ID
app.delete("/api/items/:id", (req, res) => {
	// Extract the item ID from the URL parameters
	const itemId = req.params.id;

	// --- Input Validation ---
	// Ensure the ID is a valid integer
	const numItemId = parseInt(itemId, 10);
	if (isNaN(numItemId) || numItemId <= 0) {
		return res.status(400).json({ error: "Invalid item ID provided." });
	}

	// --- Database Deletion ---
	const sql = `DELETE FROM items WHERE id = ?`;
	const params = [numItemId];

	// Use db.run for DELETE operations
	db.run(sql, params, function (err) {
		// Use 'function' to access 'this.changes'
		if (err) {
			console.error("Database error deleting item:", err.message);
			return res
				.status(500)
				.json({ error: "Failed to delete item from database" });
		}
		// Check if any row was actually deleted
		if (this.changes === 0) {
			// If no rows were affected, the item ID likely didn't exist
			return res
				.status(404)
				.json({ error: "Item not found with the provided ID." });
		} else {
			// If deletion is successful (this.changes > 0):
			console.log(`Item with ID: ${numItemId} has been deleted.`);
			// Send a success response, typically with no content
			res.status(204).send(); // 204 No Content is standard for successful DELETE
		}
	});
});

// PUT /api/items/:id - Update an existing inventory item by ID
app.put("/api/items/:id", (req, res) => {
	// Extract the item ID from the URL parameters
	const itemId = req.params.id;
	// Extract updated item details from the request body
	const { name, quantity, description } = req.body;

	// --- Input Validation ---
	// Validate ID
	const numItemId = parseInt(itemId, 10);
	if (isNaN(numItemId) || numItemId <= 0) {
		return res.status(400).json({ error: "Invalid item ID provided." });
	}
	// Validate required fields (name, quantity)
	if (!name || quantity === undefined || quantity === null) {
		return res
			.status(400)
			.json({ error: "Missing required fields: name and quantity" });
	}
	// Validate quantity type/value
	const numQuantity = Number(quantity);
	if (isNaN(numQuantity) || !Number.isInteger(numQuantity) || numQuantity < 0) {
		return res
			.status(400)
			.json({ error: "Quantity must be a non-negative integer" });
	}

	// --- Database Update ---
	const sql = `UPDATE items
                 SET name = ?,
                     quantity = ?,
                     description = ?
                 WHERE id = ?`;
	// Use || null for description to ensure it's stored as NULL if empty/missing
	const params = [name, numQuantity, description || null, numItemId];

	// Use db.run for UPDATE operations
	db.run(sql, params, function (err) {
		// Use 'function' to access 'this.changes'
		if (err) {
			console.error("Database error updating item:", err.message);
			return res
				.status(500)
				.json({ error: "Failed to update item in database" });
		}
		// Check if any row was actually updated
		if (this.changes === 0) {
			// If no rows were affected, the item ID likely didn't exist
			return res
				.status(404)
				.json({
					error: "Item not found with the provided ID. No update performed.",
				});
		} else {
			// If update is successful (this.changes > 0):
			console.log(`Item with ID: ${numItemId} has been updated.`);
			// Send back the updated item data
			// We don't get the full updated row back directly from db.run in sqlite3 standard callback
			// So, we construct it from the input data and ID.
			// Alternatively, we could perform a SELECT query afterwards, but this is simpler.
			res.status(200).json({
				id: numItemId,
				name: name,
				quantity: numQuantity,
				description: description || null,
			});
		}
	});
});

// --- Global Error Handler (Basic Example) ---
// Catches requests to routes that don't exist
app.use((req, res) => {
	res.status(404).json({ error: "Not Found" });
});

// --- Start Server ---
app.listen(PORT, () => {
	console.log(`Backend server running on http://localhost:${PORT}`);
});

// --- Graceful Shutdown (Optional but Recommended) ---
process.on("SIGINT", () => {
	db.close((err) => {
		if (err) {
			console.error("Error closing database:", err.message);
		} else {
			console.log("Database connection closed.");
		}
		console.log("Server shutting down.");
		process.exit(0);
	});
});
