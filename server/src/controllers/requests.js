import { Router } from "express";
import { Request } from "../models/calendar.js";
import { sortByDate } from "../utils/utils.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const request = await Request.findBy({
      requesterEmail: email,
    }).exec();
    if (!request) res.status(404).json({ message: "no requests" });
    const sorted = sortByDate(request);
    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { requestType, recipientEmail } = req.body;
  const newRequest = new Request({
    requesterEmail: email,
    recipientEmail,
    requestType,
  });
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(409).json(err);
  }
});

export default route;
