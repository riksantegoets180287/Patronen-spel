
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSound = (type: 'correct' | 'wrong' | 'click' | 'roll') => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case 'correct':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;
    case 'wrong':
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, now); // A3
      oscillator.frequency.linearRampToValueAtTime(110, now + 0.2); // A2
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;
    case 'click':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
      break;
    case 'roll':
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.linearRampToValueAtTime(300, now + 0.1);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.1);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
      break;
  }
};
