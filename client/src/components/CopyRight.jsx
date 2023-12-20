import { FaLinkedin } from "react-icons/fa";

const CopyRight = () => {
  return (
    <div className="flex flex-col items-center text-sm">
      <span>כל הזכויות שמורות © {new Date().getFullYear()}</span>
      <ul className="flex gap-5">
        <li>
          <a
            href="https://www.linkedin.com/in/adam-elimelech-573742213/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile for adam"
            className="flex items-center gap-1"
          >
            אדם אלימלך
            <FaLinkedin className="text-base text-[#0A66C2]" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/anton-lokianov/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile for anton"
            className="flex items-center gap-1"
          >
            אנטון לוקיאנוב
            <FaLinkedin className="text-base text-[#0A66C2]" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CopyRight;
