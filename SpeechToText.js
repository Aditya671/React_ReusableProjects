import React, { useState, useRef } from 'react';
import { Button } from 'antd';

/*
    How to use:
    <SpeechToText
        onResult={({ transcript, audioUrl }) => {
            // Store or dispatch result here
        }}
        style={{ position: 'absolute', top: '-15px', background: 'white', borderRadius: '16px' }}
    />
*/

const SpeechToText = ({ onResult, style }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const silenceTimerRef = useRef(null);

    const startRecognition = async () => {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition || !navigator.mediaDevices?.getUserMedia) {
                throw new Error('Browser does not support SpeechRecognition or getUserMedia.');
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            let finalTranscript = '';

            mediaRecorderRef.current.ondataavailable = (e) => {
                audioChunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                onResult?.({ transcript: finalTranscript, audioUrl });
            };

            mediaRecorderRef.current.start();

            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;
            recognitionRef.current.continuous = false;

            recognitionRef.current.onresult = (event) => {
                finalTranscript = event.results[0][0].transcript;
            };

            recognitionRef.current.onspeechend = () => {
                clearTimeout(silenceTimerRef.current);
                stopRecognition();
            };

            recognitionRef.current.onerror = (err) => {
                console.error('Recognition error:', err);
                stopRecognition();
            };

            silenceTimerRef.current = setTimeout(() => {
                stopRecognition();
            }, 5000);

            recognitionRef.current.start();
            setIsListening(true);
        } catch (err) {
            console.error('Failed to start recognition:', err);
        }
    };

    const stopRecognition = () => {
        recognitionRef.current?.stop();
        mediaRecorderRef.current?.stop();
        setIsListening(false);
        clearTimeout(silenceTimerRef.current);
    };

    const toggleRecognition = () => {
        if (isListening) {
            stopRecognition();
        } else {
            startRecognition();
        }
    };

    return (
        <Button
            onClick={toggleRecognition}
            style={style}
            icon={
                <svg height="18" viewBox="0 0 32 32" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12 L8 12 L16 6 L16 26 L8 20 L2 20 z M32 16 A16 16 0 0 1 27.5 27.5 L24.5 24.5 A12 12 0
                        0 0 28 16 A12 12 0 0 0 24.5 7.5  L27.5 4.5  A16 16 0 0 1 32 16  M25 16 A8 8 0 0 1 22 22 L19.5 19.5 A4 4
                        0 0 0 21 16 A4 4 0 0 0 19.5 12.5 L22 10 A8 8 0 0 1 25 16 "
                    />
                </svg>
            }
        >
            {isListening ? 'Listening…' : 'Speak'}
        </Button>
    );
};

export default SpeechToText;
