import {useEffect,useState} from "react"
import styles from "../styles/Video.module.css"

function Video() {
    const [webSocket,setWebSocket] = useState()
    const [id,setId] = useState("")
    const [messages,setMessages] = useState([])

    useEffect(() => {
        setWebSocket(
            new WebSocket("ws://localhost:3000/ws/start"),
        );

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
    }, []);

    useEffect(() => {
        if (webSocket) {
            webSocket.addEventListener("message", (event) => {
                let data = JSON.parse(event.data)
                if (data.messageType == "ID") {
                    setId(data.content)
                } else if (data.messageType == "CHAT") {
                    setMessages(msg => [...msg, data])
                    console.log(data.content)
                }
            })
        }
    },[webSocket])

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
