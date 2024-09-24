import React, { useState, useEffect } from "react";
import { PlayCircleOutlined } from '@ant-design/icons'
import { Button } from "antd";

const TextToSpeech = ({ text, style }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    /* 
        How to use in any other component
        text -> speaks whatever value is passed in this attribute
        style -> takes style as input to plave the component in desired location over parent component
        <TextToSpeech
            text={botMessage?.message}
            style={{ position: 'absolute', top: '-15px', background: 'white', borderRadius: '16px', textAlign: 'center', padding: '5px 10px' }}
        />
    */
   const PlayCircleOutlineSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <title>ionicons-v5-c</title>
        <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><path d="M216.32,334.44,330.77,265.3a10.89,10.89,0,0,0,0-18.6L216.32,177.56A10.78,10.78,0,0,0,200,186.87V325.13A10.78,10.78,0,0,0,216.32,334.44Z"/>
    </svg>
   )
    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        } else {
            synth.speak(utterance);
        }

        setIsPaused(false);
    };

    return (
        <>
            <Button style={style} onClick={handlePlay} icon={
                <svg height="18" id="speaker-volume" viewBox="0 0 32 32" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12 L8 12 L16 6 L16 26 L8 20 L2 20 z M32 16 A16 16 0 0 1 27.5 27.5 L24.5 24.5 A12 12 0
                        0 0 28 16 A12 12 0 0 0 24.5 7.5  L27.5 4.5  A16 16 0 0 1 32 16  M25 16 A8 8 0 0 1 22 22 L19.5 19.5 A4 4
                        0 0 0 21 16 A4 4 0 0 0 19.5 12.5 L22 10 A8 8 0 0 1 25 16 "
                    /></svg>
            }></Button>
        </>
    );
};

export default TextToSpeech;
