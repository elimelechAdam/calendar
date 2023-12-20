import { Router } from "express";
import { Request } from "../models/calendar.js";
import { sortByDate } from "../utils/utils.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const startIndex = (page - 1) * limit;

    const permissions = await Request.find({
      recipientEmail: email,
    })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await Request.countDocuments({ recipientEmail: email });
    const totalPages = Math.ceil(totalItems / limit);

    if (permissions.length === 0) {
      return res.status(404).json({ message: "No permissions" });
    }

    res.status(200).json({
      permissions: sortByDate(permissions),
      pageInfo: {
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.put("/:email", async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body;
  console.log(id, requestStatus);
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

export default route;
