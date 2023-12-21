import { Router } from "express";
import { Request } from "../models/calendar.js";
import { sortByDate } from "../utils/utils.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const request = await Request.find({
      requesterEmail: email,
    }).sort({ createdAt: -1 });
    if (request.length === 0) res.status(404).json({ message: "no requests" });

    console.log(request);

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { requestType, recipientEmail } = req.body;

  if (email === recipientEmail)
    res.status(400).json({ message: "cannot send request to yourself" });
  const newRequest = new Request({
    requesterEmail: email,
    recipientEmail,
    requestType,
  });
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

export default route;
