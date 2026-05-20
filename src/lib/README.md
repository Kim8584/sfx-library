# Soundeffex Library

A library for programmatic, render-safe audio synthesis in Remotion.

## Components

### `<GeneratedAudio />`
Wraps the audio generation process.

```tsx
<GeneratedAudio createBuffer={({ sampleRate }) => createPopSFX(sampleRate)} />
```

## Sound Effects

### Pop & Glide
- `createPopSFX(sampleRate, pitch)`: A quick frequency-sliding snap.
- `createGlideSFX(sampleRate, start, end)`: A smooth pitch-shifted transition.

### Dynamic Bouncer
- `generateDynamicBounceBuffer(config)`: Procedural sequence generation for text-based animations (letters/words).

### Dynamic Popper
- `generateDynamicPopperBuffer(config)`: Cascading sequence of percussive pops.

### Cartoon Stretch
- `generateCartoonStretchBuffer(sampleRate, duration)`: A rubbery, wobbling stretch effect.

### Slashing
- `generateSlashingAudioBuffer(sampleRate, duration)`: A sharp, filtered-noise whoosh for high-velocity cuts.

### Flipping
- `generateFlippingAudioBuffer(sampleRate, duration)`: A tactile, premium-feel rotation sound.

### Groovy Effects (v1)
- `generateBoingSFXBuffer(sampleRate, duration)`: A comic, springy squash-and-stretch boing.
- `generateWhistlePopBuffer(sampleRate, duration)`: A playful whistle slide-up ending in a bubble pop.
- `generateZippingBuffer(sampleRate, duration)`: A sharp, high-velocity friction "zip".
- `generateLaserBlipBuffer(sampleRate, duration)`: A bright, retro-arcade laser blip.

### Groovy Effects (v2)
- `generateUFOHoverBuffer(sampleRate, duration)`: An electronic, rubbery hover with LFO vibrato.
- `generateSpringJumpBuffer(sampleRate, duration)`: A retro arcade spring bounce.
- `generateDropOffBuffer(sampleRate, duration)`: A comic downward "falling whistle" slide.
- `generateLaserBubbleBuffer(sampleRate, duration)`: Microscopic laser snap/pop.
```
---
# Configuration
- mode: 'letters' | 'words'
- text: string
- speed: 'quick' | 'relaxed'
```
