import termsImg from "../assets/illustrations/terms.jpg";
import LegalInfo from "./LegalInfo";

const Terms = () => {
  const terms = [
    {
      title: "Use of Service",
      content:
        "This platform provides quiz-based learning and evaluation services for educational and personal improvement only.",
    },
    {
      title: "Account Responsibility",
      content:
        "Users must provide accurate information and keep login credentials secure. Passwords are hashed using bcrypt for your safety.",
    },
    {
      title: "Fair Usage",
      content:
        "You agree not to misuse, disrupt, or exploit the service in any way. Automated bots, scraping, or unauthorized access attempts are strictly prohibited.",
    },
    {
      title: "Termination",
      content:
        "We reserve the right to suspend accounts for any activity that violates our terms or impacts platform integrity.",
    },
  ];

  return (
    <LegalInfo
      legalInfoIllustration={termsImg}
      legalInfoTitle={
        "By accessing or using this platform, you agree to the following terms."
      }
      legalInfoArray={terms}
    />
  );
};

export default Terms;
