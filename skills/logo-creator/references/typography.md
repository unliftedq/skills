# Typography for Logo Wordmarks

Typeface selection and treatment for professional wordmarks.

## Type Categories and When to Use

### Geometric Sans-Serif

**Personality:** Modern, technical, clean, futuristic
**Best for:** Tech, startups, SaaS, AI, fintech

| Typeface | Notes |
|----------|-------|
| Futura | The original geometric, bold and confident |
| Century Gothic | Softer Futura, more approachable |
| Avenir | Humanized geometric, warm |
| Proxima Nova | Web-optimized geometric |
| Montserrat | Free alternative to Proxima/Gotham |

### Grotesque / Neo-Grotesque Sans-Serif

**Personality:** Universal, professional, trustworthy
**Best for:** Corporate, enterprise, institutions, global brands

| Typeface | Notes |
|----------|-------|
| Helvetica Neue | The standard, Swiss perfection |
| Inter | Modern web-native, excellent at all sizes |
| SF Pro | Apple's system font, tech-native |
| Söhne | Modern Helvetica evolution |

### Humanist Sans-Serif

**Personality:** Friendly, approachable, warm, human
**Best for:** Consumer brands, wellness, education, accessibility

| Typeface | Notes |
|----------|-------|
| Gill Sans | Classic humanist, British |
| Frutiger | Wayfinding clarity, warm |
| Myriad Pro | Adobe's humanist standard |
| Open Sans | Highly legible, web-native |
| Nunito | Rounded humanist, very friendly |

### Modern/Didone Serifs

**Personality:** Elegant, luxurious, editorial, fashion
**Best for:** Fashion, luxury, publishing, beauty

| Typeface | Notes |
|----------|-------|
| Didot | French elegance |
| Bodoni | Italian precision |
| Playfair Display | Free Didone, web-optimized |

### Transitional Serifs

**Personality:** Traditional, established, trustworthy
**Best for:** Finance, law, institutions, heritage brands

| Typeface | Notes |
|----------|-------|
| Times New Roman | The newspaper standard |
| Georgia | Screen-optimized transitional |
| Baskerville | British elegance |

### Slab Serifs

**Personality:** Bold, confident, mechanical, approachable
**Best for:** Hardware, industrial, construction, startup

| Typeface | Notes |
|----------|-------|
| Rockwell | Classic slab |
| Roboto Slab | Google's slab |
| Clarendon | Victorian era, distinctive |

## Wordmark Treatment

### Tracking (Letter-spacing)

| Treatment | Value | When to Use |
|-----------|-------|-------------|
| Tight | -20 to -10 | Short names (3-5 chars), bold weights |
| Normal | 0 | Most applications |
| Loose | +20 to +50 | Luxury, editorial, all-caps |
| Very Loose | +100+ | Display, minimalist, fashion |

### Weight Selection

| Weight | When to Use |
|--------|-------------|
| Light (300) | Luxury, elegance, fashion |
| Regular (400) | Legibility priority, long names |
| Medium (500) | Balanced presence |
| Semibold (600) | Modern, confident |
| Bold (700) | Impact, startup, short names |

### Case

| Case | Personality | When to Use |
|------|-------------|-------------|
| ALL CAPS | Authority, impact, fashion | Strong brands, short names |
| lowercase | Friendly, tech, accessible | Startups, consumer tech |
| Title Case | Traditional, proper | Professional services |
| camelCase | Developer, technical | Dev tools, APIs |

## SVG Wordmark Process

1. **Set type** in vector software
2. **Apply tracking/kerning** adjustments
3. **Outline text** — Convert to paths
4. **Merge paths** into single compound path
5. **Optimize** — Remove unnecessary points
6. **Export SVG** — Clean, single-path output

**Critical:** Never ship live text in logos. Always outline.

## Type Pairing with Icons

| Icon Style | Wordmark Style |
|------------|----------------|
| Geometric icon | Geometric sans or neo-grotesque |
| Organic icon | Humanist sans |
| Abstract icon | Bold sans or geometric |
| Minimal icon | Light weight, loose tracking |
| Complex icon | Simple, heavy wordmark |

**Rule:** Icon complexity + Wordmark complexity = constant. If icon is complex, wordmark is simple. If icon is simple, wordmark can be more distinctive.

## Modern Typeface Recommendations

### For Tech/SaaS

1. Inter (free, excellent)
2. Söhne (Stripe-level quality)
3. Geist (Vercel)
4. SF Pro (Apple ecosystem)

### For Startups

1. Manrope (free geometric)
2. Plus Jakarta Sans (friendly geometric)
3. Space Grotesk (distinctive)

### For Consumer

1. Poppins (friendly, free)
2. Nunito (very approachable)
3. DM Sans (clean, free)

### For Enterprise

1. IBM Plex Sans (serious, free)
2. Source Sans Pro (neutral, free)
3. Roboto (universal)

## Anti-Patterns

- Using more than one typeface in a wordmark
- Script fonts for primary logos (legibility issues)
- Trendy display fonts that will date
- Live text in exported SVGs
- Extreme tracking that breaks at small sizes
- Mixing weights within wordmark
