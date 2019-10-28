import React, { useState, useEffect } from 'react';
import TokenService from '../services/tokenService';
import Sidebar from '../layout/sidebar';

import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000')

const Messenger = (props) => {
    const [conversationItems, setConversationItems] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios({
            url: '/api/conversations',
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": TokenService.loadToken()
            }
        }).then((res) => {
            setConversationItems(res.data);
            const {id} = props.match.params;
            if (!id) 
                return;
            setCurrentConversation(res.data.find(x => x._id === id))
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        if (currentConversation) {
            socket.on(`conversation/${currentConversation._id}`, (message) => {
                setCurrentConversation({
                    ...currentConversation,
                    messages: [
                        ...currentConversation.messages,
                        message
                    ]
                });
            });
            return function cleanup() {
                socket.off(`conversation/${currentConversation._id}`);
            };
        }

    }, [currentConversation]);

    useEffect(() => {
        if (currentConversation && currentConversation !== conversationItems[conversationItems.length - 1]) {
            setConversationItems([
                ...conversationItems.filter(c => c._id !== currentConversation._id),
                currentConversation
            ]);
        }
    }, [currentConversation]);

    const getFriendsUsername = (item) => {
        const username = TokenService.getUsername();
        return item.users.find(user => user.username !== username).username;
    }

    const getFriendsId = (item) => {
        const username = TokenService.getUsername();
        return item.users.find(user => user.username !== username)._id;
    }

    const getLastMessage = (item) => {
        // return item.messages.sort((i,j) => !(new Date(i.create_date) - new Date(j.create_date)) )[0];
        return item.messages[item.messages.length - 1];
    }

    const textareaChanged = (event) => {
        setNewMessage(event.target.value);
    }

    const checkSender = (message) => {
        return message.sender === TokenService.getId();
    }

    const handleSubmit = (e) => {
        if (e.key !== 'Enter')
            return;
        e.preventDefault();
        axios({
            url: '/api/messages',
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": TokenService.loadToken()
            },
            data: {
                text: newMessage,
                conversation: currentConversation._id,
                sender: TokenService.getId(),
                reciever: getFriendsId(currentConversation)
            }
        }).then((res) => {
            setNewMessage('');
            socket.emit('new-message', res.data);
        }).catch((err) => {
            console.log(err);
        });

    }
    return (
        <>
            <Sidebar 
                items={conversationItems}
                getFriendsUsername={getFriendsUsername}
                getLastMessage={getLastMessage}
            />
            { currentConversation && <div style={{marginLeft: '25%'}}>

                <div className="w3-container w3-teal">
                    <h1>{getFriendsUsername(currentConversation)}</h1>
                </div>

                <div className="w3-container">
                    <div className="messages"  style={styles.messages}>
                        {
                            currentConversation.messages.map(message => (
                                <p key={message._id} style={checkSender(message) ? styles.message: null}>
                                    {message.text}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div style={styles.newMessage}>
                    <textarea 
                        value={newMessage}
                        onChange={textareaChanged}
                        onKeyPress={handleSubmit}
                        style={styles.textarea}
                        placeholder='New Message'
                    >
                        
                    </textarea>
                </div>

            </div>}
            
        </>

    );
};

const styles = {
    newMessage: {
        overflow: 'hidden',
        position: 'fixed',
        bottom: '0',
        width: '75%',
        height: '15%',
        margin: '5px',
    },
    textarea: {
        width: '99.3%',
        height: '100%',
        resize: 'none',
    },
    message: {
        textAlign: 'right',
    },
    messages: {
        height: '780px',
        overflow: 'auto',
        // overflowY: 'scroll'
    }
}

export default Messenger;