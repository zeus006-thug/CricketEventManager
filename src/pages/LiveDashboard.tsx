/**
 * @fileoverview LiveDashboard page component for the Kinetic Arena application.
 * Displays real-time match statistics including score, run rates, batter/bowler
 * performance cards, ball-by-ball over history, and an interactive Digital Wave
 * fan engagement feature. Serves as the primary landing page after authentication.
 */

import React from 'react';

/**
 * LiveDashboard renders the main matchday analytics interface.
 * Displays:
 * - Hero score card with innings progress and win predictor.
 * - Active batter stats with strike rates and ball counts.
 * - Current bowler figures with economy rate.
 * - Ball-by-ball over visualization with animated pending delivery.
 * - Interactive "Digital Wave" fan sync feature with screen flash effect.
 *
 * @returns The rendered LiveDashboard page component.
 */
export default function LiveDashboard(): React.JSX.Element {
  return (
    <div className="space-y-8">
      {/* Score Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container rounded-xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 pointer-events-none"></div>
          <img alt="stadium background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMx_D6Jb6pF58uBP0iFegFsMFKf5VXRt2GJ66SIfVndSd9FtoaKNwCj1n1gVOgXy6Xo1qOFCXviX2j7Vkdh5_5NUfVV2YBnsv9B_F1LYB3KQxcIw7WcncqHemim1Da6TD1T48lTcmrp4Q05X38lBv61jwLBlh0JK84aPVogbgYN1CzP5b0cA-DUVlbVSpkUub6EifimgJOe5ACPO-3f-5ay2hj537TBZ78T1Szkik7ymwtQ4EF8ZGAK-kCBvrF-ot7vMAJyMn4CTc" />
          <div className="relative z-20 p-6 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high text-tertiary font-label text-xs tracking-wider rounded-full uppercase border border-outline-variant/15 shadow-[0_4px_12px_rgba(255,115,74,0.1)]">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  INNINGS 1 - OVER 18.4
                </span>
              </div>
              <div className="text-right">
                <span className="text-secondary font-headline text-sm font-bold tracking-wider uppercase block">Req Run Rate</span>
                <span className="text-on-surface font-body font-semibold text-lg">--</span>
              </div>
            </div>
            <div className="mt-8 flex items-baseline gap-4 flex-wrap">
              <h1 className="font-headline font-black text-[5rem] md:text-[7rem] leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container drop-shadow-[0_0_12px_rgba(165,255,184,0.3)] tracking-tighter">
                184/4
              </h1>
              <span className="text-on-surface-variant font-headline text-xl md:text-3xl font-bold">(18.4)</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <p className="font-body text-surface-tint text-lg">Current Run Rate: <span className="font-bold">9.85</span></p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-tertiary/10 rounded-full blur-[40px] pointer-events-none"></div>
          <div>
            <h3 className="font-headline text-secondary tracking-widest uppercase text-xs mb-4">Win Predictor</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="font-headline font-bold text-2xl text-primary">68%</span>
              <span className="font-headline font-bold text-lg text-on-surface-variant">32%</span>
            </div>
            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: '68%' }}></div>
              <div className="h-full bg-surface-variant" style={{ width: '32%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-body text-on-surface-variant">
              <span>HOME TEAM</span>
              <span>AWAY</span>
            </div>
          </div>
          <div className="mt-8 bg-surface-container-high p-4 rounded-lg border border-outline-variant/15">
            <h3 className="font-headline text-secondary tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Match Note
            </h3>
            <p className="font-body text-sm text-on-surface">Home team requires a strong finish. Target projected at 215 based on current trajectory.</p>
          </div>
        </div>
      </section>

      {/* Batters & Bowler */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-surface-container rounded-xl p-6">
          <h2 className="font-headline text-secondary text-sm tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-outline-variant/15 pb-2">
            <span className="material-symbols-outlined">sports_cricket</span>
            Batters
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high border border-primary overflow-hidden relative">
                  <img alt="Marcus Jensen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYf0OWW-51PF7eEHyDl2Ne3k61ARrpguz4pRYPiD1K3XWTXC9SvSOhN6dTUr4Ff2h8LCPzinIj7J-QfptrWo2wtzMPb_zkkg2EMqSJX7JuQdwSp7IOvem974_DEmajQZaxyM0OKBYGR9q-w6x_4rEA03d2vfiY-YUbw8mYJ-mKFTEQKCJ5X92v-l6rsLK49D-tiRdHu4lvCVVcVwUSPbgyFRdklujwxAorCK2WuBXo3C75xzac4eHhVwhvZsBR8y1vxRwCsEQC1ik" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface-container"></div>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                    Marcus Jensen <span className="text-primary">*</span>
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant">48 balls</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-3xl text-primary drop-shadow-[0_0_8px_rgba(165,255,184,0.2)]">82</span>
                <div className="flex gap-2 text-xs font-body text-on-surface-variant mt-1 justify-end">
                  <span>SR: 170.8</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 overflow-hidden">
                  <img alt="Tom Kendall" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_3hvx4KatGE9fCCZ__Zr8LnZmbA7oQ7SmxdwXP3wVXjF4p2uSCE6IO38y_PGMD3WgkvzROb7wyZ51CroFj7nz90sDTmOQB-gx0JLwtyozFN5YAZgsx0pX4eu9cfekCFtvsmozPAvVfQsF6iFXAM3JWoU9SwP-SzPBBpuMb0dVL_Bw123h5ItRwKcT2gW1EX2p4qrhXFa1GRyAbHMApOdWENwASWrr23_bmX2kzvnqlrRm-Qo9YQeIuu19K5LbWTl2RArUnRyrnmI" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-on-surface">Tom Kendall</h3>
                  <p className="font-body text-xs text-on-surface-variant">12 balls</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline font-black text-2xl text-on-surface">18</span>
                <div className="flex gap-2 text-xs font-body text-on-surface-variant mt-1 justify-end">
                  <span>SR: 150.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-surface-container rounded-xl p-6 flex flex-col justify-between">
          <h2 className="font-headline text-secondary text-sm tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-outline-variant/15 pb-2">
            <span className="material-symbols-outlined">sports_baseball</span>
            Current Bowler &amp; Over
          </h2>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high border border-secondary overflow-hidden">
                <img alt="D. Vance" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwyQSNYubt3dGQsDvhTplSylMHtdrZFDkHs4aCWtUnBHVE5BulaOirdaXHNKvkWttLoT8Suidc59e1EGogAMCqUpxm8sUAO4wuNDM-FHSXyw2CEdqn-MdZKTEWlQV14WbZ9nA_fSvjM4VuTx5y_-bs-n2MxOwhrFriL50MB9NjJtF0OP_jkaDUxYLIlROzgCJYfay2hx-yCoEHBJ5vreazDUcVcJc3a5f-UF3JISnnvve5fvnK7pgQOlS3sd0q06zgaDUvdZ6tYAw" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface">D. Vance</h3>
                <p className="font-body text-xs text-on-surface-variant">Overs: 3.4</p>
              </div>
            </div>
            <div className="text-right flex items-baseline gap-2">
              <span className="font-headline font-black text-3xl text-secondary">1/38</span>
              <span className="font-body text-xs text-on-surface-variant">Econ: 10.36</span>
            </div>
          </div>
          <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/15 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-2 h-full bg-secondary-dim/20"></div>
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-3 pl-2">This Over (19th)</p>
            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 pl-2 snap-x hide-scrollbar">
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface flex items-center justify-center font-headline font-bold text-on-surface border border-outline-variant/30">1</div>
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface flex items-center justify-center font-headline font-bold text-on-surface border border-outline-variant/30">4</div>
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center font-headline font-bold text-primary border border-primary/50 shadow-[0_0_10px_rgba(165,255,184,0.2)]">6</div>
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-tertiary/20 flex items-center justify-center font-headline font-bold text-tertiary border border-tertiary/50">W</div>
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-dashed border-secondary flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <div className="snap-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/10 text-on-surface-variant/30">-</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Fan Zone */}
      <section className="bg-gradient-to-br from-secondary-container to-background rounded-xl p-[2px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
        <div className="bg-surface-container-lowest h-full w-full rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-label text-xs tracking-widest rounded-full uppercase border border-secondary/20 mb-4">Interactive Fan Zone</span>
            <h2 className="font-headline font-black text-3xl md:text-5xl text-on-surface leading-tight mb-4">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-md">Digital Wave</span>
            </h2>
            <p className="font-body text-on-surface-variant text-lg">Sync your phone flash with the stadium lights during the final over. Over 12,400 fans connected.</p>
          </div>
          <div className="shrink-0 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full group-hover:bg-primary/40 transition-colors duration-500"></div>
            <button
              onClick={() => {
                const el = document.documentElement;
                el.style.transition = 'filter 0.1s';
                let count = 0;
                const interval = setInterval(() => {
                  el.style.filter = count % 2 === 0 ? 'brightness(2) invert(1)' : '';
                  count++;
                  if (count > 5) { clearInterval(interval); el.style.filter = ''; }
                }, 150);
              }}
              className="relative bg-primary text-on-primary font-headline font-bold text-lg px-8 py-5 rounded-xl shadow-[0_8px_32px_rgba(165,255,184,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined">flashlight_on</span>
              Sync Device Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
