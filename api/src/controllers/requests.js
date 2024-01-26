import { Router } from "express";
import { Request } from "../models/calendar.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = 9;
  const skip = (page - 1) * limit;
  const { email } = req.params;
  const { status, search } = req.query;

  try {
    let filter = { requesterEmail: email };

    if (status && status !== "all") {
      filter.requestStatus = status;
    }

    if (search && search.trim() !== "") {
      filter.recipientEmail = { $regex: search, $options: "i" };
    }

    const requests = await Request.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      requests,
      totalPages,
      totalRequests: total,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { requestType, recipientEmail } = req.body;

  try {
    if (email === recipientEmail)
      res.status(400).json({ message: "cannot send request to yourself" });

    // Checks if request already exists - not needed for now
    // const existingRequest = await Request.findOne({
    //   requesterEmail: email,
    //   recipientEmail,
    //   requestType,
    // });
    // // if (existingRequest)
    // //   return res.status(400).json({ message: "request already exist" });

    const newRequest = new Request({
      requesterEmail: email,
      recipientEmail,
      requestType,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// route.get("search/:email", async (req, res) => {
//   const { email } = req.params;
//   const { searchQuery } = req.query;
//   try {
//     const requests = await Request.find({
//       requesterEmail: email,
//       recipientEmail: { $regex: searchQuery, $options: "i" },
//     });
//     res.status(200).json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default route;
