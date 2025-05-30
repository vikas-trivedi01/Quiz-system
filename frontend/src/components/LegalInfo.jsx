const LegalInfo = ({
  legalInfoIllustration,
  legalInfoTitle,
  legalInfoArray
} = props) => {
  return (
    <div className="container">
      <div className="text-center mb-2">
        <img
          src={legalInfoIllustration}
          alt="Legal info illustration"
          width={600}
          height={900}
          className="img-fluid"
        />
      </div>

      <div className="mx-auto mb-5" style={{ maxWidth: "900px" }}>
        <h3 className="text-center mb-3">Welcome to QuizGenius.</h3>
        <h5 className="text-center mb-5">{legalInfoTitle}</h5>

        <table
          className="w-100"
          style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}
        >
          <tbody>
            {legalInfoArray.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  verticalAlign: "top",
                }}
              >
                <td
                  style={{
                    padding: "10px 20px",
                    width: "300px",
                    fontWeight: "bold",
                  }}
                >
                  <h5 style={{ margin: 0 }}>{row.title}</h5>
                </td>
                <td style={{ padding: "10px 0" }}>{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LegalInfo;
