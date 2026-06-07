# soundeffex-project: Procedural SFX Synthesis Library

A standalone procedural audio synthesis library for generating render-stable sound effects. While built with Remotion compatibility in mind to ensure high-fidelity, synchronous audio in video projects, this library can be used to generate audio buffers for any Web Audio API context.

## Centralized Audio API (Best Practices)

To avoid module resolution errors and fragile import paths, **always import from the centralized library entry point**.

### The Barrel Import Pattern
Do not import from nested file paths (e.g., `soundeffex-project/src/lib/sfx/...`). Instead, import everything from the main package name:

```tsx
// DO THIS
import { GeneratedAudio } from 'soundeffex-project';
import { createPopSFX, generateSpringJumpBuffer } from 'soundeffex-project';
```

## Available Effects (Categorized by Character)

All effects are available via the main import:

### Cartoonish & Playful
Use these for lighthearted, bounce, or comic actions.
- `generateWhistlePopBuffer`: A playful whistle slide-up ending in a bubble pop.
- `generateBoingSFXBuffer`: A comic, springy squash-and-stretch boing.
- `generateDropOffBuffer`: A comic downward "falling whistle" slide.
- `generateSpringJumpBuffer`: A retro arcade spring bounce.
- `generateCartoonStretchBuffer`: A rubbery, wobbling stretch effect.

### Groovy & Electronic
Use these for rhythmic, sci-fi, or LFO-driven motion.
- `generateUFOHoverBuffer`: An electronic, rubbery hover with LFO vibrato.
- `generateDynamicBounceBuffer`: Procedural sequence generation for text/motion.
- `generateDynamicPopperBuffer`: Cascading sequence of percussive pops.

### Sci-Fi & Arcade
Use these for high-tech, digital, or retro-game interfaces.
- `generateLaserBlipBuffer`: A bright, retro-arcade laser blip.
- `generateLaserBubbleBuffer`: Microscopic laser snap/pop.
- `generateZippingBuffer`: A sharp, high-velocity friction "zip".

### Tactile, Impact, & Interaction
Use these for UI feedback, UI flips, or object impacts.
- `createPopSFX`: A quick frequency-sliding snap.
- `createGlideSFX`: A smooth pitch-shifted transition.
- `generateSlashingAudioBuffer`: A sharp, filtered-noise whoosh for high-velocity cuts.
- `generateFlippingAudioBuffer`: A tactile, premium-feel rotation sound.

## Usage with Remotion

1.  **Always use `Sequence` for SFX**: Do not trigger `GeneratedAudio` based solely on conditional rendering (e.g., `{frame === X && <GeneratedAudio />}`). 
    *   *Why:* Synthesis requires buffer initialization. Wrapping the audio component in a `<Sequence>` ensures the Remotion renderer properly anticipates the audio requirement.
2.  **Explicit Duration**: Always define an explicit `durationInFrames` for your SFX sequences.
3.  **Stable Generators**: Define your buffer generation logic stably to prevent unnecessary re-synthesis during renders.

### Recommended Usage Pattern

```tsx
import { Sequence } from 'remotion';
import { GeneratedAudio, createPopSFX } from 'soundeffex-project';

// Use Sequence to define exact timing and duration of the SFX
<Sequence from={triggerFrame} durationInFrames={30}>
  <GeneratedAudio createBuffer={({ sampleRate }) => createPopSFX(sampleRate, 800)} />
</Sequence>
```

## Commands

**Install Dependencies**
```console
npm i
```

**Upgrade Library**
```console
npx remotion upgrade
```
