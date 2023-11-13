import React, { useState, useEffect } from "react";
import { getCalendarPermissions } from "../services/graphService";

const CalendarPermissions = ({ authProvider }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const result = await getCalendarPermissions(authProvider);
        setPermissions(result);
      } catch (error) {
        console.error("Failed to fetch calendar permissions", error);
      }
    };

    fetchPermissions();
  }, [authProvider]);

  return (
    <div>
      <h2>Calendar Permissions</h2>
      <ul>
        {permissions.map((perm, index) => (
          <li key={index}>
            {perm.emailAddress.name}: {perm.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarPermissions;
