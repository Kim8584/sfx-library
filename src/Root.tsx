import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { ExampleComposition } from "./example";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={15 * 3 * 30}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MishelBounce"
        component={ExampleComposition}
        durationInFrames={210}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
