import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { 
  GeneratedAudio, 
  createPopSFX, 
  createGlideSFX, 
  generateDynamicBounceBuffer, 
  generateDynamicPopperBuffer, 
  generateCartoonStretchBuffer, 
  generateSlashingAudioBuffer, 
  generateFlippingAudioBuffer, 
  generateBoingSFXBuffer, 
  generateWhistlePopBuffer, 
  generateZippingBuffer, 
  generateLaserBlipBuffer,
  generateUFOHoverBuffer,
  generateSpringJumpBuffer,
  generateDropOffBuffer,
  generateLaserBubbleBuffer
} from "./lib";

const EffectDisplay = ({ label }: { label: string }) => (
  <div style={{
    display: "flex", justifyContent: "center", alignItems: "center", flex: 1,
    fontFamily: "sans-serif", fontSize: "3rem", color: "#4a3a3a"
  }}>
    {label}
  </div>
);

export const MyComposition = () => {
  const { fps } = useVideoConfig();
  const effects = [
    { label: "Pop", buffer: ({ sampleRate }: any) => createPopSFX(sampleRate) },
    { label: "Glide", buffer: ({ sampleRate }: any) => createGlideSFX(sampleRate) },
    { label: "Bounce", buffer: ({ sampleRate }: any) => generateDynamicBounceBuffer({ sampleRate, text: "Bounce", mode: 'letters', speed: 'quick' }) },
    { label: "Popper", buffer: ({ sampleRate }: any) => generateDynamicPopperBuffer({ sampleRate, count: 5, speed: 'quick', basePitch: 400 }) },
    { label: "Cartoon Stretch", buffer: ({ sampleRate }: any) => generateCartoonStretchBuffer(sampleRate) },
    { label: "Slashing", buffer: ({ sampleRate }: any) => generateSlashingAudioBuffer(sampleRate) },
    { label: "Flipping", buffer: ({ sampleRate }: any) => generateFlippingAudioBuffer(sampleRate) },
    { label: "Boing", buffer: ({ sampleRate }: any) => generateBoingSFXBuffer(sampleRate) },
    { label: "Whistle Pop", buffer: ({ sampleRate }: any) => generateWhistlePopBuffer(sampleRate) },
    { label: "Zipping", buffer: ({ sampleRate }: any) => generateZippingBuffer(sampleRate) },
    { label: "Laser Blip", buffer: ({ sampleRate }: any) => generateLaserBlipBuffer(sampleRate) },
    { label: "UFO Hover", buffer: ({ sampleRate }: any) => generateUFOHoverBuffer(sampleRate) },
    { label: "Spring Jump", buffer: ({ sampleRate }: any) => generateSpringJumpBuffer(sampleRate) },
    { label: "Drop Off", buffer: ({ sampleRate }: any) => generateDropOffBuffer(sampleRate) },
    { label: "Laser Bubble", buffer: ({ sampleRate }: any) => generateLaserBubbleBuffer(sampleRate) },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#fdf1f2" }}>
      {effects.map((effect, i) => (
        <Sequence key={effect.label} from={i * 3 * fps} durationInFrames={3 * fps}>
          <EffectDisplay label={effect.label} />
          <GeneratedAudio createBuffer={effect.buffer} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
