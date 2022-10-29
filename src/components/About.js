import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import "../css/About.css";

function About() {
  return (
    <div className="home">
      <div className="about">
        <h2> Hi, My Name is Pham Quang Du</h2>
        <div className="info">
          <ul>
            <li>Student Code: 4601104032</li>
            <li>Email: phamdu12393@gmail.com</li>
            <li>Address: Ho Chi Minh City</li>
          </ul>
        </div>
        <div className="prompt">
          {/* <p>A software developer with a passion for learning and creating.</p> */}
          <FacebookIcon />
          <AlternateEmailIcon />
          <GitHubIcon /> 
        </div>
      </div>
    </div>
  );
}

export default About;
