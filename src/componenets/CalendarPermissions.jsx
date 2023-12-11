import React, { useState, useEffect, useContext } from "react";
import { getCalendarPermissions } from "../services/graphService";
import { useAppContext } from "../context/appContext";

const CalendarPermissions = () => {
  const [permissions, setPermissions] = useState([]);

  //context
  const app = useAppContext();
  const authProvider = app.authProvider;

  console.log(permissions);
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const result = await getCalendarPermissions(authProvider);
        console.log("getCalendarPermissions inside fetchPermissions", result);
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
