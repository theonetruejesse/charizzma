import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import {
  AudioConfig,
  SpeechConfig,
  SpeechSynthesizer,
  ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';
import { getTokenOrRefresh } from '../utils/token_util';
const stopDelay = 250;

export default function Speaker({ getText, convoState, id = 'speaker' }) {
  const synth = (useRef < SpeechSynthesizer) | (null > null); // doesn't wait for rerender to change
  const [tempDisable, setTempDisable] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (tempDisable) {
      setTimeout(() => {
        setTempDisable(false);
      }, stopDelay); // timing to sync disabled with send button
    }
  }, [tempDisable]);

  // const microphoneHandler = async (recog:SpeechRecognizer, mode: boolean) => {
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
          const initStart = async () => {
            // if (synth.current) {
            //   synth.current.stopContinuousRecognitionAsync();
            // }
            synth.current = await initSynthesizer();
            await ttsToSpeaker(getText, synth.current);
          };
          initStart();

          //   setPressed(true);
        } else {
          //   await ttsToSpeaker(getText, synth.current!);
        }
      }}
    >
      <FontAwesomeIcon icon={faVolumeUp} className="w-4 h-4 text-white" />
    </button>
  );
}

async function initSynthesizer() {
  const tokenObj = await getTokenOrRefresh();

  const speechConfig = SpeechConfig.fromAuthorizationToken(
    tokenObj.authToken,
    tokenObj.region
  );
  speechConfig.speechSynthesisVoiceName = 'en-US-JennyNeural';

  const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
  return synthesizer;
}

async function ttsToSpeaker(getText, synthesizer) {
  let text = getText();

  synthesizer.speakTextAsync(
    text,
    function (result) {
      if (result.reason === ResultReason.SynthesizingAudioCompleted) {
        console.log('synthesis finished.');
      } else {
        console.error('Speech synthesis canceled, ' + result.errorDetails);
      }
      synthesizer.close();
    },
    function (err) {
      console.trace('err - ' + err);
      synthesizer.close();
    }
  );
}
