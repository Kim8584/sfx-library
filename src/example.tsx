import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, Sequence, interpolate, Img, staticFile } from "remotion";
import { 
  GeneratedAudio, 
  generateDynamicPopperBuffer, 
  generateWhistlePopBuffer, 
  createGlideSFX, 
  generateBoingSFXBuffer, 
  generateZippingBuffer, 
  generateLaserBlipBuffer 
} from "./lib";

const Letter = ({ char, index }: { char: string; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 5; 
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        fontSize: "8rem",
        fontWeight: "bold",
        color: "#4a3a3a",
        transform: `scale(${scale})`,
        display: "inline-block",
      }}
    >
      {char}
    </div>
  );
};

const SickImage = () => {
  return (
    <Img
      src={staticFile("pics/sick.jpeg")}
      style={{
        width: 400,
        height: 400,
        backgroundColor: "red", // Debug: see if the element itself appears
      }}
    />
  );
};

const AnimatedText = ({ text, startFrame }: { text: string; startFrame: number }) => {
  const words = text.split(" ");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "row", fontSize: "3rem", fontWeight: "bold", color: "#4a3a3a" }}>
      {words.map((word, i) => {
        const delay = startFrame + i * 15;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ opacity, marginLeft: 10 }}>
            {word}
          </div>
        );
      })}
    </div>
  );
};

export const ExampleComposition = () => {
  const text = "mishel";
  const letters = text.split("");
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const moveUp = spring({
    frame: frame - 2 * fps,
    fps,
    config: { stiffness: 100 },
  });

  const exitScale = spring({
    frame: frame - Math.floor(6.4 * fps),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const top = interpolate(moveUp, [0, 1], [height / 2 - 100, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#fdf1f2" }}>
      <AbsoluteFill style={{ transform: `scale(${1 - exitScale})` }}>
        <AbsoluteFill style={{ 
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "row",
          top: top - (height / 2 - 100)
        }}>
          {letters.map((char, index) => (
            <Letter key={index} char={char} index={index} />
          ))}
        </AbsoluteFill>

        {/* Trigger Image at 3s */}
        {frame >= 3 * fps && (
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", marginLeft: -296, marginTop: 96 }}>
            <Img src={staticFile("pics/sick.jpeg")} style={{ width: 400, height: 400, borderRadius: "20px" }} />
            {/* Text reveal to the right of the image at 4.23s */}
            <div style={{ marginLeft: 834, marginTop: -350 }}>
              <AnimatedText text="Get well soon" startFrame={Math.floor(4.23 * fps)} />
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>

      {/* Audio Sequences (keep outside the scaling container) */}
      <Sequence from={0} durationInFrames={fps}>
        <GeneratedAudio createBuffer={({ sampleRate }) => generateDynamicPopperBuffer({ sampleRate, count: text.length, speed: 'quick', basePitch: 400 })} />
      </Sequence>

      <Sequence from={2 * fps} durationInFrames={fps}>
        <GeneratedAudio createBuffer={({ sampleRate }) => generateWhistlePopBuffer(sampleRate, 0.4)} />
      </Sequence>

      <Sequence from={3 * fps} durationInFrames={fps}>
        <GeneratedAudio createBuffer={({ sampleRate }) => createGlideSFX(sampleRate, 300, 600)} />
      </Sequence>

      <Sequence from={Math.floor(4.23 * fps)} durationInFrames={fps}>
        <GeneratedAudio createBuffer={({ sampleRate }) => generateBoingSFXBuffer(sampleRate)} />
      </Sequence>
      
      <Sequence from={Math.floor(6.4 * fps)} durationInFrames={fps}>
        <GeneratedAudio createBuffer={({ sampleRate }) => generateLaserBlipBuffer(sampleRate)} />
      </Sequence>
    </AbsoluteFill>
  );
};
