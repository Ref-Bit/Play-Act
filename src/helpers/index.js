export const convertSecondsToHHMMSS = secs =>
  new Date(secs * 1000).toISOString().substr(11, 8);
