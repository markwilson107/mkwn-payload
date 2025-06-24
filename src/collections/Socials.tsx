import { InformationGlobal } from "@/payload-types";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";

function Socials({ information}: { information: InformationGlobal }) {
    return <div className="flex items-center gap-6 mt-5 text-3xl max-w-xs">
            <a
              href={information.socials.github}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <FaGithub className="text-[25px]" />
            </a>
            <a
              href={information.socials.linkedin}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <FaLinkedin className="text-[25px]" />
            </a>
            <a
              href={information.socials.calandly}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <MdCalendarMonth className="text-[28px]" />
            </a>
            <a
              href={`tel:${information.socials.phone}`}
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <FaPhone className="text-[22px]" />
            </a>
            <a
              href={`mailto:${information.socials.email}`}
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <FaEnvelope className="text-[25px]" />
            </a>
          </div>;
}

export default Socials;