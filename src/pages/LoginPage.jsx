import React from "react";
import backgroundImage from "../imgs/pexels-cameron-casey-1722183.jpg";
import { Card, Button, Typography } from "@material-tailwind/react";
import { useAppContext } from "../context/appContext";
export const LoginPage = () => {
  const app = useAppContext();
  const authProvider = app.authProvider;
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex align-middle justify-center items-center h-screen">
        <div className="p-9 bg-white bg-opacity-90 rounded-lg shadow-lg shadow-black">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray" className="my-2">
              מערכת ניהול יומנים
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              לחץ על "כניסה למערכת" והתחבר עם חשבון הארגון שלך
            </Typography>
            <form className=" mb-2 w-80 max-w-screen-lg sm:w-96">
              <Button className="mt-6" fullWidth onClick={app.signIn}>
                כניסה למערכת
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
