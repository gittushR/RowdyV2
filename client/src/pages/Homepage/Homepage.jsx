import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Footer from "../../components/footer/Footer";
import { useAuth } from "@clerk/clerk-react";

const Homepage = () => {
  const { userId } = useAuth();
  // const test = async()=>{
  //   await fetch("http://localhost:5000/api/test",{
  //     credentials:'include'
  //   })
  // }
  return (
    <div className="home">
      <div className="homepage">
        <img
          src="orbital.png"
          alt="orbital background image"
          className="orbital"
        />
        <div className="left">
          <h1>ROWDY AI</h1>
          <h2>Because emotional damage is free....</h2>
          <h3>
            Chatbots are boring. Rowdy AI is a riot. Rowdy AI delivers brutally
            honest, sarcastic, and downright unhinged replies with zero regard
            for your feelings. Whether you’re looking for laughs, roasts, or
            just someone to verbally slap some sense into you, Rowdy’s got your
            back...
          </h3>
          {userId && (
            <Link className="chatNow" to="/dashboard">
              Chat Now
            </Link>
          )}

          {!userId && (
            <div
              id="loginSignUpButtons"
              style={{ display: "flex", gap: "20px" }}
            >
              <Link to="/login">Sign-In</Link>
              <Link to="/sign-up">Create Account</Link>
            </div>
          )}

          {/* <button onClick={test}>Test AUTH</button> */}
        </div>
        <div className="right">
          <div className="imgContainer">
            <div className="bgContainer">
              <div className="bg"></div>
            </div>
            <img src="brokenRobo3.png" alt="codingBot" className="bot" />
            <div className="chat">
              <TypeAnimation
                sequence={[
                  "Stop being soft—get rowdy or get lost!",
                  1000,
                  "Speak loud, act wild, own the room!",
                  2000,
                  "Drop the manners, bring the madness",
                  1000,
                  "Talk like a storm, walk like a riot.",
                  1500,
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
