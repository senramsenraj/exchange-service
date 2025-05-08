const express = require("express");
const router = express.Router();
const axios = require("axios");
const ExchangeRequest = require("../models/Exchange");


// Create a new exchange request
router.post("/exchange-requests", async (req, res) => {
  const { requestedBook, offeredBook, requester } = req.body;

  if (!requestedBook || !offeredBook || !requester) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newRequest = new ExchangeRequest({ requestedBook, offeredBook, requester });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating exchange request:", error.message);
    res.status(500).json({ message: "Failed to create exchange request" });
  }
});

// Get all exchange requests for a user
// Get all exchange requests for a user
router.get("/my-requests/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all exchange requests where the user is involved
    const requests = await ExchangeRequest.find({
      $or: [
        { requester: userId }, // Requests made by the user
        { "requestedBook.user": userId }, // Requests where the user's book is requested
      ],
    }).populate("offeredBook"); // Populate only the offeredBook field

    res.status(200).json(requests); // Return raw requests
  } catch (error) {
    console.error("Error fetching exchange requests:", error.message);
    res.status(500).json({ message: "Failed to fetch exchange requests" });
  }
});

// Update the status of an exchange request
router.patch("/exchange-requests/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedRequest = await ExchangeRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating exchange request:", error.message);
    res.status(500).json({ message: "Failed to update exchange request" });
  }
});

module.exports = router;