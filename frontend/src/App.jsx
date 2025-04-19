import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios to make API requests
import "./App.css"; // We can keep the basic styling for now

// --- Configuration ---
// Define the base URL for our backend API.
// Using localhost:3001 where our backend server is running.
const API_BASE_URL = "http://localhost:3001/api";

function App() {
	// --- State Variables ---
	// 'items' will hold the array of inventory items fetched from the backend
	const [items, setItems] = useState([]);
	// 'isLoading' will track whether we are currently fetching data
	const [isLoading, setIsLoading] = useState(true); // Start as true because we fetch on mount
	// 'error' will store any error message encountered during fetching
	const [error, setError] = useState(null);
	// State for the Add Item form inputs
	const [newItemName, setNewItemName] = useState("");
	const [newItemQuantity, setNewItemQuantity] = useState(""); // Store as string initially
	const [newItemDescription, setNewItemDescription] = useState("");
	const [isAdding, setIsAdding] = useState(false); // Track if add operation is in progress
	const [addError, setAddError] = useState(null); // Separate error state for adding
	// Add state for delete errors (optional, but good practice)
	const [deleteError, setDeleteError] = useState(null);

	// --- Data Fetching ---
	// useEffect hook to fetch data when the component mounts
	useEffect(() => {
		// Define the async function to fetch items
		const fetchItems = async () => {
			setDeleteError(null); // Clear any previous delete errors
			setIsLoading(true); // Set loading state to true before starting fetch
			setError(null); // Clear any previous errors

			try {
				// Make a GET request to the backend /api/items endpoint
				const response = await axios.get(`${API_BASE_URL}/items`);
				// Update the 'items' state with the data received from the backend
				setItems(response.data);
			} catch (err) {
				// If an error occurs during the request:
				console.error("Error fetching items:", err);
				// Set the error state with a user-friendly message
				setError(
					"Failed to fetch inventory items. Please ensure the backend server is running.",
				);
				// Set items to empty array in case of error
				setItems([]);
			} finally {
				// This block runs whether the try succeeded or failed
				// Set loading state back to false
				setIsLoading(false);
			}
		};

		fetchItems(); // Call the fetch function
		// The empty dependency array [] means this effect runs only once when the component mounts
	}, []);

	// --- Add Item Logic ---
	const handleAddItem = async (event) => {
		event.preventDefault(); // Prevent default HTML form submission behavior
		setAddError(null); // Clear previous add errors
		setIsAdding(true); // Indicate loading state for add operation

		// Basic frontend validation (matching backend)
		const quantityNum = parseInt(newItemQuantity);
		if (!newItemName || isNaN(quantityNum) || quantityNum < 0) {
			setAddError(
				"Please enter a valid item name and a non-negative quantity.",
			);
			setIsAdding(false);
			return;
		}

		const newItem = {
			name: newItemName.trim(),
			quantity: quantityNum,
			// Send description only if it's not empty, otherwise omit or send null
			description: newItemDescription.trim() || null,
		};

		try {
			// Send POST request to the backend
			const response = await axios.post(`${API_BASE_URL}/items`, newItem);

			// --- Update Frontend State ---
			// Option 1: Re-fetch the entire list (simpler for now)
			// fetchItems(); // This works but is less efficient

			// Option 2: Add the new item directly to the existing state
			// The backend returns the newly created item including its ID
			setItems((prevItems) =>
				[...prevItems, response.data].sort((a, b) =>
					a.name.localeCompare(b.name),
				),
			); // Keep sorted

			// Clear the form inputs
			setNewItemName("");
			setNewItemQuantity("");
			setNewItemDescription("");
			setDeleteError(null);
		} catch (err) {
			console.error("Error adding item:", err);
			// Try to get specific error from backend response if available
			const backendError =
				err.response?.data?.error || "An unexpected error occurred.";
			setAddError(`Failed to add item: ${backendError}`);
		} finally {
			setIsAdding(false); // Reset loading state for add operation
		}
	};

	// --- Delete Item Logic (NEW) ---
	const handleDeleteItem = async (itemIdToDelete) => {
		// Optional: Confirmation dialog
		if (!window.confirm("Are you sure you want to delete this item?")) {
			return; // Stop if user clicks Cancel
		}

		setDeleteError(null); // Clear previous delete errors

		try {
			// Send DELETE request to the backend
			await axios.delete(`${API_BASE_URL}/items/${itemIdToDelete}`);

			// --- Update Frontend State ---
			// Filter out the deleted item from the current state
			setItems((prevItems) =>
				prevItems.filter((item) => item.id !== itemIdToDelete),
			);
			// Clear potential add error on successful delete
			setAddError(null);
		} catch (err) {
			console.error(`Error deleting item with ID ${itemIdToDelete}:`, err);
			// Try to get specific error from backend response if available
			const backendError =
				err.response?.data?.error || "An unexpected error occurred.";
			setDeleteError(
				`Failed to delete item: ${backendError}. Please try again.`,
			);
			// Optional: Re-fetch items to ensure consistency if delete fails?
			// fetchItems(); // Consider if this is desired behavior on error
		}
		// No 'finally' needed here unless adding loading state for delete buttons
	};

	// --- Rendering Logic ---
	return (
		<div className='App'>
			<h1>SimpleStock Inventory</h1>

			{/* Display Loading Message */}
			{isLoading && <p>Loading inventory...</p>}

			{/* Display Fetching Error Message */}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{/* Display Delete Error Message (NEW) */}
			{deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

			{/* Display Item List */}
			{!isLoading && !error && (
				<div>
					<h2>Current Stock</h2>
					{items.length === 0 ? (
						<p>No items currently in stock.</p>
					) : (
						<table
							border='1'
							style={{
								width: "100%",
								borderCollapse: "collapse",
								marginBottom: "20px",
							}}>
							<thead>
								<tr>
									<th style={{ padding: "5px" }}>Name</th>
									<th style={{ padding: "5px" }}>Quantity</th>
									<th style={{ padding: "5px" }}>Description</th>
									<th style={{ padding: "5px" }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => (
									<tr key={item.id}>
										<td style={{ padding: "5px" }}>{item.name}</td>
										<td style={{ padding: "5px", textAlign: "right" }}>
											{item.quantity}
										</td>
										<td style={{ padding: "5px" }}>{item.description}</td>
										<td style={{ padding: "5px", textAlign: "center" }}>
											{/* Add Delete Button Here */}
											<button onClick={() => handleDeleteItem(item.id)}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}

			{/* Add New Item Form (existing) */}
			<hr />
			<div>
				<h2>Add New Item</h2>
				<form onSubmit={handleAddItem}>
					{/* ... form inputs ... (no changes needed here) */}
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemName'>Name: </label>
						<input
							type='text'
							id='itemName'
							value={newItemName}
							onChange={(e) => setNewItemName(e.target.value)}
							required
							disabled={isAdding}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemQuantity'>Quantity: </label>
						<input
							type='number'
							id='itemQuantity'
							value={newItemQuantity}
							onChange={(e) => setNewItemQuantity(e.target.value)}
							required
							min='0'
							disabled={isAdding}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemDescription'>Description: </label>
						<input
							type='text'
							id='itemDescription'
							value={newItemDescription}
							onChange={(e) => setNewItemDescription(e.target.value)}
							disabled={isAdding}
						/>
					</div>
					{addError && <p style={{ color: "red" }}>{addError}</p>}
					<button type='submit' disabled={isAdding}>
						{isAdding ? "Adding..." : "Add Item"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
