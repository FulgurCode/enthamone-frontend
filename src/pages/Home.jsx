import Logo from "../assets/drawing.svg";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <h3>EnthaMone.com</h3>
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
              navigate("/video");
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
