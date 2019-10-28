import React from 'react';

const ConversationItem = ({
    friendsUsername,
    lastMessage,
    conversationId
}) => {

    return (
        
        <a href={`#/messages/${conversationId}`} className='w3-bar-item w3-button'>
            <div>
                <div>
                    {friendsUsername}
                </div>
                <div>
                    {lastMessage.text}
                </div>
            </div>  
        </a>

    );
};

export default ConversationItem;