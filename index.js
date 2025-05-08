import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8088');

    ws.current.onopen = () => {
      ws.current.send('SYSTEM: A user has connected');
    };

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      ws.current && ws.current.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN && input.trim()) {
      ws.current.send(`User: ${input}`);
      setInput('');
    }
  };

  const disconnect = () => {
    if (ws.current) {
      ws.current.send('SYSTEM: A user has disconnected');
      ws.current.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="bg-blue-600 text-white text-xl font-semibold text-center py-4">
          💬 WebSocket Chat Room
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, idx) => {
            const isSystem = msg.startsWith('SYSTEM:');
            const isUser = msg.startsWith('User:');
            return (
              <div
                key={idx}
                className={`${
                  isSystem
                    ? 'text-center text-sm text-gray-500 italic'
                    : isUser
                    ? 'self-end bg-blue-100 text-blue-900 rounded-lg px-4 py-2 max-w-xs ml-auto'
                    : 'self-start bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs'
                }`}
              >
                {isSystem ? msg.replace('SYSTEM: ', '') : msg.replace('User: ', '')}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        <button
          onClick={disconnect}
          className="bg-red-500 text-white text-sm py-2 w-full hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
