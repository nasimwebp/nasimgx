import React, { useState } from 'react';
import { FrontCover, BackCover, Spine, InsideFrontFlap, InsideBackFlap, PALETTES } from '../components/BookCover';
import { ArrowLeft, Download, Eye, Layers, BookOpen, Sparkles, Check, Palette as PaletteIcon, Monitor, Smartphone, FileText, Share2, Award, Globe, Shield, Heart, Lightbulb } from 'lucide-react';

type PaletteKey = keyof typeof PALETTES;
type ViewMode = 'front' | 'spine' | 'back' | 'spread' | 'mockup' | 'details';

const BookCoverPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [paletteKey, setPaletteKey] = useState<PaletteKey>('primary');
  const [viewMode, setViewMode] = useState<ViewMode>('front');
  const palette = PALETTES[paletteKey];

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      {/* Top nav */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#0B1020]/80 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs tracking-widest uppercase text-white/50">NasimGraphix</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#4ade80] text-[#0B1020]">Book Cover • Handbook</span>
          </div>
        </div>
      </div>

      {/* Hero - Book showcase */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full opacity-30 blur-[120px]" style={{ background: `radial-gradient(ellipse at center, ${palette.terracotta}40 0%, transparent 70%)` }} />
          <div className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]" style={{ background: palette.slate + '80' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-10 pb-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs tracking-widest uppercase mb-4">
              <BookOpen size={14} className="text-[#B9975B]" />
              <span className="text-white/90">The War-Stopper's Handbook</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[#B9975B]">Cover Design System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              A cover that does
              <span className="italic font-normal" style={{ color: palette.brass }}> the same job </span>
              as the book
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Distinctive, colourful and simple — inspired by the Oxford Handbook of Clinical Medicine (10th edition, "Cheese & Onion") but built for diplomats, soldiers, and humanitarians. Order out of chaos, hope out of war.
            </p>

            {/* View mode tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {([
                { id: 'front', label: 'Front', icon: Eye },
                { id: 'spine', label: 'Spine', icon: Layers },
                { id: 'back', label: 'Back', icon: FileText },
                { id: 'spread', label: 'Wraparound', icon: BookOpen },
                { id: 'mockup', label: 'On Desk', icon: Monitor },
                { id: 'details', label: 'Specs', icon: Sparkles },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${viewMode === id ? 'bg-white text-[#0B1020] border-white' : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/15 hover:text-white'}`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* Palette switcher */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                <PaletteIcon size={12} /> Colourway
              </span>
              {(Object.entries(PALETTES) as [PaletteKey, typeof palette][]).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setPaletteKey(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all ${paletteKey === key ? 'bg-[#B9975B] text-[#0B1020] border-[#B9975B]' : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'}`}
                >
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: p.inkNavy }} />
                  <span className="w-3 h-3 rounded-full border border-white/30 -ml-1" style={{ backgroundColor: p.terracotta }} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main viewer */}
          <div className="pb-12">
            {viewMode === 'front' && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* shadow platform */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-12 rounded-full blur-2xl opacity-40" style={{ background: '#000' }} />
                  <div
                    className="relative rounded-[3px] overflow-hidden"
                    style={{ width: 390, height: 585, maxWidth: '92vw', maxHeight: '68vh' }}
                  >
                    <FrontCover palette={palette} className="w-full h-full" />
                  </div>
                  {/* floating badges */}
                  <div className="absolute -right-3 top-8 hidden lg:flex flex-col gap-2">
                    <div className="px-3 py-2 rounded-xl bg-white text-[#0B1020] text-xs font-bold shadow-xl rotate-[1deg]">
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-green-600" /> Thumbnail legible
                      </div>
                      <div className="text-[11px] font-medium opacity-70">Title reads at 200px</div>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-[#B9975B] text-white text-xs font-bold shadow-xl -rotate-[1deg]">
                      Not white → won't show dirt
                    </div>
                  </div>
                  <div className="absolute -left-3 bottom-16 hidden lg:flex flex-col gap-2">
                    <div className="px-3 py-2 rounded-xl bg-[#1A335A] border border-white/20 text-white text-xs font-semibold shadow-xl">
                      Royal • 156 × 234 mm
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full">
                  {[
                    { k: 'Authority', v: 'Ink navy + brass = quiet professionalism' },
                    { k: 'Hope', v: 'Terracotta warmth against cool diplomacy' },
                    { k: 'Order', v: 'Banded system = chaos into structure' },
                  ].map((it) => (
                    <div key={it.k} className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
                      <div className="text-xs uppercase tracking-widest text-[#B9975B] font-bold">{it.k}</div>
                      <div className="text-sm text-white/90 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {it.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'spine' && (
              <div className="flex justify-center">
                <div className="flex items-stretch gap-6">
                  <div className="hidden sm:block" style={{ width: 110, height: 520 }}>
                    <div className="w-full h-full rounded-sm overflow-hidden flex flex-col">
                      <InsideFrontFlap palette={palette} />
                    </div>
                    <p className="text-center text-[11px] uppercase tracking-widest text-white/50 mt-2">Inside front flap</p>
                  </div>
                  <div className="relative">
                    <div className="flex gap-0.5" style={{ height: 520 }}>
                      <div className="w-[92px] rounded-sm overflow-hidden shadow-xl" style={{ height: 520 }}>
                        <Spine palette={palette} className="w-full h-full" />
                      </div>
                      <div className="w-[390px] max-w-[75vw] rounded-sm overflow-hidden shadow-2xl" style={{ height: 520 }}>
                        <FrontCover palette={palette} className="w-full h-full" small={false} />
                      </div>
                    </div>
                    <p className="text-center text-[11px] uppercase tracking-widest text-white/50 mt-2">Spine 37.5mm • Publisher logo • Brass caps</p>
                  </div>
                  <div className="hidden sm:block" style={{ width: 110, height: 520 }}>
                    <div className="w-full h-full rounded-sm overflow-hidden flex flex-col">
                      <InsideBackFlap palette={palette} />
                    </div>
                    <p className="text-center text-[11px] uppercase tracking-widest text-white/50 mt-2">Inside back flap</p>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'back' && (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-12 rounded-full blur-2xl opacity-30" style={{ background: '#000' }} />
                  <div className="relative rounded-[3px] overflow-hidden shadow-2xl" style={{ width: 390, height: 585, maxWidth: '92vw' }}>
                    <BackCover palette={palette} className="w-full h-full" />
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'spread' && (
              <div className="overflow-x-auto pb-6">
                <div className="min-w-[980px] mx-auto flex justify-center">
                  <div className="flex gap-[2px] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                    {/* Order when flat unfolded: Back flap | Back cover | Spine | Front cover | Front flap */}
                    <div className="w-[170px] h-[520px] rounded-sm overflow-hidden shrink-0">
                      <InsideBackFlap palette={palette} />
                    </div>
                    <div className="w-[330px] h-[520px] rounded-sm overflow-hidden shrink-0">
                      <BackCover palette={palette} className="w-full h-full" />
                    </div>
                    <div className="w-[74px] h-[520px] rounded-sm overflow-hidden shrink-0">
                      <Spine palette={palette} className="w-full h-full" />
                    </div>
                    <div className="w-[330px] h-[520px] rounded-sm overflow-hidden shrink-0">
                      <FrontCover palette={palette} className="w-full h-full" />
                    </div>
                    <div className="w-[170px] h-[520px] rounded-sm overflow-hidden shrink-0">
                      <InsideFrontFlap palette={palette} />
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs uppercase tracking-[0.14em] text-white/50 mt-3">Wraparound flat spread — French flaps • Spine • Matt laminated • Royal trim</p>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs">Total flat width ~1150mm (with flaps 90mm each)</span>
                </div>
              </div>
            )}

            {viewMode === 'mockup' && (
              <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* 3D desk mockup using CSS */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1A2A45] to-[#0F1F3C] p-6 lg:p-8">
                  <h3 className="text-sm uppercase tracking-widest text-white/60 mb-4">On a diplomat's desk — quiet professionalism</h3>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0B1A2E] flex items-center justify-center">
                    {/* Desk surface */}
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, #1B2F4A 0%, #0F2342 60%, #0A1628 100%)` }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: `linear-gradient(180deg, transparent, rgba(0,0,0,0.5))` }} />
                    {/* Papers stack hint */}
                    <div className="absolute bottom-[18%] left-[14%] w-[58%] h-[52%] rounded-sm opacity-20" style={{ background: '#E9DDC4', transform: 'rotate(-2deg)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} />
                    <div className="absolute bottom-[19%] left-[15%] w-[57%] h-[50%] rounded-sm opacity-30" style={{ background: '#fff', transform: 'rotate(1deg)' }} />
                    {/* Book at angle */}
                    <div className="relative z-10 shadow-2xl" style={{ width: 220, height: 330, transform: 'rotate(-6deg) perspective(900px) rotateY(-8deg)', transformStyle: 'preserve-3d' }}>
                      <FrontCover palette={palette} className="w-full h-full rounded-sm" small />
                      <div className="absolute top-0 -right-3 w-3 h-full bg-[#0F2342] border-l border-[#B9975B]/30" style={{ transform: 'rotateY(30deg)', transformOrigin: 'left' }} />
                    </div>
                    <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white text-[#0B1020] text-xs font-bold shadow-lg">Matt laminated • Won't glare</div>
                    <div className="absolute bottom-6 left-6 text-white/70 text-xs tracking-widest uppercase">A companion on the desk, not on the shelf</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { l: 'Spine out', d: 'Recognisable in a stack' },
                      { l: 'French flaps', d: 'Lays flat, bookmark' },
                      { l: 'Field ready', d: 'Scuff-resistant' },
                    ].map((x) => (
                      <div key={x.l} className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/10">
                        <div className="text-xs font-bold text-white">{x.l}</div>
                        <div className="text-[11px] text-white/60 leading-tight mt-1">{x.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thumbnail / ebook preview */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111827] p-6 lg:p-8 flex flex-col">
                  <h3 className="text-sm uppercase tracking-widest text-white/60 mb-4">Amazon • Thumbnail • eBook (1.6:1 safe)</h3>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex gap-6 items-end">
                      <div className="rounded-sm overflow-hidden shadow-xl" style={{ width: 148, height: 222 }}>
                        <FrontCover palette={palette} className="w-full h-full" small />
                      </div>
                      <div className="flex-1">
                        <div className="px-3 py-2.5 rounded-lg bg-white text-[#0B1020]">
                          <div className="text-[11px] font-bold">Amazon Detail Page</div>
                          <div className="mt-1 flex gap-2">
                            <div className="w-12 h-16 rounded-sm overflow-hidden">
                              <FrontCover palette={palette} className="w-full h-full" small />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold leading-tight truncate">The War-Stopper's Handbook</div>
                              <div className="text-[11px] text-black/60">Barney Mayhew</div>
                              <div className="text-[11px] text-amber-600">★★★★★ 5.0</div>
                              <div className="text-xs font-bold">£28.00</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-center">
                            <div className="text-[11px] font-bold text-white">625 × 1000 min</div>
                            <div className="text-[10px] text-white/60">✓ Pass</div>
                          </div>
                          <div className="px-3 py-2 rounded-lg bg-[#B9975B] text-white text-center">
                            <div className="text-[11px] font-bold">2000×3000</div>
                            <div className="text-[10px] opacity-80">Preferred</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10 p-2 flex flex-col justify-center items-center text-center" style={{ background: palette.inkNavy }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: palette.brass, color: palette.inkNavy, fontSize: 18 }}>
                          ✦
                        </div>
                        <div className="text-[11px] font-bold text-white mt-2 leading-tight">Distinctive in grid</div>
                      </div>
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10 p-3 flex flex-col" style={{ background: palette.sand }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: palette.inkNavy }}>
                          160,000 words
                        </div>
                        <div className="text-[11px] font-semibold leading-tight mt-1" style={{ color: palette.inkNavy }}>
                          Checklists when time is short
                        </div>
                      </div>
                      <div className="aspect-square rounded-xl overflow-hidden border border-white/10 p-3" style={{ background: palette.terracotta }}>
                        <div className="text-xs font-bold text-white leading-tight">From ceasefire to peace deal</div>
                        <div className="text-[11px] text-white/80 mt-1">Step-by-step</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/70">RGB master 300ppi</span>
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/70">CMYK ready</span>
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/70">No flatten</span>
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/70">&lt;5 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'details' && (
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 rounded-2xl bg-white text-[#0F2342] p-6 lg:p-8">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Design rationale — why this works
                  </h3>
                  <div className="mt-4 grid gap-4">
                    {[
                      { icon: Shield, title: 'Authority without intimidation', desc: 'Ink navy (diplomatic blue) signals credibility and UN lineage; brass rules add quiet premium. Terracotta brings human warmth — war is human, peace is human.' },
                      { icon: Lightbulb, title: 'Oxford Handbook lineage', desc: 'Three-band logic directly answers the brief: puff line on top (sand), title dominant (navy), author modest. Instantly recognisable like "Cheese & Onion" — but ownable for this field.' },
                      { icon: Heart, title: 'Hope, not horror', desc: 'No images of war. Colour does the work: cool navy (order) + warm terracotta (hope). The thin brass lines are the ceasefire line — order out of chaos.' },
                      { icon: Globe, title: 'Works in any culture', desc: 'Geometric bands translate globally, no imagery to misread. High contrast white-on-navy title stays crisp at thumbnail, on a dusty Land Cruiser, or on Kindle.' },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: palette.inkNavy, color: palette.brass }}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {title}
                          </div>
                          <div className="text-sm leading-relaxed opacity-80 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl border" style={{ background: palette.sandLight, borderColor: `${palette.brass}60` }}>
                    <div className="text-xs uppercase tracking-widest font-bold" style={{ color: palette.terracotta }}>
                      19 October amendments — covered
                    </div>
                    <ul className="mt-2 space-y-1 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy }}>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Puff line: 'A must-have, must-read, manual' — Sherard Cowper-Coles
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Title: THE / WAR-STOPPER'S / HANDBOOK — all words same size
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Author name modest, letterspaced, not headline
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Inside flaps: endorsements (front) + bio + photo placeholder (back)
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span> Oxford Handbook 10th edition reference — banded, not copied
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest">Print specs</h4>
                    <dl className="mt-3 space-y-2 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Trim</dt>
                        <dd className="text-white font-semibold">Royal 156 × 234 mm</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Spine</dt>
                        <dd className="text-white font-semibold">37.5 mm est.</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Binding</dt>
                        <dd className="text-white font-semibold">Paperback + French flaps</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Finish</dt>
                        <dd className="text-white font-semibold">Matt laminated</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Background</dt>
                        <dd className="text-white font-semibold">Ink navy — hides dirt</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">ISBN area</dt>
                        <dd className="text-white font-semibold">Back footer reserved</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Logo</dt>
                        <dd className="text-white font-semibold">Front bottom + spine</dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 rounded-full text-[11px] bg-white text-[#0B1020] font-bold">RGB master • 300 ppi</span>
                      <span className="px-2 py-1 rounded-full text-[11px] bg-white/10 border border-white/15 text-white/80">CMYK on export</span>
                    </div>
                  </div>

                  <div className="rounded-2xl p-5" style={{ background: palette.sand, border: `1px solid ${palette.brass}30` }}>
                    <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: palette.inkNavy }}>
                      What it communicates
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['Authority', 'Professionalism', 'Credibility', 'Clarity', 'Hope', 'Distinctive', 'Durable', 'Diplomatic punch', 'Friendly guide'].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ background: palette.inkNavy, color: palette.cream, borderColor: palette.brass + '40' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: palette.inkNavy, opacity: 0.8 }}>
                      Clean, straightforward, intriguing — a friendly companion you'll actually use under pressure. The kind of book a diplomat is proud to have on the desk.
                    </p>
                  </div>

                  <button
                    onClick={() => setViewMode('front')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors"
                    style={{ background: palette.brass, color: palette.inkNavy }}
                  >
                    <Download size={16} />
                    Download press-ready specs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social promo strip */}
      <section className="border-t border-white/10 bg-[#0B1020]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Promotional graphics — ready for launch
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
              <Share2 size={12} /> All ratios built from same band system
            </span>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PromoCard palette={palette} label="Letterbox 1200×628" sub="Facebook post" aspect="1200 / 628">
              <div className="w-full h-full flex">
                <div className="flex-1 flex flex-col justify-center p-4" style={{ background: palette.inkNavy }}>
                  <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: palette.brass }}>
                    A must-have manual — Sherard Cowper-Coles
                  </div>
                  <div className="text-lg font-bold leading-none mt-1" style={{ fontFamily: "'Instrument Serif', serif", color: palette.cream }}>
                    THE WAR-STOPPER'S HANDBOOK
                  </div>
                  <div className="text-[11px] uppercase tracking-widest mt-1" style={{ color: palette.sandLight }}>
                    A Practical Guide • Barney Mayhew
                  </div>
                </div>
                <div className="w-[28%] flex flex-col justify-center items-center p-2" style={{ background: palette.terracotta }}>
                  <Award size={18} style={{ color: palette.cream }} />
                  <div className="text-[9px] font-bold uppercase tracking-widest text-center mt-1" style={{ color: palette.cream }}>
                    For diplomats, UN, military
                  </div>
                </div>
              </div>
            </PromoCard>

            <PromoCard palette={palette} label="Square 1080×1080" sub="Instagram / Facebook" aspect="1 / 1">
              <div className="w-full h-full flex flex-col p-5 justify-between" style={{ background: palette.inkNavy }}>
                <div className="text-center">
                  <div className="inline-block px-2 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold" style={{ background: palette.brass, color: palette.inkNavy }}>
                    New • First handbook of its kind
                  </div>
                  <div className="text-2xl font-bold leading-none mt-3" style={{ fontFamily: "'Instrument Serif', serif", color: palette.cream }}>
                    THE WAR-
                    <br />
                    STOPPER'S
                    <br />
                    HANDBOOK
                  </div>
                  <div className="w-8 h-px mx-auto mt-3" style={{ background: palette.brass }} />
                  <div className="text-[11px] uppercase tracking-[0.12em] mt-2" style={{ color: palette.sandLight }}>
                    Practical • Step-by-step
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: palette.cream }}>
                    Barney Mayhew
                  </div>
                  <div className="text-[10px]" style={{ color: palette.brass }}>
                    barneymayhew.com
                  </div>
                </div>
              </div>
            </PromoCard>

            <PromoCard palette={palette} label="Banner 640×200" sub="Newsletter" aspect="640 / 200">
              <div className="w-full h-full flex items-center px-4 gap-3" style={{ background: palette.sand }}>
                <div className="w-12 h-14 rounded-sm shrink-0 overflow-hidden shadow-md">
                  <FrontCover palette={palette} className="w-full h-full" small />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold leading-tight" style={{ fontFamily: "'Instrument Serif', serif", color: palette.inkNavy }}>
                    The War-Stopper's Handbook
                  </div>
                  <div className="text-[11px]" style={{ color: palette.slate }}>
                    From understanding a war to agreeing a ceasefire — checklists for when time is short.
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-bold shrink-0" style={{ background: palette.inkNavy, color: palette.cream }}>
                  Out now
                </div>
              </div>
            </PromoCard>

            <PromoCard palette={palette} label="Cover 820×360" sub="Facebook cover" aspect="820 / 360">
              <div className="w-full h-full flex flex-col p-4" style={{ background: `linear-gradient(90deg, ${palette.inkNavy} 0%, ${palette.inkNavy} 62%, ${palette.terracotta} 62%)` }}>
                <div className="flex-1 flex items-center gap-4">
                  <div className="w-20 h-26 rounded-sm overflow-hidden shadow-lg shrink-0" style={{ width: 64, height: 96 }}>
                    <FrontCover palette={palette} className="w-full h-full" small />
                  </div>
                  <div>
                    <div className="text-xl font-bold leading-none" style={{ fontFamily: "'Instrument Serif', serif", color: palette.cream }}>
                      The War-Stopper's Handbook
                    </div>
                    <div className="text-sm mt-1" style={{ color: palette.sandLight }}>
                      For professionals who work on war.
                    </div>
                    <div className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: palette.brass, color: palette.inkNavy }}>
                      Diplomats • UN • Military • Aid • Journalists • Students
                    </div>
                  </div>
                </div>
              </div>
            </PromoCard>
          </div>

          <div className="mt-8 rounded-2xl p-6 border flex flex-col md:flex-row gap-6 items-start md:items-center justify-between" style={{ background: palette.inkNavy, borderColor: `${palette.brass}30` }}>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: palette.brass }}>
                Also included
              </h3>
              <p className="text-sm mt-1 text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                Email headers, Facebook ad sets (all sizes), PDF first-page cover, eBook 2000×3000 (RGB, editable, &lt;5MB, not flattened).
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-[#0B1020] text-sm font-semibold">
                <Download size={14} /> Export all assets
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-semibold text-white/90">
                <Smartphone size={14} /> Thumbnail-tested
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / endorsements context */}
      <section className="border-t border-white/10 bg-white text-[#0F2342]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              What leaders say — context for designers
            </h2>
            <p className="text-sm opacity-60 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              The cover must carry the same credibility the endorsements promise.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                n: 'Mats Berdal',
                r: "King's College London",
                q: 'Fills a notable gap: a concise, readily accessible, and practical guide to the mitigation and termination of violent conflict.',
              },
              {
                n: 'Jeremy Greenstock',
                r: 'Former UK Ambassador to UN; Iraq Special Rep',
                q: 'Needs to be recognised as an essential tool, because nothing quite like it has existed until now.',
              },
              {
                n: 'Kim Darroch',
                r: 'Former Ambassador to US; Nat. Security Advisor',
                q: 'Should be compulsory reading in foreign and defence ministries, newsrooms, aid agencies and NGOs.',
              },
              {
                n: 'Jonathon Riley',
                r: 'Lt Gen, former Commander Iraq & ISAF Afghanistan',
                q: 'If only I had had this terrific handbook during those difficult years.',
              },
              {
                n: 'Sherard Cowper-Coles',
                r: 'Former Ambassador to Israel, Saudi Arabia, Afghanistan',
                q: 'A must-have, must-read, manual — deserves the widest possible audience.',
              },
              {
                n: 'Richard English',
                r: "Queen's University Belfast",
                q: 'A unique book based on expertise and wisdom from decades of vital experience.',
              },
            ].map((e) => (
              <div key={e.n} className="p-4 rounded-xl border text-left" style={{ background: '#F8F5EC', borderColor: '#E9DDC4' }}>
                <div className="text-sm leading-relaxed" style={{ fontFamily: "'EB Garamond', serif" }}>
                  "{e.q}"
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: palette.inkNavy }}>
                    {e.n
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {e.n}
                    </div>
                    <div className="text-[11px] opacity-60 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {e.r}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl text-left" style={{ background: palette.inkNavy, color: palette.cream }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: palette.brass, color: palette.inkNavy }}>
                <Globe size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  30+ years in wars — Bosnia, Rwanda, Congo, Middle East
                </h3>
                <p className="text-sm leading-relaxed mt-1 opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
                  UN peacekeeper, tank commander, ceasefire monitor/negotiator, aid coordinator. Lecturer at UK Defence Academy. Designed the UK government's conflict stabilisation training. Dual British & Irish. This lived experience is why the cover must feel
                  <strong> durable, usable, and trusted — not decorative.</strong>
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: palette.sand, color: palette.inkNavy }}>
                  <BookOpen size={12} /> 160,000 words • Practical checklists • Topic-by-topic
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#0B1020] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Designed to be recognised across a crowded room.
            </h2>
            <p className="text-sm text-white/60 mt-2 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Once you've seen it, you spot it immediately — on a desk in New York, on a dashboard in a field mission, on Amazon at 200 pixels wide. That's the point of the bands.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={onBack} className="px-6 py-3 rounded-full bg-white text-[#0B1020] font-semibold inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Back to portfolio
              </button>
              <span className="px-6 py-3 rounded-full bg-[#B9975B] text-white font-semibold inline-flex items-center gap-2">
                <Award size={16} /> Ready for press & KDP
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-white/40 mt-6">© NasimGraphix • All editable source files provided • PickFu-ready variants</p>
          </div>
        </div>
      </section>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Serif+Display&family=Instrument+Serif&family=Inter:wght@400;500;600;700&display=swap');`}</style>
    </div>
  );
};

const PromoCard: React.FC<{ palette: typeof PALETTES.primary; label: string; sub: string; aspect: string; children: React.ReactNode }> = ({ palette, label, sub, aspect, children }) => (
  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111827] flex flex-col">
    <div className="p-3 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-white">{label}</div>
        <div className="text-[11px] text-white/50">{sub}</div>
      </div>
      <span className="w-2 h-2 rounded-full" style={{ background: palette.brass }} />
    </div>
    <div className="mx-3 mb-3 rounded-xl overflow-hidden border border-white/10" style={{ aspectRatio: aspect }}>
      {children}
    </div>
  </div>
);

export default BookCoverPage;
