import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:3001/api";

function App() {
	// --- State Variables ---
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Form state
	const [formName, setFormName] = useState("");
	const [formQuantity, setFormQuantity] = useState("");
	const [formDescription, setFormDescription] = useState("");

	// Edit mode state
	const [editingItemId, setEditingItemId] = useState(null);

	// Operation States
	const [isAdding, setIsAdding] = useState(false);
	const [addError, setAddError] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	// *** NEW: Search State ***
	const [searchTerm, setSearchTerm] = useState(""); // State for the search input

	// --- Data Fetching (Modified) ---
	// Now accepts the current search term to pass to the API
	const fetchItems = useCallback(async (currentSearchTerm) => {
		console.log(`Fetching items with search term: "${currentSearchTerm}"`);
		setIsLoading(true);
		setError(null);
		// Clear operational errors when fetching
		setDeleteError(null);
		setAddError(null);
		setUpdateError(null);

		// Prepare query parameters
		const params = {};
		if (currentSearchTerm && currentSearchTerm.trim() !== "") {
			params.search = currentSearchTerm.trim();
		}

		try {
			// Pass params to axios.get - axios automatically formats them into query string
			const response = await axios.get(`${API_BASE_URL}/items`, { params });
			setItems(response.data);
		} catch (err) {
			console.error("Error fetching items:", err);
			setError(
				"Failed to fetch inventory items. Please check connection or backend server.",
			);
			setItems([]); // Clear items on error
		} finally {
			setIsLoading(false);
		}
	}, []); // useCallback dependency array is empty as it doesn't depend on component state directly

	// --- Effect to Fetch Items on Mount AND when searchTerm changes ---
	useEffect(() => {
		// This effect now runs initially and whenever 'searchTerm' or 'fetchItems' changes.
		// We pass the current 'searchTerm' state to fetchItems.
		fetchItems(searchTerm);
	}, [searchTerm, fetchItems]); // Add searchTerm to dependency array

	// --- Reset Form (existing) ---
	const resetForm = () => {
		setFormName("");
		setFormQuantity("");
		setFormDescription("");
		setEditingItemId(null);
		setAddError(null);
		setUpdateError(null);
	};

	// --- Start Editing (existing) ---
	const handleStartEdit = (item) => {
		setEditingItemId(item.id);
		setFormName(item.name);
		setFormQuantity(String(item.quantity));
		setFormDescription(item.description || "");
		setAddError(null);
		setUpdateError(null);
		window.scrollTo(0, document.body.scrollHeight);
	};

	// --- Form Submission Handler (existing) ---
	const handleSubmit = async (event) => {
		event.preventDefault();
		// ... (validation logic remains the same) ...
		const quantityNum = parseInt(formQuantity, 10);
		if (!formName.trim() || isNaN(quantityNum) || quantityNum < 0) {
			if (editingItemId) {
				setUpdateError(
					"Please enter a valid item name and a non-negative quantity.",
				);
			} else {
				setAddError(
					"Please enter a valid item name and a non-negative quantity.",
				);
			}
			return;
		}

		const itemData = {
			name: formName.trim(),
			quantity: quantityNum,
			description: formDescription.trim() || null,
		};

		if (editingItemId) {
			// UPDATE
			setUpdateError(null);
			setIsUpdating(true);
			try {
				const response = await axios.put(
					`${API_BASE_URL}/items/${editingItemId}`,
					itemData,
				);
				// *** RE-FETCH after update to reflect potential search filtering ***
				// Instead of just updating state locally, re-fetch to ensure consistency with search
				fetchItems(searchTerm); // <-- Changed this line
				console.log("Update successful, re-fetching list...");
				resetForm();
			} catch (err) {
				// ... (error handling) ...
				console.error(`Error updating item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setUpdateError(`Failed to update item: ${backendError}`);
			} finally {
				setIsUpdating(false);
			}
		} else {
			// ADD
			setAddError(null);
			setIsAdding(true);
			try {
				const response = await axios.post(`${API_BASE_URL}/items`, itemData);
				// *** RE-FETCH after add to reflect potential search filtering ***
				fetchItems(searchTerm); // <-- Changed this line
				console.log("Add successful, re-fetching list...");
				resetForm();
			} catch (err) {
				// ... (error handling) ...
				console.error(`Error adding item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setAddError(`Failed to add item: ${backendError}`);
			} finally {
				setIsAdding(false);
			}
		}
	};

	// --- Delete Item Logic (Modified) ---
	const handleDeleteItem = async (itemIdToDelete) => {
		if (!window.confirm("Are you sure you want to delete this item?")) {
			return;
		}
		setDeleteError(null);
		if (itemIdToDelete === editingItemId) {
			resetForm();
		}

		try {
			await axios.delete(`${API_BASE_URL}/items/${itemIdToDelete}`);
			// *** RE-FETCH after delete to update the list correctly based on search ***
			fetchItems(searchTerm); // <-- Changed this line
			console.log(
				`Item ${itemIdToDelete} deleted successfully, re-fetching list.`,
			);
			// No need to manually filter state if we re-fetch
			setAddError(null);
			setUpdateError(null);
			setError(null);
		} catch (err) {
			// ... (error handling) ...
			console.error(`Error deleting item with ID ${itemIdToDelete}:`, err);
			const backendError =
				err.response?.data?.error || "An unexpected error occurred.";
			setDeleteError(
				`Failed to delete item: ${backendError}. Please try again.`,
			);
		}
	};

	// --- Rendering Logic ---
	return (
		<div className='App'>
			<h1>SimpleStock Inventory</h1>

			{/* --- Search Bar --- */}
			<div
				style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
				<label htmlFor='searchItems' style={{ marginRight: "10px" }}>
					Search Items:
				</label>
				<input
					type='text'
					id='searchItems'
					placeholder='Search by name or description...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
					style={{ width: "300px", padding: "5px" }}
					disabled={isLoading} // Optional: disable during initial load
				/>
				{/* Optional: Button to clear search */}
				<button
					onClick={() => setSearchTerm("")}
					disabled={!searchTerm || isLoading} // Disable if no term or loading
					style={{ marginLeft: "10px" }}>
					Clear Search
				</button>
			</div>

			{/* Display Global Errors/Loading */}
			{/* (Keep isLoading display for clarity during search fetches) */}
			{isLoading && <p>Loading inventory...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

			{/* Display Item List */}
			{/* Show list section even if loading, the table itself depends on !isLoading */}
			<div>
				<h2>Current Stock {searchTerm && `(Filtered by: "${searchTerm}")`}</h2>
				{/* Only show table when not loading AND no general fetch error */}
				{!isLoading &&
					!error &&
					(items.length === 0 ? (
						<p>
							{searchTerm
								? "No items match your search."
								: "No items currently in stock."}
						</p>
					) : (
						<table
							border='1'
							style={{
								width: "100%",
								borderCollapse: "collapse",
								marginBottom: "20px",
							}}>
							{/* ... Table Head ... */}
							<thead>
								<tr>
									<th style={{ padding: "5px" }}>Name</th>
									<th style={{ padding: "5px" }}>Quantity</th>
									<th style={{ padding: "5px" }}>Description</th>
									<th style={{ padding: "5px", width: "120px" }}>Actions</th>
								</tr>
							</thead>
							{/* ... Table Body ... */}
							<tbody>
								{items.map((item) => (
									<tr
										key={item.id}
										style={
											editingItemId === item.id
												? { backgroundColor: "#e0f7fa" }
												: {}
										}>
										<td style={{ padding: "5px" }}>{item.name}</td>
										<td style={{ padding: "5px", textAlign: "right" }}>
											{item.quantity}
										</td>
										<td style={{ padding: "5px" }}>{item.description}</td>
										<td style={{ padding: "5px", textAlign: "center" }}>
											{/* Action Buttons (disable based on operation state) */}
											<button
												onClick={() => handleStartEdit(item)}
												disabled={
													isAdding || isUpdating || editingItemId === item.id
												}
												style={{ marginRight: "5px" }}>
												{" "}
												Edit{" "}
											</button>
											<button
												onClick={() => handleDeleteItem(item.id)}
												disabled={isAdding || isUpdating}>
												{" "}
												Delete{" "}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					))}
				{/* Show loading indicator specifically near the table area as well */}
				{isLoading && !error && <p>Searching...</p>}
			</div>

			{/* Add/Edit Item Form (remains largely the same) */}
			<hr />
			<div>
				<h2>{editingItemId ? "Edit Item" : "Add New Item"}</h2>
				<form onSubmit={handleSubmit}>
					{/* ... Form Inputs ... */}
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemName'>Name: </label>
						<input
							type='text'
							id='itemName'
							value={formName}
							onChange={(e) => setFormName(e.target.value)}
							required
							disabled={isAdding || isUpdating}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemQuantity'>Quantity: </label>
						<input
							type='number'
							id='itemQuantity'
							value={formQuantity}
							onChange={(e) => setFormQuantity(e.target.value)}
							required
							min='0'
							disabled={isAdding || isUpdating}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemDescription'>Description: </label>
						<input
							type='text'
							id='itemDescription'
							value={formDescription}
							onChange={(e) => setFormDescription(e.target.value)}
							disabled={isAdding || isUpdating}
						/>
					</div>

					{/* Display Add/Update Errors */}
					{addError && <p style={{ color: "red" }}>{addError}</p>}
					{updateError && <p style={{ color: "red" }}>{updateError}</p>}

					{/* Submit Button */}
					<button type='submit' disabled={isAdding || isUpdating}>
						{editingItemId
							? isUpdating
								? "Saving..."
								: "Save Changes"
							: isAdding
							? "Adding..."
							: "Add Item"}
					</button>
					{/* Cancel Edit Button */}
					{editingItemId && (
						<button
							type='button'
							onClick={resetForm}
							disabled={isUpdating}
							style={{ marginLeft: "10px" }}>
							{" "}
							Cancel Edit{" "}
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default App;
