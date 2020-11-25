import { useSelector } from 'react-redux';

function useIsPlaying(type, id) {
  const { song, isPlaying } = useSelector(({ track }) => track);

  const isPlayingSong = isPlaying && song?.from?.type === type && song?.from?.id === id;

  return isPlayingSong;
}

export default useIsPlaying;
