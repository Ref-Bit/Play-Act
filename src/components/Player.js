import React, { useState, useEffect } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  Bookmark,
  Forward,
  Mute,
  Pause,
  Pin,
  Play,
  Rewind,
  Upload,
  Volume,
} from './Icons';
import useAudio from '../hooks/useAudio';
import { convertSecondsToHHMMSS } from '../helpers';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default function Player() {
  const [vol, setVol] = useState(50);
  const [url, setUrl] = useState(
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  );
  const [
    audio,
    playing,
    muted,
    toggle,
    muteToggle,
    currentTime,
    duration,
  ] = useAudio(url, vol);
  const [marks, setMarks] = useState({});
  const [step, setStep] = useState(10);
  const handleRate = e => (audio.playbackRate = parseFloat(e.target.value));
  const handleStep = e => setStep(parseInt(e.target.value));
  const handleBookmark = () => {
    setMarks({
      ...marks,
      [audio.currentTime]: {
        label: <Pin />,
      },
    });
  };
  const handleUpload = async e => {
    let file = e.target.files[0];

    /** Method 1: Through Base64 */
    // const fileBase64 = await convertFileToBase64(file);
    // setUrl(fileBase64);

    /** Method 2: Through Blob */
    const fileURL = URL.createObjectURL(file);
    setUrl(fileURL);
  };

  useEffect(() => {
    audio.src = url;
    return () => (audio.src = '');
  }, [audio, url]);

  return (
    <div className="flex flex-col mx-auto w-1/2 shadow hover:shadow-xl transition duration-300 lg:rounded-b-xl">
      <div className="bg-white dark:bg-gray-800 p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
          <img
            src="https://source.unsplash.com/300x300/?music"
            alt=""
            width="160"
            height="160"
            className="flex-none w-20 h-20 rounded-lg bg-gray-100"
          />
          <div className="min-w-0 flex-auto space-y-0.5">
            <p className="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
              <abbr title="Episode">Ep.</abbr> 128
            </p>
            <h2 className="text-gray-900 dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate">
              Scaling CSS at Heroku with Utility Classes
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg lg:text-base xl:text-lg font-medium">
              Full Stack Radio
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <SliderWithTooltip
            value={audio.currentTime}
            marks={marks}
            tipFormatter={val => `${convertSecondsToHHMMSS(val)}`}
            min={0}
            max={audio.duration}
            onChange={val => (audio.currentTime = val)}
          />
          <div className="text-gray-900 dark:text-gray-300 flex justify-between text-sm font-medium tabular-nums">
            {currentTime ? <div>{currentTime}</div> : <div>00:00</div>}
            {duration ? <div>{duration}</div> : <div>00:00</div>}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white lg:rounded-b-xl py-4 px-1 sm:px-3 lg:px-1 xl:px-3 flex justify-evenly items-center">
        <div className="mx-auto">
          <label className="flex flex-col items-center cursor-pointer">
            <Upload />
            <input
              type="file"
              className="hidden"
              accept="audio/*"
              onChange={handleUpload}
            />
          </label>
        </div>
        <button
          id="bookmark_btn"
          type="button"
          className="mx-auto"
          onClick={handleBookmark}
          title="Pin Sec"
        >
          <Bookmark />
        </button>
        <button
          id="dec_30_btn"
          type="button"
          className="mx-auto"
          onClick={() => (audio.currentTime -= step)}
          title={`Rewind ${step}s`}
        >
          <Rewind step={step} />
        </button>
        <button
          id="play_btn"
          type="button"
          className="mx-auto"
          onClick={toggle}
        >
          {playing ? (
            <span title="Pause">
              <Pause />
            </span>
          ) : (
            <span title="Play">
              <Play />
            </span>
          )}
        </button>
        <button
          id="inc_30_btn"
          type="button"
          className="mx-auto"
          onClick={() => (audio.currentTime += step)}
          title={`Forward ${step}s`}
        >
          <Forward step={step} />
        </button>
        <div className="inline-block relative w-16 mx-auto" title="Play Rate">
          <select
            defaultValue="1.0"
            onChange={handleRate}
            className="block cursor-pointer appearance-none w-full text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 hover:border-lime-400 focus:border-lime-400 pl-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline transition duration-300"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1.0">1.0x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2.0">2.0x</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-3 w-3 text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="inline-block relative w-16 mx-auto" title="Step">
          <select
            defaultValue="10"
            onChange={handleStep}
            className="block cursor-pointer appearance-none w-full text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 hover:border-lime-400 focus:border-lime-400 pl-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline transition duration-300"
          >
            <option value="10">10s</option>
            <option value="30">30s</option>
            <option value="60">60s</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-3 w-3 text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          id="vol_btn"
          type="button"
          className="ml-auto mr-1"
          onClick={muteToggle}
        >
          {muted ? (
            <span title="Unmute">
              <Mute />
            </span>
          ) : (
            <span title="Mute">
              <Volume />
            </span>
          )}
        </button>
        <div id="volume-slider" className="w-36">
          {!muted ? (
            <SliderWithTooltip
              value={vol || 50}
              tipFormatter={val => `${val}%`}
              min={0}
              max={100}
              onChange={val => setVol(val)}
            />
          ) : (
            <Slider value={vol} min={0} max={100} disabled />
          )}
        </div>
      </div>
    </div>
  );
}
