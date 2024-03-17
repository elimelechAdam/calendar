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
    let filter = { recipientEmail: email };

    if (status !== "all") {
      filter.requestStatus = status;
    }

    if (search && search.trim() !== "") {
      filter.requesterEmail = { $regex: search, $options: "i" };
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

// PUT route to update a request based on the provided ID and the fields in the request body
route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { $set: { requestStatus: requestStatus } },
      { new: true } // Return the updated object
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "No request found" });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
route.put("/calendar/:id", async (req, res) => {
  const { id } = req.params;
  const { requestType } = req.body;
  try {
    const updatedType = await Request.findByIdAndUpdate(
      id,
      { $set: { requestType: requestType } }, // Correctly structure the update operation
      { new: true } // Return the updated object
    );
    if (!updatedType) {
      return res.status(404).json({ message: "No request found" });
    }

    res.status(200).json(updatedType);
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

    const notification = new Notification({
      recipientEmail: requesterEmail,
      senderEmail: email,
      requestType,
      message: "Permission approved",
    });

    await notification.save();

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

route.get("/search/:email", async (req, res) => {
  const { email } = req.params;
  const { searchQuery } = req.query;

  try {
    let query = { recipientEmail: email };

    // Ensure searchQuery is a string and not empty
    if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
      query.requesterEmail = { $regex: searchQuery, $options: "i" };
    }

    const requests = await Request.find(query);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.delete("/delete", async (req, res) => {
  const { owner, permissionGranted } = req.body;
  console.log("req.body", req.body);

  try {
    const deletedRequest = await Request.deleteMany({
      requesterEmail: permissionGranted,
      recipientEmail: owner,
    });
    if (!deletedRequest) {
      return res.status(404).json({ message: "No request found" });
    }

    res.status(200).json(permissionGranted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default route;
