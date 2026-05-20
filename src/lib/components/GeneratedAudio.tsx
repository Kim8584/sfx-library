import { useEffect, useState } from 'react';
import { Audio, delayRender, continueRender } from 'remotion';
import { audioBufferToDataUrl } from '@remotion/media-utils';

export const GeneratedAudio: React.FC<{
  createBuffer: (params: { sampleRate: number }) => AudioBuffer;
}> = ({ createBuffer }) => {
  const [handle] = useState(() => delayRender('Generating audio...'));
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const generate = async () => {
      const sampleRate = 44100;
      const buffer = createBuffer({ sampleRate });
      const dataUrl = audioBufferToDataUrl(buffer);
      setUrl(dataUrl);
      continueRender(handle);
    };
    generate();
  }, [createBuffer, handle]);

  return url ? <Audio src={url} /> : null;
};
