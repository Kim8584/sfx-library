interface PopperSFXConfig {
  sampleRate: number;
  count: number; // Number of pops
  speed: 'quick' | 'relaxed'; // Gap duration
  basePitch: number; // Starting pitch for the first pop
}

export const generateDynamicPopperBuffer = ({
  sampleRate,
  count,
  speed,
  basePitch = 600,
}: PopperSFXConfig): AudioBuffer => {
  const stepDelay = speed === 'quick' ? 0.05 : 0.2;
  const soundDuration = 0.08;
  const totalDuration = (count - 1) * stepDelay + soundDuration;
  const numSamples = Math.floor(sampleRate * totalDuration);

  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  for (let itemIndex = 0; itemIndex < count; itemIndex++) {
    const startOffsetTime = itemIndex * stepDelay;
    const startSampleIndex = Math.floor(startOffsetTime * sampleRate);
    const individualSoundSamples = Math.floor(soundDuration * sampleRate);

    // Each subsequent pop gets slightly higher in pitch to create a cascading effect
    const targetPitch = basePitch + (itemIndex * 50);

    for (let i = 0; i < individualSoundSamples; i++) {
      const globalSampleIndex = startSampleIndex + i;
      if (globalSampleIndex >= numSamples) break;

      const t = i / sampleRate;
      
      // Pitch Slide
      const freq = targetPitch * Math.pow(150 / targetPitch, t / soundDuration);
      
      // Tone: Sine wave with fast exponential decay
      const wave = Math.sin(2 * Math.PI * t * freq);
      const volumeEnvelope = Math.exp(-t * 60);

      channelData[globalSampleIndex] += wave * 0.2 * volumeEnvelope;
    }
  }

  return audioBuffer;
};
