import styles from "../styles/Video.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Video() {
    return(
        <>
            <div className={styles.main}>
                <header><h1>Atta</h1></header>
                <div className={styles.content}>
                    <div className={styles.video}>
                        <div className={styles.videoSmall}></div>
                    </div>
                    <div className={styles.chat}>
                        <div className={styles.msg}></div>
                        <div className={styles.textArea}>
                            <textarea placeholder="Type a message"></textarea>
                            <button>send</button>
                        </div>
                    </div>
                </div>
                <footer><button>Skip</button></footer>
            </div>
        </>
    )
}

export default Video;