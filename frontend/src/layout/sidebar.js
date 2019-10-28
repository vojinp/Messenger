import React from 'react';
import ConversationItem from '../components/ConversationItem';

const Sidebar = ({
    items,
    getFriendsUsername,
    getLastMessage
}) => {
    return (
        <div className='w3-sidebar w3-light-grey w3-bar-block' style={{width: '25%'}}>
            <h3 className='w3-bar-item'>Messages</h3>
            { items.map(item => (
                <ConversationItem 
                    key={item._id} 
                    friendsUsername={getFriendsUsername(item)}
                    lastMessage={getLastMessage(item)}
                    conversationId={item._id}
                />
            ))}
        </div>
    )
}

export default Sidebar;