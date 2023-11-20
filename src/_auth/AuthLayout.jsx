import { UnauthenticatedTemplate } from "@azure/msal-react";
import SignInButton from "./SignInButton";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-site bg-cover bg-center">
      <UnauthenticatedTemplate>
        <section className="flex items-center min-h-screen justify-center">
          <div
            className="flex flex-col gap-5 bg-[rgba(250,250,250,0.90)]  px-8 py-9 
          rounded-lg max-w-md w-full shadow-lg border border-gray-200 border-opacity-30">
            <h1 className="font-bold text-[1.6rem] text-gray-900">
              מערכת ניהול יומנים
            </h1>
            <p>לחץ על "כניסה למערכת" והתחבר עם חשבון הארגון שלך</p>
            <SignInButton />
          </div>
        </section>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default AuthLayout;
