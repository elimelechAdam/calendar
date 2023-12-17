import { Router } from "express";
import { Request } from "../models/calendar.js";
import { sortByDate } from "../utils/utils.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const requests = await Request.findBy({
      recipientEmail: email,
    }).exec();
    if (!requests) res.status(404).json({ message: "no requests" });
    const sorted = sortByDate(requests);
    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { requestStatus },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "No request found" });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default route;
