import Logo from "../assets/drawing.svg";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const dialogContainer = useRef();

  return (
    <>
      <dialog ref={dialogContainer} onClick={(e) => dialogContainer.current.close()}>
        <h2>Age Verification</h2>
        You must be 18 years or older to use this service.
        <span>
          <button className={styles.secondaryButton} onClick={() => {navigate("/chat")}}>I am 18 years or older</button>
          <button className={styles.primaryButton} onClick={() => {window.location.href = 'https://google.com'}}>I am not 18</button>
        </span>
      </dialog> 
      <div className={styles.header}>
        <h3>Entha Mone</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <span>ENGAGE WITH NEW PEOPLE</span>
          <h1>
            Connect, Chat, & Explore
            <br />
            Online
          </h1>
          <p>
            Explore countless conversations with individuals from all over
            <br />
            Connect with New People Instantly
          </p>
          <button
            onClick={() => {
              if (import.meta.env.VITE_AGE_CONFIRM === "true"){
                dialogContainer.current.showModal();
              } else {
                navigate("/chat");
              }
            }}
          >
            Talk to Strangers
          </button>
        </div>
        <img className={styles.illustration} src={Logo} />
      </div>
    </>
  );
}

export default Home;
