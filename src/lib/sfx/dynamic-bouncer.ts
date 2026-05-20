interface BounceSFXConfig {
  sampleRate: number;
  mode: 'letters' | 'words';
  text: string;
  speed: 'quick' | 'relaxed';
}

export const generateDynamicBounceBuffer = ({
  sampleRate,
  mode,
  text,
  speed,
}: BounceSFXConfig): AudioBuffer => {
  // 1. Determine the number of audio elements to generate
  const items = mode === 'letters' ? text.replace(/\s/g, '').split('') : text.split(' ');
  const itemCount = items.length;

  // 2. Calculate timing based on speed preferences (in seconds)
  // Quick succession = 0.06s gap between sounds. Relaxed = 0.3s gap.
  const stepDelay = speed === 'quick' ? 0.06 : 0.3;
  const soundDuration = 0.08; // Length of an individual pop sound
  
  const totalDuration = (itemCount - 1) * stepDelay + soundDuration;
  const numSamples = Math.floor(sampleRate * totalDuration);

  // 3. Initialize the Web Audio context and official AudioBuffer
  // Note: OfflineAudioContext is globally available in the browser/Node environment Remotion runs in.
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // 4. Synthesize the sequence of pops into the timeline channel
  for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
    const startOffsetTime = itemIndex * stepDelay;
    const startSampleIndex = Math.floor(startOffsetTime * sampleRate);
    const individualSoundSamples = Math.floor(soundDuration * sampleRate);

    // Adjust tone properties based on speed and character length
    // Letters use crisp, high pitches. Words use deep, structural tones.
    const basePitch = mode === 'letters' ? 700 : 350;
    // Add a slight ascending pitch shift per item so the sequence scales up musically
    const targetPitch = basePitch + (itemIndex * 30);

    for (let i = 0; i < individualSoundSamples; i++) {
      const globalSampleIndex = startSampleIndex + i;
      if (globalSampleIndex >= numSamples) break; // Array safety boundary

      const t = i / sampleRate; // Time elapsed inside this specific pop

      // Fast sliding pitch frequency envelope
      const currentFreq = targetPitch * Math.pow(150 / targetPitch, t / soundDuration);
      
      // Generate a neat, organic triangle wave snapshot
      const wave = Math.abs(((t * currentFreq) % 1) - 0.5) * 4 - 1;
      
      // Fast exponential decay volume envelope
      const volumeEnvelope = Math.exp(-t * 65);

      // Mix the synthesized wave value cleanly into the master track
      channelData[globalSampleIndex] += wave * 0.15 * volumeEnvelope;
    }
  }

  return audioBuffer;
};
