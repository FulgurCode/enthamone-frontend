import {useEffect,useRef,useState} from "react"
import styles from "../styles/Video.module.css"

function Video() {
    const [webSocket,setWebSocket] = useState()
    const [id,setId] = useState("")
    const [connectedUserId,setConnectedUserId] = useState("")
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState("")
    const [stream,setStream] = useState()
    const msgRef = useRef(null)

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
                    console.log(data)
                    setMessages(msg => [...msg, data])
                } else if (data.messageType == "SIGNAL") {
                    console.log(data)
                    if (data.category == "CONNECTED_SIGNAL") {
                        setConnectedUserId(data.content)
                    } else if (data.category == "DISCONNECTED_SIGNAL") {
                        setConnectedUserId("")
                        setMessages([])
                    }
                }
            })
        }
    },[webSocket])

    useEffect(() => {
        async function playVideoFromCamera() {
            const constraints = {'video': true, 'audio': true};
            navigator.mediaDevices.getUserMedia(constraints).then((s) => {
                setStream(s)
            }).catch(e => {
                console.error('Error opening video camera.', error);
            })
        }
        playVideoFromCamera()
    },[])

    useEffect(() => {
        if (stream) {
            const localVideoElement = document.querySelector('video#localVideo');
            const remoteVideoElement = document.querySelector('video#remoteVideo');
            localVideoElement.srcObject = stream;
            remoteVideoElement.srcObject = stream;
        }
    },[stream])

    // message scroll to bottom when updating
    useEffect(() => {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }, [messages])

    function sendMsg() {
        if (message == "") return;

        var msg = {
            to: connectedUserId,
            messageType: "CHAT",
            content: message,
        }

        webSocket.send(JSON.stringify(msg))
        setMessage("")
        setMessages(m => [...m, msg])
    }

    return(
        <>
            <div className={styles.main}>
                <header><h1>Atta</h1></header>
                <div className={styles.content}>

                    {/* Video */}
                    <div className={styles.video}>
                        <video srcobject={stream} id="remoteVideo" autoPlay controls={false} />

                        {/* Small video */}
                        <div className={styles.videoSmall}>
                            <video srcobject={stream} id="localVideo" autoPlay controls={false} />
                        </div>
                    </div>

                    <div className={styles.chat}>

                        {/* message container */}
                        <div className={styles.msg} ref={msgRef}>
                            {messages.map((message, index) => (
                                <div key={index} className={message.to == connectedUserId ? styles.sent : styles.received}>
                                    {message.content}
                                </div>
                            ))}
                        </div>

                        <div className={styles.textArea}>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message"></textarea>
                            <button onClick={sendMsg}>send</button>
                        </div>
                    </div>
                </div>
                <footer><button>Skip</button></footer>
            </div>
        </>
    )
}

export default Video;
