const router = require("express").Router();

const Listing = require("../models/Listing");
const User = require("../models/User");



/* CREATE LISTING */
router.post("/create", async (req, res) => {

  console.log(req.body);

  try {
    /* Take the information from the form */
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;
   
  

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();
    res.status(200).json({ success: true, data: newListing });

    console.log("New property Created Successfully");
  } catch (err) {
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
    console.log(err);
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { province: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
          { streetAddress: { $regex: search, $options: "i" } },
          { aptSuite: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});
// Update Listing
router.patch("/update/:listingId", async (req, res) => {
  const { listingId } = req.params;
  const { userId, ...updateData } = req.body;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.creator.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this listing" });
    }

    Object.assign(listing, updateData);
    await listing.save();

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ message: "Failed to update listing", error: err.message });
    console.log(err);
  }
});

// Delete Listing
router.delete("/delete/:listingId", async (req, res) => {
  const { listingId } = req.params;
  const { userId } = req.body;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.creator.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(listingId)

    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete listing", error: err.message });
    console.log(err);
  }
});

//like
router.post("/like/:listingId/:userId", async (req, res) => {
  const { listingId, userId } = req.params;

  try {
    let listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if the user has already liked the listing
    if (listing.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked this listing" });
    }

    listing.likes.push(userId);
    await listing.save();

    res.status(200).json({ success: true, message: "Listing liked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to like listing", error: err.message });
    console.log(err.message)

  }
});

// Unlike a listing
router.post("/unlike/:listingId/:userId", async (req, res) => {
  const { listingId, userId } = req.params;

  try {
    let listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if the user has already unliked the listing
    if (!listing.likes.includes(userId)) {
      return res.status(400).json({ message: "User has not liked this listing" });
    }

    // Remove the user from the likes array by converting ObjectId to string for comparison
    listing.likes = listing.likes.filter((like) => like.toString() !== userId.toString());
    await listing.save();

    res.status(200).json({ success: true, message: "Listing unliked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unlike listing", error: err.message });
    console.log(err.message)
  }
});

// Get like count for a listing
router.get("/likes/:listingId", async (req, res) => {
  const { listingId } = req.params;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const likeCount = listing.likes.length;
    const likeIds = listing.likes;
    res.status(200).json({ success: true, likeCount,likeIds });
  } catch (err) {
    res.status(500).json({ message: "Failed to get like count", error: err.message });
    console.log(err.message)
  }
});

module.exports = router;




