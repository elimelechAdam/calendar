import { Router } from "express";
import { Request } from "../models/calendar.js";
import { Notification } from "../models/calendar.js";

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
      return res
        .status(400)
        .json({ message: "cannot send request to yourself" });

    // Checks if request already exists - not needed for now
    const existingRequest = await Request.findOne({
      requesterEmail: email,
      recipientEmail,
      // requestType,
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "request already exist",
        date: existingRequest.createdAt,
      });
    }

    const newRequest = new Request({
      requesterEmail: email,
      recipientEmail,
      requestType,
    });

    await newRequest.save();

    if (newRequest) {
      const newNotification = new Notification({
        recipientEmail,
        senderEmail: email,
        requestType,
        message: "You have a new request",
      });
      await newNotification.save();
    }

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// Accept in Modal

route.post("/accept/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    console.log(requestId);
    const request = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "approved" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "בקשה לא נמצאה" });
    }

    //Check if the request is already approved
    if (request.requestStatus === "approved") {
      return res.status(400).json({ message: "הבקשה שלך כבר אושרה" });
    }

    await Notification.updateMany(
      { requestId },
      { message: "הבקשה שלך אושרה" }
    );

    res.status(200).json({ message: "בקשה אושרה", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/deny/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "denied" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "בקשה לא נמצאה" });
    }
    if (request.requestStatus === "denied") {
      return res.status(400).json({ message: "הבקשה נדחתה" });
    }

    await Notification.updateMany(
      { requestId },
      { message: "הבקשה שלך נדחתה" }
    );

    res.status(200).json({ message: "הבקשה נדחתה", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default route;
