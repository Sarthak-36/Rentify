const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');

// =========================
// CREATE BOOKING
// =========================
router.post('/', async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, guests, totalPrice } = req.body;

    // Validate required fields
    if (!customerId || !hostId || !listingId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    // Create a new booking
    const booking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      guests,
      totalPrice,
      status: 'pending'
    });

    await booking.save();

    res.status(201).json({
      msg: 'Booking created successfully',
      booking
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// =========================
// GET ALL BOOKINGS (ADMIN)
// =========================
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId', 'name email')
      .populate('hostId', 'name email')
      .populate('listingId', 'title price');

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// =========================
// GET BOOKINGS FOR A CUSTOMER
// =========================
router.get('/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    const bookings = await Booking.find({ customerId })
      .populate('listingId', 'title price location');

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching customer bookings:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// =========================
// GET BOOKINGS FOR A HOST
// =========================
router.get('/host/:hostId', async (req, res) => {
  try {
    const { hostId } = req.params;

    const bookings = await Booking.find({ hostId })
      .populate('customerId', 'name email')
      .populate('listingId', 'title price location');

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching host bookings:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// =========================
// UPDATE BOOKING STATUS
// =========================
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.status(200).json({
      msg: 'Booking status updated successfully',
      booking
    });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// =========================
// DELETE BOOKING
// =========================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.status(200).json({ msg: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
