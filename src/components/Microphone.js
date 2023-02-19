import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

import {
  AudioConfig,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { getTokenOrRefresh } from '../utils/token_util';
const stopDelay = 250;

export default function Microphone({ setText, convoState, id = 'microphone' }) {
  const recog = (useRef < SpeechRecognizer) | (null > null); // doesn't wait for rerender to change
  const [tempDisable, setTempDisable] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (tempDisable) {
      setTimeout(() => {
        setTempDisable(false);
      }, stopDelay); // timing to sync disabled with send button
    }
  }, [tempDisable]);

  // const microphoneHandler = async (recog: SpeechRecognizer, mode: boolean) => {
  //   if (mode) await sttFromMic(turn, setTurn, setText, currText, recog);
  //   else stopSttFromMic(turn, setTurn, currText, setText, recog);
  // };

  return (
    <button
      type="button"
      id={id}
      onClick={e => {
        e.preventDefault();
        if (!pressed) {
          // stop audio
          // if (convoState.value.audio.player) {
          //   convoState.value.audio.player.pause();
          //   convoState.value.audio.player.close();
          // }
          console.log(recog.current);
          const initStart = async () => {
            if (recog.current) {
              recog.current.stopContinuousRecognitionAsync();
            }
            recog.current = await initRecognizer();
            await sttFromMic(setText, recog.current);
          };
          initStart();

          setPressed(true);
        } else {
          stopSttFromMic(setText, recog.current);
          setTempDisable(true);

          setPressed(false);
        }
      }}
    >
      <FontAwesomeIcon
        icon={!pressed ? faMicrophone : faStop}
        className="w-4 h-4 text-white"
      />
    </button>
  );
}

async function initRecognizer() {
  const tokenObj = await getTokenOrRefresh();

  const speechConfig = SpeechConfig.fromAuthorizationToken(
    tokenObj.authToken,
    tokenObj.region
  );
  speechConfig.speechRecognitionLanguage = 'en-US';

  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
  return recognizer;
}

async function sttFromMic(setText, recognizer) {
  setText('');

  recognizer.startContinuousRecognitionAsync(
    () => {},
    e => {
      console.log(e);
    }
  );

  // function keeps running when text is recognized, keeping recogText out to keep updating
  let recogText = '';
  recognizer.recognized = function (_, e) {
    if (e.result.reason != ResultReason.NoMatch) {
      recogText = formatText(e.result.text, recogText);
      setText(recogText);
    } else {
      console.log(e.result);
    }
  };
}

async function stopSttFromMic(setText, recognizer) {
  await setTimeout(() => {
    recognizer.stopContinuousRecognitionAsync();
  }, stopDelay);
}

function formatText(text, curr) {
  curr = curr.trim();
  text = text.trim();

  if (text != '') {
    if (curr != '') text = ' ' + text;
  }
  return (curr + text).trim();
}
