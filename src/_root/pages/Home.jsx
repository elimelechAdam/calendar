import { useEffect } from "react";
import { getUserDetails } from "../../lib/utils/msg-api";

const Home = () => {
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails);
        // Additional logic with userDetails
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error
      }
    }

    // Call the function
    fetchUserData();
  }, []);

  return <div>shalom bla</div>;
};

export default Home;
