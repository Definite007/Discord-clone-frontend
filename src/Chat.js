import React, { useEffect, useState } from 'react';
import "./Chat.css";
import ChatHeader from './ChatHeader';
import AddCricleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
// import db from './firebase';
// import firebase from 'firebase';
import axios from './axios';
import Pusher from "pusher-js";

const pusher = new Pusher('2c85310c5ba9cfaac9e1', {
    cluster: 'ap2'
  });

function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] =  useState('');
    const [messages, setMessages] = useState([]);

    const getConversation = (channelId) => {
        if(channelId) {
            axios.get(`/get/conversation?id=${channelId}`).then((res) =>{
                setMessages(res.data[0].conversation)
                console.log(res.data);
            })
        }
    }

    useEffect(() => {
    //     if(channelId) {
    //     db.collection('channels')
    //     .doc(channelId)
    //     .collection("messages")
    //     .orderBy('timestamp', 'desc')
    //     .onSnapshot(snapshot =>
    //         setMessages(snapshot.docs.map((doc) => doc.data()))
    //     )
    // }
        getConversation(channelId)

        const channel = pusher.subscribe('conversation');
        channel.bind('newMessage', function(data) {
            getConversation(channelId)
        });
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault();
        // db.collection('channels').doc(channelId).collection('messages').add({
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     message: input,
        //     user: user,
        // });

        axios.post(`/new/message?id=${channelId}`, {
            message: input,
            timestamp: Date.now(),
            user: user
        })

        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map((message) => (
                    <Message
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                    />
                ))}
            </div>
            <div className="chat__input">
                <AddCricleIcon fontSize="large"/>
                <form>
                    <input value={input} disabled={!channelId} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
                    <button className="chat__inputButton" type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
