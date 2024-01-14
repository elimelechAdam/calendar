import { Router } from "express";
import { Request } from "../models/calendar.js";

const route = Router();

// route.get("/:email", async (req, res) => {
//   const page = parseInt(req.query.page || 1);
//   const limit = 6;
//   const skip = (page - 1) * limit;
//   const { email } = req.params;
//   try {
//     const permissions = await Request.find({
//       recipientEmail: email,
//     })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Request.countDocuments({ recipientEmail: email });
//     const totalPages = Math.ceil(total / limit);

//     if (!permissions.length)
//       res.status(404).json({ message: "no permissions" });

//     res.status(200).json({
//       permissions,
//       totalPages,
//       totalPermissions: total,
//       currentPage: page,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

route.get("/:email", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = 9;
  const skip = (page - 1) * limit;
  const { email } = req.params;
  const status = req.query.status; // Get the status filter from the query string
  console.log("status", status);
  try {
    let filter = { recipientEmail: email, requestStatus: status };

    if (filter.requestStatus === "all") {
      filter = { recipientEmail: email };
    }
    const permissions = await Request.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      permissions,
      totalPages,
      totalPermissions: total,
      currentPage: page,
    });
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

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { requesterEmail, requestType } = req.body;

  try {
    let permission = await Request.findOne({
      recipientEmail: email,
      requesterEmail,
    });

    if (permission) {
      permission.requestStatus = "approved";
      permission.requestType = requestType;
    } else {
      permission = new Request({
        requesterEmail: requesterEmail,
        recipientEmail: email,
        requestType,
        requestStatus: "approved",
      });
    }

    const savedPermission = await permission.save();
    res.status(201).json(savedPermission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//test route
route.post("/test", async (req, res) => {
  try {
    res.status(200).send("test");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
export default route;