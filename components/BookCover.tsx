import React from 'react';

// Design System for The War-Stopper's Handbook
// Palette - primary approved colourway
export const PALETTES = {
  primary: {
    name: 'Diplomatic Navy',
    inkNavy: '#0F2342',
    inkNavyLight: '#1A335A',
    sand: '#E9DDC4',
    sandLight: '#F2E8D5',
    sandMuted: '#D6CAB0',
    terracotta: '#B94E33',
    terracottaLight: '#C85D3F',
    brass: '#B9975B',
    brassLight: '#C9AD7A',
    cream: '#F5F1E6',
    slate: '#2A4A6B',
  },
  forest: {
    name: 'UN Field Green',
    inkNavy: '#1B2F26',
    inkNavyLight: '#2A4A3A',
    sand: '#E6DCC3',
    sandLight: '#F0E9D6',
    sandMuted: '#D1C4A8',
    terracotta: '#9A7B2E',
    terracottaLight: '#B8963A',
    brass: '#B9975B',
    brassLight: '#C9AD7A',
    cream: '#F5F1E6',
    slate: '#3A5A40',
  },
  slate: {
    name: 'Slate & Signal',
    inkNavy: '#2B2D42',
    inkNavyLight: '#3D4058',
    sand: '#E8DDD0',
    sandLight: '#F1E9DD',
    sandMuted: '#D4CAB8',
    terracotta: '#C1121F',
    terracottaLight: '#D90429',
    brass: '#B8A082',
    brassLight: '#C9B89A',
    cream: '#F5F1E6',
    slate: '#4A4E69',
  }
};

type Palette = typeof PALETTES.primary;

interface FrontCoverProps {
  palette?: Palette;
  small?: boolean;
}

// Reusable texture overlay - subtle order-out-of-chaos grid
const SubtleTexture: React.FC<{ palette: Palette }> = ({ palette }) => (
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
    backgroundImage: `repeating-linear-gradient(0deg, ${palette.cream} 0px, ${palette.cream} 1px, transparent 1px, transparent 28px),
                      repeating-linear-gradient(90deg, ${palette.cream} 0px, ${palette.cream} 1px, transparent 1px, transparent 28px)`,
  }} />
);

const TopBrassLine: React.FC<{ palette: Palette }> = ({ palette }) => (
  <div className="h-[5px] w-full shrink-0" style={{ backgroundColor: palette.brass }} />
);
const BrassDivider: React.FC<{ palette: Palette; height?: number }> = ({ palette, height = 3 }) => (
  <div className="w-full shrink-0" style={{ backgroundColor: palette.brass, height }} />
);

export const FrontCover: React.FC<FrontCoverProps & { className?: string; id?: string }> = ({ palette = PALETTES.primary, small = false, className = '', id }) => {
  return (
    <div
      id={id}
      className={`relative flex flex-col overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: palette.inkNavy,
        fontFamily: "'EB Garamond', 'Libre Baskerville', serif",
        boxShadow: small ? '0 4px 18px rgba(0,0,0,0.35)' : '0 20px 60px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      <TopBrassLine palette={palette} />

      {/* Puff band */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          backgroundColor: palette.sand,
          height: small ? 28 : 46,
          padding: small ? '0 8px' : '0 16px',
        }}
      >
        <p
          className="text-center leading-none tracking-[0.14em] uppercase"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: palette.inkNavy,
            fontSize: small ? 6.5 : 10.5,
            fontWeight: 600,
            fontStyle: 'normal',
          }}
        >
          <span style={{ fontStyle: 'italic', fontWeight: 500, textTransform: 'none', letterSpacing: '0.04em' }}>'A must-have, must-read, manual'</span>
          <span className="mx-1.5 opacity-60">—</span>
          <span style={{ letterSpacing: '0.08em' }}>Sherard Cowper-Coles</span>
        </p>
      </div>

      <BrassDivider palette={palette} height={small ? 2 : 3} />

      {/* Title band - dominant */}
      <div
        className="flex-1 flex flex-col justify-center relative"
        style={{
          backgroundColor: palette.inkNavy,
          padding: small ? '16px 14px 14px' : '28px 28px 22px',
        }}
      >
        <SubtleTexture palette={palette} />

        {/* Faint topographic / order lines */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-[0.06] pointer-events-none" style={{ padding: small ? '12px 0' : '20px 0' }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ backgroundColor: palette.cream, marginTop: i === 0 ? 0 : small ? 10 : 18 }} />
          ))}
        </div>

        {/* Title stack - all same size per brief */}
        <div className="relative z-10 text-center">
          <h1
            className="font-bold leading-[0.88] tracking-[-0.02em]"
            style={{
              color: palette.cream,
              fontFamily: "'Instrument Serif','DM Serif Display','EB Garamond', serif",
              fontSize: small ? 30 : 54,
              fontWeight: 400,
              letterSpacing: '-0.015em',
              textTransform: 'uppercase',
              lineHeight: '0.86',
            }}
          >
            <span className="block" style={{ fontSize: '1em' }}>THE</span>
            <span className="block" style={{ fontSize: '1em', letterSpacing: '-0.02em' }}>WAR-</span>
            <span className="block" style={{ fontSize: '1em' }}>STOPPER'S</span>
            <span className="block" style={{ fontSize: '1em' }}>HANDBOOK</span>
          </h1>

          {/* Thin brass rule under title */}
          <div className="mx-auto mt-3 mb-3 flex items-center justify-center gap-2" style={{ marginTop: small ? 10 : 18, marginBottom: small ? 10 : 16 }}>
            <div className="h-px" style={{ backgroundColor: palette.brass, width: small ? 18 : 36, opacity: 0.9 }} />
            <div className="w-1 h-1 rounded-full rotate-45" style={{ backgroundColor: palette.brass }} />
            <div className="h-px" style={{ backgroundColor: palette.brass, width: small ? 18 : 36, opacity: 0.9 }} />
          </div>

          {/* Subtitle */}
          <p
            className="mx-auto leading-[1.45] tracking-wide"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: palette.sandLight,
              fontSize: small ? 7 : 11.5,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              maxWidth: small ? '92%' : '88%',
              opacity: 0.95,
              lineHeight: small ? 1.4 : 1.5,
            }}
          >
            A Practical Guide for
            <br />
            Individuals and Teams
            <br />
            Tackling Armed Conflict
          </p>
        </div>
      </div>

      {/* Bottom band - terracotta with subtitle refinement + author */}
      <div className="shrink-0 relative">
        <BrassDivider palette={palette} height={small ? 2 : 3} />
        <div
          className="flex flex-col justify-center"
          style={{
            backgroundColor: palette.terracotta,
            padding: small ? '10px 12px 11px' : '18px 20px 16px',
          }}
        >
          {/* subtle diagonal texture for hope/warmth */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `repeating-linear-gradient(-35deg, transparent 0 10px, ${palette.cream} 10px 11px)`,
          }} />

          <div className="relative z-10">
            {/* Author name - modest per brief */}
            <p
              className="text-center tracking-[0.22em] uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: palette.cream,
                fontSize: small ? 7.5 : 12,
                fontWeight: 600,
                letterSpacing: small ? '0.18em' : '0.22em',
              }}
            >
              Barney Mayhew
            </p>
            {!small && (
              <p
                className="text-center mt-1.5 tracking-widest uppercase opacity-80"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: palette.sandLight,
                  fontSize: 7.5,
                  letterSpacing: '0.18em',
                  fontWeight: 500,
                }}
              >
                Foreword by the practitioners
              </p>
            )}
          </div>
        </div>

        {/* Bottom thin navy strip for publisher logo */}
        <div
          className="flex items-center justify-between"
          style={{
            backgroundColor: palette.inkNavy,
            height: small ? 14 : 22,
            padding: small ? '0 8px' : '0 14px',
            borderTop: `1px solid ${palette.brass}40`,
          }}
        >
          <span
            className="uppercase tracking-widest opacity-60"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: palette.sandMuted,
              fontSize: small ? 5 : 7,
              letterSpacing: '0.14em',
              fontWeight: 500,
            }}
          >
            {small ? 'Royal • 156×234' : 'Royal Trim • French Flaps • Matt Laminated'}
          </span>
          <span
            className="rounded-sm flex items-center justify-center"
            style={{
              backgroundColor: palette.sand,
              color: palette.inkNavy,
              fontFamily: "'Inter', sans-serif",
              fontSize: small ? 5 : 7,
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: small ? '1px 4px' : '2px 6px',
              opacity: 0.9,
            }}
          >
            PUBLISHER LOGO
          </span>
        </div>
      </div>

      {/* Corner detail - quiet professionalism */}
      <div className="absolute pointer-events-none" style={{ bottom: small ? 28 : 44, right: small ? 8 : 12, opacity: 0.12 }}>
        <div className="w-px h-10" style={{ backgroundColor: palette.cream }} />
        <div className="w-10 h-px" style={{ backgroundColor: palette.cream }} />
      </div>
    </div>
  );
};

export const Spine: React.FC<{ palette?: Palette; className?: string }> = ({ palette = PALETTES.primary, className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden ${className}`}
      style={{ backgroundColor: palette.inkNavy, borderLeft: `1px solid ${palette.brass}30`, borderRight: `1px solid ${palette.brass}30` }}
    >
      <div className="w-full h-[5px] shrink-0" style={{ backgroundColor: palette.brass }} />
      <div className="flex-1 flex flex-col items-center justify-between py-4 w-full">
        {/* Top brass detail */}
        <div className="w-3/4 h-px opacity-40" style={{ backgroundColor: palette.brass }} />

        {/* Vertical title */}
        <div className="flex-1 flex items-center justify-center" style={{ writingMode: 'vertical-rl' }}>
          <h2
            className="uppercase tracking-[0.12em] whitespace-nowrap"
            style={{
              fontFamily: "'Instrument Serif','DM Serif Display', serif",
              color: palette.cream,
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: '0.14em',
              transform: 'rotate(180deg)',
            }}
          >
            THE WAR-STOPPER'S HANDBOOK
          </h2>
        </div>

        <div className="w-6 h-6 rounded-full flex items-center justify-center my-3" style={{ border: `1px solid ${palette.brass}80`, color: palette.brass, fontSize: 9 }}>
          ✦
        </div>

        <div style={{ writingMode: 'vertical-rl' }}>
          <p
            className="uppercase tracking-[0.18em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: palette.sandLight,
              fontSize: 9,
              fontWeight: 600,
              transform: 'rotate(180deg)',
            }}
          >
            BARNEY MAYHEW
          </p>
        </div>

        <div className="w-3/4 h-px opacity-40 mt-4" style={{ backgroundColor: palette.brass }} />
      </div>
      <div className="w-full shrink-0 flex items-center justify-center" style={{ backgroundColor: palette.terracotta, height: 22 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", color: palette.cream, fontSize: 7, letterSpacing: '0.12em', fontWeight: 600 }}>37.5mm</span>
      </div>
      <div className="w-full h-[4px]" style={{ backgroundColor: palette.brass }} />
    </div>
  );
};

export const BackCover: React.FC<{ palette?: Palette; className?: string }> = ({ palette = PALETTES.primary, className = '' }) => {
  return (
    <div className={`relative flex flex-col overflow-hidden ${className}`} style={{ backgroundColor: palette.sandLight }}>
      <div className="h-[5px] w-full shrink-0" style={{ backgroundColor: palette.brass }} />

      {/* Header strip */}
      <div className="shrink-0 px-5 py-3 flex items-center justify-between" style={{ backgroundColor: palette.inkNavy }}>
        <span className="uppercase tracking-[0.14em]" style={{ fontFamily: "'Inter', sans-serif", color: palette.brassLight, fontSize: 8, fontWeight: 600 }}>
          Praise for the Handbook
        </span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.brass }} />
        <span className="uppercase tracking-widest opacity-70" style={{ fontFamily: "'Inter', sans-serif", color: palette.sandMuted, fontSize: 7 }}>
          www.barneymayhew.com
        </span>
      </div>

      {/* Main blurb area */}
      <div className="flex-1 px-6 py-5 flex flex-col" style={{ backgroundColor: palette.sandLight }}>
        <h3
          className="leading-tight"
          style={{ fontFamily: "'Instrument Serif', serif", color: palette.inkNavy, fontSize: 19, fontWeight: 400, lineHeight: 1.15 }}
        >
          What does it take
          <br />
          <span style={{ fontStyle: 'italic', color: palette.terracotta }}>to stop a war?</span>
        </h3>

        <div className="w-10 h-px mt-3 mb-3" style={{ backgroundColor: palette.brass }} />

        <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, fontSize: 8.5, lineHeight: 1.65, opacity: 0.92 }}>
          Every war ends eventually. The question is how soon, and how well. <em style={{ fontStyle: 'italic', fontWeight: 600 }}>The War-Stopper's Handbook</em> is a practical guide for diplomats and other professionals working to bring a war to an end.
        </p>
        <p className="mt-2.5 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, fontSize: 8, lineHeight: 1.6, opacity: 0.82 }}>
          From understanding why a war is being fought to agreeing a ceasefire and making it stick, the handbook can be read from start to finish or dipped into topic by topic, with checklists for when time is short.
        </p>

        {/* Bullets */}
        <div className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-1">
          {[
            'Developing a strategy',
            'Preventing genocide',
            'Meeting humanitarian needs',
            'Countering disinformation',
            'Political negotiations',
            'Peacekeeping & intervention',
            'Reaching a peace deal',
            'Upholding intl. law',
          ].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: palette.terracotta }} />
              <span style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, fontSize: 6.8, fontWeight: 600, letterSpacing: '0.02em' }}>{t}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 italic leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.slate, fontSize: 7.5, lineHeight: 1.5 }}>
          Clear, concise and easy to consult under pressure — a quick-reference tool for diplomats, politicians, military officers, UN officials, humanitarian workers and journalists.
        </p>

        {/* Quotes */}
        <div className="mt-4 space-y-2.5">
          {[
            { q: 'Should be compulsory reading in foreign and defence ministries...', a: 'Ambassador Kim Darroch' },
            { q: 'If only I had had this terrific handbook...', a: 'Lt Gen Jonathon Riley' },
            { q: 'A unique book.', a: 'Prof Richard English' },
          ].map((item) => (
            <div key={item.a} className="pl-3 border-l-2 py-0.5" style={{ borderColor: `${palette.brass}60`, backgroundColor: `${palette.sand}30` }}>
              <p className="italic leading-snug" style={{ fontFamily: "'EB Garamond', serif", color: palette.inkNavy, fontSize: 8, lineHeight: 1.45 }}>
                "{item.q}"
              </p>
              <p className="uppercase tracking-widest mt-0.5" style={{ fontFamily: "'Inter', sans-serif", color: palette.slate, fontSize: 6, fontWeight: 700, letterSpacing: '0.08em' }}>
                — {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Barcode / ISBN footer */}
      <div className="shrink-0 px-4 py-3 flex items-center justify-between" style={{ backgroundColor: palette.inkNavy, borderTop: `3px solid ${palette.brass}` }}>
        <div>
          <p className="uppercase tracking-[0.14em]" style={{ fontFamily: "'Inter', sans-serif", color: palette.cream, fontSize: 9, fontWeight: 700 }}>
            £28.00 / $35.00
          </p>
          <p className="uppercase tracking-widest opacity-70" style={{ fontFamily: "'Inter', sans-serif", color: palette.sandMuted, fontSize: 6.5, letterSpacing: '0.08em' }}>
            ISBN 978-1-XXXX-XXXX-X • 160,000 words
          </p>
        </div>
        <div className="bg-white p-1 rounded-sm flex flex-col items-center" style={{ width: 54, height: 38 }}>
          <div className="w-full flex-1" style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0 1px, transparent 1px 2px, #000 2px 3px, transparent 3px 4px)`,
            opacity: 0.85,
          }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 5, color: '#000', marginTop: 1 }}>BARCODE • ISBN</span>
        </div>
      </div>
    </div>
  );
};

export const InsideFrontFlap: React.FC<{ palette?: Palette }> = ({ palette = PALETTES.primary }) => (
  <div className="h-full flex flex-col p-5" style={{ backgroundColor: palette.sand, borderRight: `1px solid ${palette.brass}40` }}>
    <p className="uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Inter', sans-serif", color: palette.terracotta, fontSize: 7, fontWeight: 700 }}>
      Endorsements
    </p>
    <div className="space-y-3 flex-1 overflow-hidden">
      {[
        { name: 'Sir Sherard Cowper-Coles', role: 'Former Ambassador to Israel, Saudi Arabia & Afghanistan', text: 'Deserves the widest possible audience, not just in New York and Washington, but also on the front line of conflict.' },
        { name: 'Lord Kim Darroch', role: 'Former Ambassador to the US & UK National Security Advisor', text: 'Packed with advice and insights, it should be compulsory reading in foreign and defence ministries across the globe.' },
        { name: 'Lt Gen Jonathon Riley', role: 'Former Commanding General Iraq; Deputy Commander ISAF Afghanistan', text: 'If only, if only, I had had this terrific handbook during those difficult years.' },
        { name: 'Prof Richard English', role: "Queen's University Belfast", text: 'A unique book, based on expertise and wisdom from decades of vital experience.' },
      ].map((e) => (
        <div key={e.name} className="pb-2 border-b" style={{ borderColor: `${palette.brass}30` }}>
          <p className="italic leading-snug" style={{ fontFamily: "'EB Garamond', serif", color: palette.inkNavy, fontSize: 7, lineHeight: 1.45 }}>
            "{e.text}"
          </p>
          <p className="mt-1 uppercase tracking-wide" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, fontSize: 6, fontWeight: 700 }}>
            {e.name}
          </p>
          <p className="leading-tight" style={{ fontFamily: "'Inter', sans-serif", color: palette.slate, fontSize: 5.5, lineHeight: 1.3 }}>
            {e.role}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const InsideBackFlap: React.FC<{ palette?: Palette }> = ({ palette = PALETTES.primary }) => (
  <div className="h-full flex flex-col p-5" style={{ backgroundColor: palette.inkNavy, color: palette.cream }}>
    <p className="uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Inter', sans-serif", color: palette.brass, fontSize: 7, fontWeight: 700 }}>
      About the Author
    </p>
    <div className="w-20 h-24 rounded-sm mb-3 flex items-center justify-center overflow-hidden shrink-0" style={{ backgroundColor: palette.sandMuted, border: `2px solid ${palette.brass}` }}>
      <span className="text-center leading-tight" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, fontSize: 6, fontWeight: 600 }}>
        AUTHOR
        <br />
        PHOTO
      </span>
    </div>
    <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.cream, fontSize: 7, lineHeight: 1.6, opacity: 0.92 }}>
      <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>Barney Mayhew</span> has worked in Bosnia, Rwanda, Congo and on other conflicts in Europe, Africa and the Middle East, for the UN, aid agencies, and the British government. He was previously a British Army officer for four years.
    </p>
    <p className="mt-2 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.sandLight, fontSize: 6.5, lineHeight: 1.55, opacity: 0.82 }}>
      Educated at Oxford University and the Royal Military Academy Sandhurst, he has served as a UN peacekeeper, a tank commander, a ceasefire monitor / negotiator, and an aid coordinator. He lectured at the UK Defence Academy and ran the UK government's training on conflict stabilisation.
    </p>
    <p className="mt-3 uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif", color: palette.brass, fontSize: 6, fontWeight: 600 }}>
      www.barneymayhew.com
    </p>
    <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: `${palette.brass}30` }}>
      <span className="uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif", color: palette.sandMuted, fontSize: 6, letterSpacing: '0.1em' }}>
        Dual British & Irish Citizen
      </span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.brass }} />
    </div>
  </div>
);
