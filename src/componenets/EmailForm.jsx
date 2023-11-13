import React, { useState } from "react";
import { sendEmail } from "../services/graphService";

const EmailForm = ({ authProvider }) => {
  const [emailDetails, setEmailDetails] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(authProvider, emailDetails);
      alert("Email sent successfully");
    } catch (error) {
      alert("Failed to send email");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="to"
        placeholder="To"
        value={emailDetails.to}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailDetails.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Body"
        value={emailDetails.body}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
