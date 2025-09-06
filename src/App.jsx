import React, { useState, useEffect, useRef } from 'react';
import { Gift, Heart, Star, Sparkles, PartyPopper, Cake, Volume2, VolumeX, RotateCcw, Share, Trophy, Zap, ThumbsDown, GamepadIcon, Target, Award } from 'lucide-react';
import PointsGame from './PointsGame';
import RatingGame from './RatingGame';

const BirthdayGame = () => {
  const [gameMode, setGameMode] = useState(null); // 'points' or 'rating'
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [clickedBalls, setClickedBalls] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [ballAnimations, setBallAnimations] = useState({});
  const [magicMode, setMagicMode] = useState(false);
  const [collectedStars, setCollectedStars] = useState(0);
  const [collectedCurses, setCollectedCurses] = useState(0);
  const [specialEffects, setSpecialEffects] = useState([]);
  const [ballEffects, setBallEffects] = useState({}); // Track persistent effects per ball
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ballPoints, setBallPoints] = useState({});
  const [friendRatings, setFriendRatings] = useState({});
  const [currentRating, setCurrentRating] = useState(50);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  // Function to handle speech synthesis
  const toggleSpeech = (text) => {
    if (!window.speechSynthesis) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (audioRef.current) audioRef.current.volume = 1;
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
        setIsSpeaking(true);
        if (audioRef.current) audioRef.current.volume = 0.1;
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        if (audioRef.current) audioRef.current.volume = 1;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (audioRef.current) audioRef.current.volume = 1;
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speech and restore volume when modal closes
  useEffect(() => {
    if (!showMessage && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (audioRef.current) audioRef.current.volume = 1;
    }
  }, [showMessage]);

  const friends = [
    {
      id: 1,
      name: "María",
      color: "bg-pink-400",
      message: "¡Feliz cumpleaños! Eres una persona increíble y estoy muy agradecida de tenerte en mi vida. Que este nuevo año te traiga muchas aventuras y momentos felices. ¡Te quiero mucho! 🎉💕",
      icon: Heart,
      photo: "/photos/maria.jpg"
    },
    {
      id: 2,
      name: "Carlos",
      color: "bg-blue-400",
      message: "¡Hey cumpleañero/a! Espero que tengas un día fantástico lleno de risas y buena comida. Gracias por ser un amigo tan genial y por todos los buenos momentos que hemos compartido. ¡A celebrar! 🎂🎈",
      icon: Gift,
      photo: "/photos/carlos.jpg"
    },
    {
      id: 3,
      name: "Ana",
      color: "bg-green-400",
      message: "¡Felicidades en tu día especial! Eres una de las personas más divertidas que conozco. Que cumplas muchos más años llenos de salud, amor y éxito. ¡Disfruta tu día al máximo! ✨🌟",
      icon: Star,
      photo: "/photos/ana.jpg"
    },
    {
      id: 4,
      name: "Pedro",
      color: "bg-yellow-400",
      message: "¡Cumpleaños feliz! Me alegra mucho poder celebrar contigo otro año de vida. Eres una persona especial que siempre sabe cómo hacer sonreír a los demás. ¡Que tengas un día maravilloso! 🎊🎁",
      icon: PartyPopper,
      photo: "/photos/pedro.jpg"
    },
    {
      id: 5,
      name: "Laura",
      color: "bg-purple-400",
      message: "¡Feliz cumple! Gracias por ser tan buena persona y por todos los momentos increíbles que hemos vivido juntos. Espero que este nuevo año de vida esté lleno de nuevas oportunidades y mucha felicidad. 💜🎯",
      icon: Sparkles,
      photo: "/photos/laura.jpg"
    },
    {
      id: 6,
      name: "Diego",
      color: "bg-red-400",
      message: "¡Qué tengas un cumpleaños espectacular! Eres una persona única y especial. Que este año te traiga todo lo que deseas y más. ¡Vamos a celebrar como se debe! 🔥🎸",
      icon: Cake,
      photo: "/photos/diego.jpg"
    },
    {
      id: 7,
      name: "Sofia",
      color: "bg-indigo-400",
      message: "¡Feliz cumpleaños querido/a! Tu amistad significa mucho para mí. Eres alguien en quien siempre puedo confiar. Que tengas un año lleno de bendiciones y momentos hermosos. 💙🦋",
      icon: Heart,
      photo: "/photos/sofia.jpg"
    },
    {
      id: 8,
      name: "Miguel",
      color: "bg-orange-400",
      message: "¡Cumpleaños feliz! Espero que tu día esté lleno de sorpresas maravillosas. Gracias por ser un amigo tan leal y divertido. ¡Que celebres muchos cumpleaños más! 🧡🎭",
      icon: Gift,
      photo: "/photos/miguel.jpg"
    },
    {
      id: 9,
      name: "Carmen",
      color: "bg-teal-400",
      message: "¡Feliz cumple! Eres una persona extraordinaria con un corazón enorme. Me siento afortunada de conocerte. Que este nuevo año de vida esté lleno de amor, risas y aventuras. 💚🌺",
      icon: Star,
      photo: "/photos/carmen.jpg"
    },
    {
      id: 10,
      name: "Javier",
      color: "bg-cyan-400",
      message: "¡Felicidades! Otro año más de vida para celebrar todo lo increíble que eres. Gracias por ser un amigo tan genial y por todos los buenos ratos. ¡A disfrutar este día especial! 🎨🎪",
      icon: PartyPopper,
      photo: "/photos/javier.jpg"
    },
    {
      id: 11,
      name: "Isabel",
      color: "bg-rose-400",
      message: "¡Feliz cumpleaños! Eres una persona muy especial que siempre ilumina el día de los demás. Que este nuevo año te traiga mucha paz, amor y todas las cosas buenas que mereces. 🌸✨",
      icon: Sparkles,
      photo: "/photos/isabel.jpg"
    }
  ];

  // Generate random points when game starts
  const generateRandomPoints = () => {
    const points = {};
    friends.forEach(friend => {
      const randomPoints = Math.floor(Math.random() * 201) - 100; // -100 to 100
      points[friend.id] = randomPoints;
    });
    setBallPoints(points);
  };

  const generateConfetti = (amount = 40) => {
    const newConfetti = [];
    for (let i = 0; i < amount; i++) {
      newConfetti.push({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['text-pink-400', 'text-blue-400', 'text-yellow-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 5)],
        symbol: ['✨', '🎉', '🎊', '⭐', '💖', '🎈'][Math.floor(Math.random() * 6)]
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  const generateSpecialEffect = (type, x, y) => {
    const effect = {
      id: Math.random(),
      type,
      x,
      y,
      timestamp: Date.now()
    };
    setSpecialEffects(prev => [...prev, effect]);
    setTimeout(() => {
      setSpecialEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 2000);
  };

  const handleBallClick = (friend, event) => {
    if (!gameStarted) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setSelectedFriend(friend);
    setClickedBalls(prev => new Set([...prev, friend.id]));

    if (gameMode === 'points') {
      const points = ballPoints[friend.id];
      setScore(prev => prev + points);

      // Check if this ball already has an effect assigned
      if (!ballEffects[friend.id]) {
        const random = Math.random();
        let effect = null;

        if (random < 0.3) { // 30% chance for star bonus
          effect = 'star';
          setCollectedStars(prev => prev + 1);
          setScore(prev => prev + 50); // Bonus points
        } else if (random < 0.5) { // 20% chance for curse penalty (30% - 50% range)
          effect = 'curse';
          setCollectedCurses(prev => prev + 1);
          setScore(prev => prev - 30); // Penalty points
        }

        // Store the effect for this ball (persistent)
        setBallEffects(prev => ({
          ...prev,
          [friend.id]: effect
        }));

        // Generate visual effect if there was one
        if (effect) {
          generateSpecialEffect(effect, x, y);
        }
      } else {
        // If ball already has an effect, just show the visual effect again
        if (ballEffects[friend.id]) {
          generateSpecialEffect(ballEffects[friend.id], x, y);
        }
      }
    }

    // Ball animation
    setBallAnimations(prev => ({
      ...prev,
      [friend.id]: 'animate-spin'
    }));

    // Show message after animation
    setTimeout(() => {
      setShowMessage(true);
      setBallAnimations(prev => ({
        ...prev,
        [friend.id]: ''
      }));
    }, 1000);

    generateConfetti(50);
    generateSpecialEffect('celebration', x, y);

    if (Math.random() < 0.3) {
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 3000);
    }
  };

  const handleRatingSubmit = () => {
    setFriendRatings(prev => ({
      ...prev,
      [selectedFriend.id]: currentRating
    }));
    setShowRatingModal(false);
    setShowMessage(false);
    setCurrentRating(50);
  };

  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    if (mode === 'points') {
      generateRandomPoints();
    }
    generateConfetti(80);
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetGame = () => {
    setGameMode(null);
    setClickedBalls(new Set());
    setGameStarted(false);
    setShowMessage(false);
    setSelectedFriend(null);
    setScore(0);
    setCollectedStars(0);
    setCollectedCurses(0);
    setMagicMode(false);
    setBallAnimations({});
    setSpecialEffects([]);
    setShowCelebration(false);
    setBallPoints({});
    setBallEffects({}); // Reset ball effects
    setFriendRatings({});
    setShowRatingModal(false);
    setCurrentRating(50);
  };

  const shareMessage = () => {
    let message = '';
    if (gameMode === 'points') {
      const result = score >= 0 ? 'gané' : 'perdí';
      message = `¡Acabo de ${result} en el juego de cumpleaños! 🎉 Obtuve ${score} puntos, ${collectedStars} estrellas bonus y ${collectedCurses} maldiciones. #FelizCumpleanos`;
    } else {
      const avgRating = Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length;
      message = `¡Califiqué todas las felicitaciones de cumpleaños! 🎉 Promedio: ${avgRating.toFixed(1)}/100. #FelizCumpleanos`;
    }

    if (navigator.share) {
      navigator.share({ text: message });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      alert('¡Mensaje copiado al portapapeles!');
    } else {
      alert(message);
    }
  };

  const getBestRatedFriend = () => {
    if (Object.keys(friendRatings).length === 0) return null;
    const bestId = Object.keys(friendRatings).reduce((a, b) =>
      friendRatings[a] > friendRatings[b] ? a : b
    );
    return friends.find(f => f.id === parseInt(bestId));
  };

  const getWorstRatedFriend = () => {
    if (Object.keys(friendRatings).length === 0) return null;
    const worstId = Object.keys(friendRatings).reduce((a, b) =>
      friendRatings[a] < friendRatings[b] ? a : b
    );
    return friends.find(f => f.id === parseInt(worstId));
  };

  // Show celebration when all messages are read
  useEffect(() => {
    if (clickedBalls.size === friends.length && !showCelebration) {
      setShowCelebration(true);
      generateConfetti(100);
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 5000);
    }
  }, [clickedBalls.size, showCelebration, friends.length]);

  // Control audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && gameStarted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled, gameStarted]);

  // Game mode selection screen
  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl max-w-4xl w-full">
          <div className="text-center mb-12">
            <Cake className="w-24 h-24 mx-auto mb-6 text-yellow-300 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-4 titulo_feliz_cumple">
              ¡FELIZ CUMPLEAÑOS Miguel! 🎂
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Elige tu tipo de juego favorito para descubrir las felicitaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Points Game */}
            <div className="bg-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-green-300" />
                <h3 className="text-2xl font-bold text-white mb-4">🎯 Juego de Puntos</h3>
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <ul className="text-white/90 space-y-2 text-left">
                    <li>• Descubre puntos aleatorios ocultos</li>
                    <li>• Pueden ser positivos o negativos</li>
                    <li>• Estrellas ⭐ suman puntos bonus</li>
                    <li>• Rayos ⚡ restan puntos</li>
                    <li>• ¡Gana si terminas con puntos positivos!</li>
                  </ul>
                </div>
                <button
                  onClick={() => startGame('points')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <GamepadIcon className="w-5 h-5 inline mr-2" />
                  ¡Jugar con Puntos!
                </button>
              </div>
            </div>

            {/* Rating Game */}
            <div className="bg-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold text-white mb-4">⭐ Juego de Calificaciones</h3>
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <ul className="text-white/90 space-y-2 text-left">
                    <li>• Califica cada felicitación del 1-100</li>
                    <li>• Usa el deslizador para puntuar</li>
                    <li>• Descubre quién te felicitó mejor</li>
                    <li>• Ve el ranking final de amigos</li>
                    <li>• ¡Comparte tu promedio de calificaciones!</li>
                  </ul>
                </div>
                <button
                  onClick={() => startGame('rating')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="w-5 h-5 inline mr-2" />
                  ¡Jugar Calificando!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) return null;

  // Render the appropriate game component based on gameMode
  if (gameMode === 'points') {
    return (
      <PointsGame
        friends={friends}
        clickedBalls={clickedBalls}
        setClickedBalls={setClickedBalls}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        confetti={confetti}
        setConfetti={setConfetti}
        specialEffects={specialEffects}
        setSpecialEffects={setSpecialEffects}
        showCelebration={showCelebration}
        setShowCelebration={setShowCelebration}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        audioRef={audioRef}
        utteranceRef={utteranceRef}
        score={score}
        setScore={setScore}
        collectedStars={collectedStars}
        setCollectedStars={setCollectedStars}
        collectedCurses={collectedCurses}
        setCollectedCurses={setCollectedCurses}
        ballPoints={ballPoints}
        setBallPoints={setBallPoints}
        ballEffects={ballEffects}
        setBallEffects={setBallEffects}
        ballAnimations={ballAnimations}
        setBallAnimations={setBallAnimations}
        magicMode={magicMode}
        setMagicMode={setMagicMode}
        generateConfetti={generateConfetti}
        generateSpecialEffect={generateSpecialEffect}
        toggleSpeech={toggleSpeech}
        shareMessage={shareMessage}
        resetGame={resetGame}
        handleBallClick={handleBallClick}
      />
    );
  }

  if (gameMode === 'rating') {
    return (
      <RatingGame
        friends={friends}
        clickedBalls={clickedBalls}
        setClickedBalls={setClickedBalls}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        confetti={confetti}
        setConfetti={setConfetti}
        specialEffects={specialEffects}
        setSpecialEffects={setSpecialEffects}
        showCelebration={showCelebration}
        setShowCelebration={setShowCelebration}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        audioRef={audioRef}
        utteranceRef={utteranceRef}
        friendRatings={friendRatings}
        setFriendRatings={setFriendRatings}
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
        showRatingModal={showRatingModal}
        setShowRatingModal={setShowRatingModal}
        ballAnimations={ballAnimations}
        setBallAnimations={setBallAnimations}
        magicMode={magicMode}
        setMagicMode={setMagicMode}
        generateConfetti={generateConfetti}
        generateSpecialEffect={generateSpecialEffect}
        toggleSpeech={toggleSpeech}
        shareMessage={shareMessage}
        resetGame={resetGame}
        handleBallClick={handleBallClick}
        handleRatingSubmit={handleRatingSubmit}
        getBestRatedFriend={getBestRatedFriend}
        getWorstRatedFriend={getWorstRatedFriend}
      />
    );
  }

  return null;
};

export default BirthdayGame;
