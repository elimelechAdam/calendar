import { Router } from "express";
import { Request } from "../models/calendar.js";
import { sortByDate } from "../utils/utils.js";

const route = Router();

route.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const permissions = await Request.find({
      recipientEmail: email,
    });

    if (permissions.length === 0) {
      return res.status(404).json({ message: "no permissions" });
    }
    const sorted = sortByDate(permissions);
    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { requestType, recipientEmail } = req.body;

  if (email === recipientEmail)
    res.status(400).json({ message: "cannot send permission to yourself" });
  const newPermission = new Request({
    requesterEmail: recipientEmail,
    recipientEmail: email,
    requestType,
  });
  try {
    await newPermission.save();
    res.status(201).json(newPermission);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// route.put("/:email", async (req, res) => {
//   const { id } = req.params;
//   const { requestStatus } = req.body;
//   console.log(id, requestStatus);
//   try {
//     const updatedRequest = await Request.findByIdAndUpdate(
//       id,
//       { requestStatus },
//       { new: true }
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: "No request found" });
//     }

//     if (updatedRequest.requestStatus === "מאושר")
//       return res.status(400).json({ message: "Request already approved" });

//     if (updatedRequest.requestStatus === "לא מאושר")
//       return res.status(400).json({ message: "Request already denied" });

//     res.status(200).json(updatedRequest);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default route;
