import { useState } from "react";
import { getUser, grantCalendarAccess } from "../services/graphService"; // Adjust the import path as needed

function GrantCalendarAccess({ authProvider }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("read");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);

  const grantAccess = async (email, role) => {
    try {
      const user = await getUser(authProvider);
      await grantCalendarAccess(authProvider, user.id, email, role);
      alert("Access granted successfully.");
    } catch (error) {
      console.error("Error granting access:", error);
      alert("Failed to grant access.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    grantAccess(email, role);
  };

  return (
    <div>
      <h2>Grant Calendar Access</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <select value={role} onChange={handleRoleChange}>
              <option value="read">Read</option>
              <option value="write">Write</option>
            </select>
          </label>
        </div>
        <button type="submit">Grant Access</button>
      </form>
    </div>
  );
}

export default GrantCalendarAccess;
