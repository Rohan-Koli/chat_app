import React, { useState, useRef, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! How are you doing today?", sender: "other", time: "09:41 AM" },
    { id: 2, text: "I'm good, thanks for asking! Just finishing up some work. How about you?", sender: "me", time: "09:43 AM" },
    { id: 3, text: "Doing well! I was wondering if you'd like to grab lunch later this week?", sender: "other", time: "09:45 AM" },
    { id: 4, text: "That sounds great! How about Thursday at noon?", sender: "me", time: "09:48 AM" },
    { id: 5, text: "Thursday works perfectly for me. Let's meet at that new place downtown.", sender: "other", time: "09:50 AM" }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeContact, setActiveContact] = useState('sarah');
  
  const messagesEndRef = useRef(null);
  
  // Contacts data
  const contacts = [
    { id: 'sarah', name: 'Sarah Johnson', status: 'online', lastSeen: 'now', avatar: 'SJ' },
    { id: 'mike', name: 'Mike Peterson', status: 'away', lastSeen: '5m ago', avatar: 'MP' },
    { id: 'alex', name: 'Alex Rodriguez', status: 'offline', lastSeen: '2h ago', avatar: 'AR' },
    { id: 'emma', name: 'Emma Wilson', status: 'online', lastSeen: 'now', avatar: 'EW' },
    { id: 'david', name: 'David Kim', status: 'offline', lastSeen: '1d ago', avatar: 'DK' }
  ];
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    if (activeContact === 'sarah') {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [messages, activeContact]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate reply
    if (activeContact === 'sarah') {
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you soon.",
          sender: 'other',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
      }, 5000);
    }
  };
  
  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 h-[60px]">
        <div className="text-xl font-semibold text-gray-800">Chat Application</div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[280px] bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className={`flex items-center p-3 rounded-md mb-2 cursor-pointer transition-colors ${
                activeContact === contact.id 
                  ? 'bg-indigo-300 text-gray-50' 
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveContact(contact.id)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold mr-3">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.lastSeen}</div>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ml-2 ${
                contact.status === 'online' ? 'bg-emerald-500' : 
                contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* Messages */}
        <div className="flex flex-col flex-1">
          <div className="flex-grow p-4 overflow-y-auto flex flex-col">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`max-w-[70%] mb-4 flex ${
                  message.sender === 'me' ? 'self-end' : 'self-start'
                }`}
              >
                <div className={`p-3 px-4 rounded-2xl relative ${
                  message.sender === 'me' 
                    ? 'bg-indigo-500 text-gray-50 shadow-md' 
                    : 'bg-white text-gray-800 shadow-[0_10px_20px_rgba(99,102,241,0.15),_0_6px_6px_rgba(0,0,0,0.1),_inset_0_-2px_5px_rgba(255,255,255,0.7)] border border-white/70'
                }`}>
                  {message.text}
                  <div className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-indigo-300' : 'text-gray-500'
                  } self-end`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center p-2 px-4 rounded-full bg-white text-gray-500 text-sm shadow-[0_10px_20px_rgba(99,102,241,0.15),_0_6px_6px_rgba(0,0,0,0.1),_inset_0_-2px_5px_rgba(255,255,255,0.7)] mb-3 w-fit">
                <span>Sarah is typing</span>
                <div className="flex ml-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-0.5 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-0.5 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-grow bg-gray-100 border-none rounded-full py-3 px-4 font-sans text-base text-gray-800 shadow-sm transition-shadow focus:outline-none focus:shadow-[0_0_0_2px_rgba(165,180,252,1)]"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-md ml-2 transition-all hover:bg-indigo-700 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;