import privacyImg from "../assets/illustrations/privacy.jpg";
import LegalInfo from "./LegalInfo";

const Privacy = () => {
  const privacy = [
    {
      title: "Data Collection",
      content:
        "We collect basic account information (e.g., name, email) and quiz interactions to enhance user experience.",
    },
    {
      title: "Storage & Security",
      content:
        "User data is stored in MongoDB. Passwords are never stored in plain text — they are securely hashed using bcrypt.",
    },
    {
      title: "Authentication",
      content:
        "We use JWT (JSON Web Tokens) for secure user sessions. Cookies are used to store session tokens and preferences (e.g., theme).",
    },
    {
      title: "Data Sharing",
      content:
        "Your personal data is not shared with third parties unless legally required.",
    },
    {
      title: "User Control",
      content:
        "You may request to update or delete your data at any time by contacting support.",
    },
    {
      title: "Policy Updates",
      content:
        "These terms are subject to change. Continued use of the platform indicates your agreement with the latest version.",
    },
  ];

  return (

    <LegalInfo

      legalInfoIllustration={privacyImg}

      legalInfoTitle={
        "We value your privacy. By using this service, you trust us with your data, and we are committed to protecting it."
      }

      legalInfoArray={privacy}

    />
    
  );
};

export default Privacy;
