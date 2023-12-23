import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requesterEmail: String,
    recipientEmail: String,
    requestType: String,
    requestStatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// const permissionSchema = new mongoose.Schema({
//   grantorEmail: String,
//   recipientEmail: String,
//   permissionType: String,
//   permissionStatus: {
//     type: String,
//     enum: ["ממתין", "אושר", "לא אושר"],
//     default: "ממתין",
//   },
//   permissionDate: { type: Date, default: Date.now },
// });

// export const Permission = mongoose.model("Permission", permissionSchema);
export const Request = mongoose.model("Request", requestSchema);
