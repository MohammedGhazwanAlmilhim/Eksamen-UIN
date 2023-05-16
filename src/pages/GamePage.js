import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameProfile from '../components/GameProfile';

const GamePage = () => {
  const { slug } = useParams();

  const [game, setGame] = useState('');

  const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

  useEffect(() => {
    const getGame = async () => {
      const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}&lang=en`);
      const data = await response.json();
      setGame(data);
    };

    getGame();
  }, [slug]);

  return <GameProfile game={game} />;
};

export default GamePage;
