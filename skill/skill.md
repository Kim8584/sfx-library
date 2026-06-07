---
name: sfx-library-usage
description: Guide for using the centralized audio API (`soundeffex-project`) for programmatic audio synthesis in Remotion. Includes best practices for render-stable audio.
metadata:
  tags: remotion, audio, synthesis, sfx, library, render-stable
---

# SFX Library Usage Guide

Use this skill when tasked with generating procedural audio effects for Remotion compositions.

## Library Source
The sound library source code is hosted on GitHub. Reference the source here:
- **Repository:** [github.com/Kim8584/sfx-library](https://github.com/Kim8584/sfx-library)

## Centralized Audio API (Best Practices)

To avoid module resolution errors and fragile import paths, **always import from the centralized library entry point**.

### The Barrel Import Pattern
Do not import from nested file paths. Instead, import everything from the main package name:

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

## Core Principles for Render-Stable Audio

1.  **Always use `Sequence` for SFX**: Do not trigger `GeneratedAudio` based solely on conditional rendering (e.g., `{frame === X && <GeneratedAudio />}`). 
    *   *Why:* Synthesis requires buffer initialization. Wrapping the audio component in a `<Sequence>` ensures the Remotion renderer properly anticipates the audio requirement.
2.  **Explicit Duration**: Always define an explicit `durationInFrames` for your SFX sequences.
3.  **Stable Generators**: Define your buffer generation logic stably to prevent unnecessary re-synthesis during renders.

## Recommended Usage Pattern

```tsx
import { Sequence } from 'remotion';
import { GeneratedAudio, createPopSFX } from 'soundeffex-project';

// Use Sequence to define exact timing and duration of the SFX
<Sequence from={triggerFrame} durationInFrames={30}>
  <GeneratedAudio createBuffer={({ sampleRate }) => createPopSFX(sampleRate, 800)} />
</Sequence>
```
