import { useEffect, useState, useMemo } from 'react';
import { Audio, delayRender, continueRender } from 'remotion';
import { audioBufferToDataUrl } from '@remotion/media-utils';

export const GeneratedAudio: React.FC<{
  createBuffer: (params: { sampleRate: number }) => AudioBuffer;
}> = ({ createBuffer }) => {
  const [handle] = useState(() => delayRender('Generating audio...'));
  const [url, setUrl] = useState<string | null>(null);

  // Memoize the generation so it doesn't re-run unless the generator changes
  const generator = useMemo(() => createBuffer, [createBuffer]);

  useEffect(() => {
    let active = true;
    const generate = async () => {
      const sampleRate = 44100;
      const buffer = generator({ sampleRate });
      const dataUrl = audioBufferToDataUrl(buffer);
      if (active) {
        setUrl(dataUrl);
        continueRender(handle);
      }
    };
    generate();
    return () => { active = false; };
  }, [generator, handle]);

  return url ? <Audio src={url} /> : null;
};
