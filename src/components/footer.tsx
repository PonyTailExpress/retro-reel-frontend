import gitHubLogo from "../assets/gitHubLogo.png";

function Footer() {
  return (
    <footer
      className="Footer"
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#222",
        color: "#fff",
      }}
    >
      <p>&copy; {new Date().getFullYear()} Retro Reel. All rights reserved.</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <a
          href="https://github.com/PonyTailExpress/retro-reel-frontend"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={gitHubLogo}
            alt="GitHub Logo"
            style={{ width: "50px", height: "auto" }}
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
