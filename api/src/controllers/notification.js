import express from "express";
import { Notification } from "../models/calendar.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const notifications = await Notification.find({
      recipientEmail: email,
      read: false,
    });

    // if (!notifications) {
    //   return res.status(404).json({ message: "No notifications found" });
    // }

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const deletedNotifications = await Notification.deleteMany({
        recipientEmail: email,
        });
    
        if (!deletedNotifications) {
        return res.status(404).json({ message: "No notifications found" });
        }
    
        res.status(200).json(deletedNotifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
