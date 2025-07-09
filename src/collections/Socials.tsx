import { InformationGlobal } from "@/payload-types";
import GitHubIcon from "@/assets/GitHubIcon";
import LinkedInIcon from "@/assets/LinkedInIcon";
import CalandarIcon from "@/assets/CalandarIcon";
import PhoneIcon from "@/assets/PhoneIcon";
import EnvelopeIcon from "@/assets/EnvelopeIcon";

function Socials({ information}: { information?: InformationGlobal }) {
    return <div className="flex items-center gap-6 mt-5 text-3xl max-w-xs">
            <a
              href={information?.socials?.github || ""}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <GitHubIcon width={25} height={25} />
            </a>
            <a
              href={information?.socials?.linkedin || ""}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <LinkedInIcon width={25} height={25} />
            </a>
            <a
              href={information?.socials?.calandly || ""}
              target="_blank"
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <CalandarIcon width={28} height={28} />
            </a>
            <a
              href={`tel:${information?.socials?.phone || ""}`}
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <PhoneIcon width={22} height={22} />
            </a>
            <a
              href={`mailto:${information?.socials?.email || ""}`}
              className="text-primary dark:text-primary-dark hover:text-theme transition-colors duration-300"
            >
              <EnvelopeIcon width={25} height={25} className="text-[25px]" />
            </a>
          </div>;
}

export default Socials;