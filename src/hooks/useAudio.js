import { useState, useEffect } from 'react';
import { convertSecondsToHHMMSS } from '../helpers';

const useAudio = (url, vol) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [duration, setDuration] = useState('');

  const toggle = () => setPlaying(!playing);
  const muteToggle = () => setMuted(!muted);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    muted && vol > 0 ? (audio.muted = true) : (audio.muted = false);
    audio.volume = vol / 100;
  }, [audio, playing, muted, vol]);

  useEffect(() => {
    const favicon = document.querySelector('#favicon');
    const logo = document.querySelector('#logo');

    audio.addEventListener('loadedmetadata', () => {
      setDuration(convertSecondsToHHMMSS(audio.duration));
      // audio.play();
    });
    audio.addEventListener('play', () => {
      favicon.setAttribute('href', './play.png');
      logo.classList.add('animate-ping');
    });
    audio.addEventListener('pause', () => {
      favicon.setAttribute('href', './pause.png');
      logo.classList.remove('animate-ping');
    });
    audio.addEventListener('timeupdate', () =>
      setCurrentTime(convertSecondsToHHMMSS(audio.currentTime))
    );
    audio.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.removeEventListener('loadedmetadata', () => setDuration(''));
      audio.removeEventListener('timeupdate', () => setCurrentTime(''));
      audio.removeEventListener('ended', () => setPlaying(false));
      audio.removeEventListener('play', () =>
        console.log('Play event removed')
      );
      audio.removeEventListener('pause', () =>
        console.log('Pause event removed')
      );
    };
  }, [audio, currentTime, duration]);

  return [audio, playing, muted, toggle, muteToggle, currentTime, duration];
};

export default useAudio;
