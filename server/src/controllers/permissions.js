import { Router } from "express";
import { Request } from "../models/calendar.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const permissions = await Request.find({
      recipientEmail: email,
    }).sort({ createdAt: -1 });

    if (permissions.length === 0)
      res.status(404).json({ message: "no permissions" });
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    if (updatedRequest.requestStatus === "מאושר")
      return res.status(400).json({ message: "Request already approved" });

    if (updatedRequest.requestStatus === "לא מאושר")
      return res.status(400).json({ message: "Request already denied" });

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { recipientEmail } = req.body;

  try {
    const permission = await Request.findOne({ email, recipientEmail });

    if (permission) {
      permission.requestStatus = "אושר";
    } else {
      permission = new Request({
        email,
        recipientEmail,
        requestStatus: "אושר",
      });
    }

    const savedPermission = await permission.save();
    res.status(201).json(savedPermission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default route;
