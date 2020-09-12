import React, { useState, useEffect } from 'react'
import './Chat.css';
import { useParams } from 'react-router-dom'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from './firebase'
import { useStateProviderValue } from './StateProvider';

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateProviderValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId)
                .collection('messages').orderBy
                ('timestamp', 'asc').onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection
            ('messages').add({
                message: input,
                name: user.displayName,
                timestamp: new Date()
            });

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {" "}
                        {String(new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()).slice(5, 12) + String(new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()).slice(17, 22)
                        }

                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {String(new Date(message.timestamp?.toDate()).toUTCString()).slice(5, 12) + String(new Date(message.timestamp?.toDate()).toUTCString()).slice(17, 22)}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="  Type a message" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
