import { AbsoluteFill, Sequence } from "remotion";
import { GeneratedAudio, generateDynamicBounceBuffer } from "./lib";

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#fdf1f2" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          fontFamily: "sans-serif",
          fontSize: "4rem",
          color: "#4a3a3a",
        }}
      >
        Sound Effects Lab
      </div>

      {/* Scenario 1: Quick "Good" snaps */}
      <Sequence from={15}>
        <GeneratedAudio
          createBuffer={({ sampleRate }) =>
            generateDynamicBounceBuffer({
              sampleRate,
              text: "Good",
              mode: 'letters',
              speed: 'quick',
            })
          }
        />
      </Sequence>

      {/* Scenario 2: Relaxed "Multi scaler Multiplication" word thuds */}
      <Sequence from={70}>
        <GeneratedAudio
          createBuffer={({ sampleRate }) =>
            generateDynamicBounceBuffer({
              sampleRate,
              text: "Multi scaler Multiplication",
              mode: 'words',
              speed: 'relaxed',
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};
