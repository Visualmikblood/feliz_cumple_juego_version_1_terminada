# TODO: Dividir código de App.jsx en dos archivos

## Pasos a completar:
- [ ] Crear componente PointsGame.jsx con la lógica del juego de puntos
- [ ] Crear componente RatingGame.jsx con la lógica del juego de calificaciones
- [ ] Modificar App.jsx para importar y usar los nuevos componentes
- [ ] Asegurar que el estado compartido se maneje correctamente
- [ ] Verificar que el resultado final sea idéntico al original
- [ ] Probar ambos juegos para confirmar funcionalidad

## Estado compartido a manejar:
- friends (lista de amigos)
- clickedBalls (bolitas clickeadas)
- showMessage (modal de mensaje)
- selectedFriend (amigo seleccionado)
- musicEnabled (música activada)
- confetti (efectos de confeti)
- specialEffects (efectos especiales)
- showCelebration (celebración final)
- isSpeaking (síntesis de voz)
- audioRef (referencia al audio)
- utteranceRef (referencia a la síntesis)

## Funciones compartidas:
- generateConfetti
- generateSpecialEffect
- toggleSpeech
- shareMessage
- resetGame
- handleBallClick (adaptar para cada modo)
