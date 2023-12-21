import { Router } from "express";
import { Request } from "../models/calendar.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = 6;
  const skip = (page - 1) * limit;

  const { email } = req.params;
  try {
    const requests = await Request.find({
      requesterEmail: email,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments({ requesterEmail: email });
    if (!requests.length) {
      return res.status(404).json({ message: "no requests" });
    }

    res.status(200).json({
      requests,
      totalPages: Math.ceil(total / limit),
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

export default route;
