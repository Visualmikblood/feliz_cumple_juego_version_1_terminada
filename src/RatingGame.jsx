import React, { useEffect, useRef } from 'react';
import { Gift, Heart, Star, Sparkles, PartyPopper, Cake, Volume2, VolumeX, RotateCcw, Share, Trophy, Zap, ThumbsDown, GamepadIcon, Target, Award } from 'lucide-react';

const RatingGame = ({
  friends,
  clickedBalls,
  setClickedBalls,
  showMessage,
  setShowMessage,
  selectedFriend,
  setSelectedFriend,
  musicEnabled,
  setMusicEnabled,
  confetti,
  setConfetti,
  specialEffects,
  setSpecialEffects,
  showCelebration,
  setShowCelebration,
  isSpeaking,
  setIsSpeaking,
  audioRef,
  utteranceRef,
  friendRatings,
  setFriendRatings,
  currentRating,
  setCurrentRating,
  showRatingModal,
  setShowRatingModal,
  ballAnimations,
  setBallAnimations,
  magicMode,
  setMagicMode,
  generateConfetti,
  generateSpecialEffect,
  toggleSpeech,
  shareMessage,
  resetGame,
  handleBallClick
}) => {
  const handleRatingSubmit = () => {
    setFriendRatings(prev => ({
      ...prev,
      [selectedFriend.id]: currentRating
    }));
    setShowRatingModal(false);
    setShowMessage(false);
    setCurrentRating(50);
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
      if (musicEnabled) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 relative overflow-hidden titulo_segunda_pantalla ${magicMode ? 'animate-pulse' : ''}`}>
      {/* Special effects */}
      {specialEffects.map((effect) => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-40"
          style={{ left: effect.x, top: effect.y, transform: 'translate(-50%, -50%)' }}
        >
          {effect.type === 'celebration' && <div className="text-6xl animate-ping">🎉</div>}
          {effect.type === 'star' && <div className="text-4xl animate-spin text-yellow-400">⭐</div>}
          {effect.type === 'curse' && <div className="text-4xl animate-bounce text-red-500">⚡</div>}
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-0 ${piece.color} text-2xl animate-bounce pointer-events-none z-30`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '4s'
          }}
        >
          {piece.symbol}
        </div>
      ))}

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
             ¡FELIZ CUMPLEAÑOS!
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Califica las felicitaciones
          </p>
          <p className="text-lg text-white/80 mb-6">
            Haz clic en las bolitas para descubrir los mensajes
          </p>
        </div>

        {/* Progress panel */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          {/* Stats section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="font-bold text-lg">
                  {Object.keys(friendRatings).length > 0
                    ? `${(Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length).toFixed(1)}/100 promedio`
                    : 'Sin calificaciones aún'
                  }
                </span>
              </div>
              <div className="text-white font-semibold">
                {clickedBalls.size}/11 mensajes leídos
              </div>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <button
              onClick={() => setMusicEnabled(!musicEnabled)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-colors duration-300"
            >
              {musicEnabled ? <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            <button
              onClick={shareMessage}
              className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-colors duration-300"
            >
              <Share className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={resetGame}
              className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-colors duration-300"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all duration-700 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500"
                style={{ width: `${(clickedBalls.size / 11) * 100}%` }}
              >
                {clickedBalls.size > 0 && (
                  <span className="text-white text-xs font-bold">
                    {Math.round((clickedBalls.size / 11) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friends grid */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {friends.map((friend) => {
            const IconComponent = friend.icon;
            const isClicked = clickedBalls.has(friend.id);

            return (
              <div key={friend.id} className="flex flex-col items-center">
                <button
                  onClick={(e) => handleBallClick(friend, e)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl flex items-center justify-center relative ${
                    isClicked ? `animate-bounce ${ballAnimations[friend.id] || ''} ring-4 ring-white/60` : 'hover:animate-pulse'
                  } ${magicMode ? 'animate-pulse ring-4 ring-yellow-300' : ''}`}
                >
                  <img
                    src={friend.photo}
                    alt={friend.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-full h-full ${friend.color} rounded-full flex items-center justify-center ${friend.photo ? 'hidden' : 'flex'}`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {isClicked && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-bounce z-20">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                </button>

                {isClicked && friendRatings[friend.id] && (
                  <div className="relative w-max max-w-full px-1 -mt-4 mx-auto" style={{ zIndex: 10 }}>
                    <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg border border-white/20 text-center">
                      {friendRatings[friend.id]}/100
                    </div>
                  </div>
                )}

                <p className="text-white font-semibold mt-3 text-sm text-center">
                  {friend.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final celebration */}
      {showCelebration && (
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl p-8 shadow-2xl animate-gentle-bounce">
            <div className="flex justify-center gap-4 mb-6">
              <Award className="w-16 h-16 text-white animate-spin" />
              <Cake className="w-16 h-16 text-white animate-pulse" />
              <Award className="w-16 h-16 text-white animate-spin" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¡CALIFICACIONES COMPLETAS! 🏆
            </h2>
            <p className="text-white text-xl mb-6">
              Has calificado todas las felicitaciones de tus amigos
            </p>
            <div className="bg-white/20 rounded-2xl p-6 mb-6">
              <div className="mb-6">
                <p className="text-yellow-200 text-4xl font-bold mb-2">
                  {(Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length).toFixed(1)}/100
                </p>
                <p className="text-white text-lg">Promedio General</p>
              </div>

              {getBestRatedFriend() && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/30 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-2">🏆 Mejor Felicitación</h4>
                    <div className="flex items-center gap-3">
                      <img
                        src={getBestRatedFriend().photo}
                        alt={getBestRatedFriend().name}
                        className="w-12 h-12 object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className={`w-12 h-12 ${getBestRatedFriend().color} rounded-full flex items-center justify-center ${getBestRatedFriend().photo ? 'hidden' : 'flex'}`}>
                        {React.createElement(getBestRatedFriend().icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <p className="text-white font-bold">{getBestRatedFriend().name}</p>
                        <p className="text-green-200">{Math.max(...Object.values(friendRatings))}/100 puntos</p>
                      </div>
                    </div>
                  </div>

                  {getWorstRatedFriend() && getBestRatedFriend().id !== getWorstRatedFriend().id && (
                    <div className="bg-red-500/30 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-2">📉 Necesita Mejorar</h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={getWorstRatedFriend().photo}
                          alt={getWorstRatedFriend().name}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className={`w-12 h-12 ${getWorstRatedFriend().color} rounded-full flex items-center justify-center ${getWorstRatedFriend().photo ? 'hidden' : 'flex'}`}>
                          {React.createElement(getWorstRatedFriend().icon, { className: "w-6 h-6 text-white" })}
                        </div>
                        <div>
                          <p className="text-white font-bold">{getWorstRatedFriend().name}</p>
                          <p className="text-red-200">{Math.min(...Object.values(friendRatings))}/100 puntos</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={shareMessage}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                <Share className="w-5 h-5 inline mr-2" />
                ¡Compartir Resultado!
              </button>
              <button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message modal */}
      {showMessage && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl transform animate-gentle-bounce max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6 flex flex-col items-center relative">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse overflow-hidden relative">
                <img
                  src={selectedFriend.photo}
                  alt={selectedFriend.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={`w-full h-full ${selectedFriend.color} rounded-full flex items-center justify-center ${selectedFriend.photo ? 'hidden' : 'flex'}`}>
                  {React.createElement(selectedFriend.icon, { className: "w-10 h-10 text-white" })}
                </div>
                {/* Speaker button */}
                <button
                  onClick={() => toggleSpeech(selectedFriend.message)}
                  className="absolute bottom-0 right-0 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-lg transition-colors duration-300"
                  aria-label={isSpeaking ? "Detener audio" : "Reproducir audio"}
                >
                  {isSpeaking ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.07" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93a9 9 0 010 14.14" />
                    </svg>
                  )}
                </button>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Mensaje de {selectedFriend.name} 💌
              </h3>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedFriend.message}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowMessage(false);
                  setShowRatingModal(true);
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                ¡Calificar esta Felicitación! ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating modal */}
      {showRatingModal && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl transform animate-gentle-bounce">
            <div className="text-center mb-6">
              <Star className="w-16 h-16 mx-auto mb-4 text-yellow-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Califica la felicitación de {selectedFriend.name}
              </h3>
              <p className="text-gray-600">
                ¿Qué tal te pareció su mensaje?
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Malo</span>
                <div className="text-4xl font-bold text-yellow-500">
                  {currentRating}/100
                </div>
                <span className="text-sm text-gray-500">Excelente</span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={currentRating}
                  onChange={(e) => setCurrentRating(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider smooth-slider"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #f59e0b ${(currentRating - 1) / 99 * 100}%, #10b981 ${(currentRating - 1) / 99 * 100}%)`,
                    transition: 'background 0.1s ease-out'
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRatingSubmit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 mr-4"
              >
                Confirmar Calificación ⭐
              </button>
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setCurrentRating(50);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/Parchís - Cumpleaños feliz (128kbit_AAC).mp4"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 4px solid #eab308;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          transition: all 0.1s ease-out;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 4px solid #eab308;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          transition: all 0.1s ease-out;
        }

        .smooth-slider {
          transition: background 0.15s ease-out;
        }

        .smooth-slider::-webkit-slider-thumb {
          transition: all 0.15s ease-out;
        }

        .smooth-slider::-moz-range-thumb {
          transition: all 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RatingGame;
