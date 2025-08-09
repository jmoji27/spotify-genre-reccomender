import React, {useState} from 'react';

function ChatGpt(){
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        const res = await fetch('http://localhost:5000/api/chatgpt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'

            },
            body: JSON.stringify({prompt}),
        });

        const data = await res.json();
        setResponse(data.text);


    };

    return (
        <div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
            <button onClick={handleSubmit}>
                Generate Playlist

            </button>
            <pre>
                {response}
            </pre>
        </div>
    );
    
}
export default ChatGpt;