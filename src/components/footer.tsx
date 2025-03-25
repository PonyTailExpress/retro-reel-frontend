import gitHubLogo from "../assets/gitHubLogo.png";

function Footer() {
  return (
    <footer
      className="Footer"
      style={{
        textAlign: "center",
        padding: "20px",
        background: "##ff69b4",
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
            style={{
              width: "50px",
              height: "auto",
              filter: "invert(1)", // This makes the logo white
            }}
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
