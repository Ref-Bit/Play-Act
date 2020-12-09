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
    audio.addEventListener('loadedmetadata', () =>
      setDuration(convertSecondsToHHMMSS(audio.duration))
    );

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(convertSecondsToHHMMSS(audio.currentTime));
    });
    audio.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.removeEventListener('loadedmetadata', () => setDuration(''));
      audio.removeEventListener('timeupdate', () => setCurrentTime(''));
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio, currentTime, duration]);

  return [audio, playing, muted, toggle, muteToggle, currentTime, duration];
};

export default useAudio;
