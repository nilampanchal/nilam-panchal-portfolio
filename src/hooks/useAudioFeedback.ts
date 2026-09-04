import { useState, useEffect, useCallback } from 'react';
import {
  isAudioEnabled,
  setAudioEnabled,
  playHoverTick,
  playClickSound,
  playCopySuccessSound,
} from '../utils/audioFeedback';

export function useAudioFeedback() {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => isAudioEnabled());

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSoundEnabledState(customEvent.detail);
    };

    window.addEventListener('portfolio_sound_toggle', handleToggle);
    return () => {
      window.removeEventListener('portfolio_sound_toggle', handleToggle);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setAudioEnabled(next);
    if (next) {
      playClickSound();
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playHover: playHoverTick,
    playClick: playClickSound,
    playCopySuccess: playCopySuccessSound,
  };
}
