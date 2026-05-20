export const generateCartoonStretchBuffer = (
  sampleRate: number, 
  duration = 0.5 // A half-second stretch gives that perfect cartoon feel
): AudioBuffer => {
  const numSamples = Math.floor(sampleRate * duration);

  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const audioBuffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Core pitch parameters
  const startFreq = 180;  // Starts loose and deep
  const endFreq = 650;    // Ends tight, high, and tense

  // Wobble (Vibrato) parameters
  const wobbleSpeed = 25; // How fast it shakes back and forth (Hz)
  const wobbleDepth = 40; // How extreme the pitch shake is

  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // 1. Calculate the base sliding pitch (exponential glide)
    const baseFreq = startFreq * Math.pow(endFreq / startFreq, progress);

    // 2. Add the cartoon wobble using Math.sin (The Vibrato Effect)
    // The wobble gets slightly tighter and faster as the stretch reaches maximum tension
    const dynamicWobbleSpeed = wobbleSpeed + (progress * 10); 
    const pitchWobble = Math.sin(2 * Math.PI * t * dynamicWobbleSpeed) * wobbleDepth;
    
    const finalFreq = baseFreq + pitchWobble;

    // 3. Keep track of the phase smoothly to prevent harsh digital clicks
    phase += (2 * Math.PI * finalFreq) / sampleRate;

    // 4. Generate a warm triangle wave for that classic retro cartoon texture
    // A triangle wave has a soft, hollow "boing" tone to it.
    const rawWave = Math.abs((phase % (2 * Math.PI)) / Math.PI - 1) * 2 - 1;

    // 5. Volume Envelope: 
    // Soft swell at the very beginning, steady sustain, and a quick fade at the end
    let volume = 0.2;
    if (progress < 0.1) {
      volume = 0.2 * (progress / 0.1); // Smooth attack ramp up
    } else if (progress > 0.8) {
      volume = 0.2 * ((1 - progress) / 0.2); // Fade out smoothly at the end
    }

    channelData[i] = rawWave * volume;
  }

  return audioBuffer;
};
