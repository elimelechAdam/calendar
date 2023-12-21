import { Alert } from "@material-tailwind/react";
import { MdErrorOutline } from "react-icons/md";

const NotSuppMobileMessage = () => {
  return (
    <div
      className="h-screen flex justify-center align-middle items-center
     
      xl:hidden"
    >
      <Alert
        icon={<MdErrorOutline className="text-[1.7rem]" />}
        className="max-w-[400px] w-full flex align-middle items-center px-5"
      >
        אין תמיכה בטלפונים או טאבלטים
      </Alert>
    </div>
  );
};

export default NotSuppMobileMessage;
