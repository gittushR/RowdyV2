// Footer.tsx
import React, { useEffect } from "react";
import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div
          className="social-links"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href="https://twitter.com/nightttweeter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twitter"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/iamtush_r/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/tusharrathi173"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/tushar-rathi-/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/gittushR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <hr />
        <p className="footer__text">
          &copy; <span id="year"></span> - Built by{" "}
          <a
            href="https://github.com/gittushR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tushar Rathi
          </a>
          <br />
          Made with{" "}
          <span style={{ color: "red", marginLeft: "2px" }}>&hearts;</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
