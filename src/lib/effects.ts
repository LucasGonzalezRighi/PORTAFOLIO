import { asset } from '@/lib/asset';
/**
 * ============================================================================
 * EFFECTS ENGINE — Sistema de animación e interacción del portfolio
 * ============================================================================
 * Port tipado del motor original del diseño. Los componentes declaran
 * comportamiento con atributos `data-*` y este motor los inicializa:
 *
 *   data-reveal      → aparición al entrar al viewport (con data-delay)
 *   data-anim        → título que se revela por palabras/caracteres con blur
 *   data-typewriter  → texto que se escribe con cursor
 *   data-count       → contador animado (data-decimals para decimales)
 *   data-tilt        → tarjeta con inclinación 3D (+ data-shine)
 *   data-fan         → hojas que se abren en abanico (cards de proyectos)
 *   data-flip        → flip 3D (detalle de experiencia)
 *   data-magnetic    → botón magnético
 *   data-sweep(-border/-auto) → barrido de color al hover
 *   data-hover       → estilos inline aplicados al hover (fidelidad al diseño)
 *   data-parallax    → parallax por scroll (data-speed)
 *   data-particles   → canvas de partículas conectadas
 *   data-spot / data-ring → spotlight + anillo que siguen el cursor
 *   data-nav / data-navlink / data-progress → navbar activa + barra progreso
 *   data-rail / data-node → línea de timeline + nodos activos
 *   data-zoom-section → entrada con zoom ligada al scroll
 *   data-exp-card / data-exp-btn / data-exp-grid / data-exp-line → filtro y
 *                      layout de la timeline de experiencia
 *   data-extra / data-more-btn / data-less-btn → ver más/menos proyectos
 *   data-sheen-band  → haz de luz que recorre la sección (certificaciones)
 *
 * Todo respeta `prefers-reduced-motion` y se limpia con destroy().
 * ============================================================================
 */

type Cleanup = () => void;

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const coarsePointer = () => window.matchMedia('(pointer: coarse)').matches;

export class EffectsEngine {
  private cleanups: Cleanup[] = [];
  /** Restauraciones de DOM (typewriters/títulos) para un destroy limpio */
  private restores: Cleanup[] = [];
  private mouse: { x: number; y: number } | null = null;
  private pRaf = 0;
  /** Cierres de abanicos por card (para poder cerrarlos desde el scroll) */
  private fanClosers = new WeakMap<HTMLElement, () => void>();
  private fanCloseBound = false;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private intervals: ReturnType<typeof setInterval>[] = [];

  // ── infraestructura ────────────────────────────────────────
  private on<K extends keyof WindowEventMap>(t: Window, ty: K, fn: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions): void;
  private on<K extends keyof DocumentEventMap>(t: Document, ty: K, fn: (e: DocumentEventMap[K]) => void, o?: AddEventListenerOptions): void;
  private on<K extends keyof HTMLElementEventMap>(t: HTMLElement, ty: K, fn: (e: HTMLElementEventMap[K]) => void, o?: AddEventListenerOptions): void;
  private on(target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions): void {
    target.addEventListener(type, fn, opts);
    this.cleanups.push(() => target.removeEventListener(type, fn, opts));
  }

  private onScrollAny(fn: () => void) {
    this.on(window, 'scroll', fn, { passive: true });
    this.on(document, 'scroll', fn, { passive: true, capture: true });
  }

  private later(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  }

  private every(fn: () => void, ms: number) {
    const i = setInterval(fn, ms);
    this.intervals.push(i);
    return i;
  }

  private step(fn: () => void) {
    try {
      fn();
    } catch (err) {
      console.warn('[portfolio] effect failed', err);
    }
  }

  // ── ciclo de vida ──────────────────────────────────────────
  init() {
    this.step(() => this.hoverStyles());
    this.step(() => this.tapFlips());
    this.step(() => this.reveal());
    this.step(() => this.counters());
    this.step(() => this.navScroll());
    this.step(() => this.nodes());
    this.step(() => this.flips());
    this.step(() => this.expFilter());
    this.step(() => this.showMore());
    if (reducedMotion()) {
      this.showAll();
      return;
    }
    this.step(() => this.textAnims());
    this.step(() => this.typewriters());
    if (!coarsePointer()) {
      // Efectos de puntero fino: sin sentido (y molestos) en táctil
      this.step(() => this.tilt());
      this.step(() => this.magnetic());
    }
    this.step(() => this.fans());
    this.step(() => this.ripple());
    this.step(() => this.sweepsAuto());
    this.step(() => this.sweeps());
    this.step(() => this.pointer());
    this.step(() => this.parallax());
    this.step(() => this.scrollFx());
    this.step(() => this.particles());
    this.step(() => this.zoomSection());
    this.step(() => this.sheenWave());
    // Reescaneo ante cambios del DOM (nodos nuevos de React):
    // todos los inicializadores son idempotentes vía dataset flags.
    const rescan = () => {
      this.step(() => this.hoverStyles());
      this.step(() => this.tapFlips());
      this.step(() => this.reveal());
      if (!reducedMotion()) {
        if (!coarsePointer()) {
          this.step(() => this.magnetic());
          this.step(() => this.tilt());
        }
        this.step(() => this.ripple());
        this.step(() => this.fans());
        this.step(() => this.sweepsAuto());
        this.step(() => this.sweeps());
      }
    };
    let moTimer: ReturnType<typeof setTimeout> | null = null;
    const mo = new MutationObserver(() => {
      if (moTimer) clearTimeout(moTimer);
      moTimer = setTimeout(rescan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    this.cleanups.push(() => {
      mo.disconnect();
      if (moTimer) clearTimeout(moTimer);
    });
    // Failsafe: si algo quedó oculto en viewport, mostrarlo.
    this.later(() => {
      const hidden = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].some((el) => {
        const r = el.getBoundingClientRect();
        return getComputedStyle(el).opacity === '0' && r.top < window.innerHeight && r.bottom > 0;
      });
      if (hidden) this.showAll();
    }, 2500);
  }

  destroy() {
    cancelAnimationFrame(this.pRaf);
    this.timers.forEach(clearTimeout);
    this.intervals.forEach(clearInterval);
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
    // Restaurar DOM modificado (textos de typewriter, títulos partidos)
    this.restores.forEach((fn) => fn());
    this.restores = [];
    // Limpiar flags de inicialización para que un próximo montaje
    // (StrictMode, HMR, remount) pueda volver a enlazar todo.
    const flags = [
      'rvInit', 'rvDone', 'cInit', 'cRan', 'twInit', 'twDone', 'twGroupDone',
      'aInit', 'tInit', 'fanBound', 'mInit', 'rInit', 'swBound', 'fInit', 'hvInit', 'tfInit',
    ];
    document
      .querySelectorAll<HTMLElement>(
        '[data-rv-init],[data-rv-done],[data-c-init],[data-c-ran],[data-tw-init],[data-tw-done],[data-tw-group-done],[data-a-init],[data-t-init],[data-fan-bound],[data-m-init],[data-r-init],[data-sw-bound],[data-f-init],[data-hv-init]',
      )
      .forEach((el) => {
        flags.forEach((f) => delete el.dataset[f]);
      });
  }

  private showAll() {
    document.querySelectorAll<HTMLElement>('[data-reveal],[data-anim],[data-typewriter]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  }

  // ── data-hover: estilos inline al hover ────────────────────
  private hoverStyles() {
    document.querySelectorAll<HTMLElement>('[data-hover]').forEach((el) => {
      if (el.dataset.hvInit) return;
      el.dataset.hvInit = '1';
      const css = el.dataset.hover || '';
      const decls = css.split(';').map((d) => d.trim()).filter(Boolean).map((d) => {
        const i = d.indexOf(':');
        return [d.slice(0, i).trim(), d.slice(i + 1).trim()] as const;
      });
      const prev = new Map<string, string>();
      this.on(el, 'pointerenter', () => {
        decls.forEach(([p, v]) => {
          prev.set(p, el.style.getPropertyValue(p));
          el.style.setProperty(p, v);
        });
      });
      this.on(el, 'pointerleave', () => {
        decls.forEach(([p]) => {
          el.style.setProperty(p, prev.get(p) || '');
        });
      });
    });
  }

  // ── flip por tap en pantallas táctiles (cards del stack) ───
  private tapFlips() {
    if (!coarsePointer()) return;
    document.querySelectorAll<HTMLElement>('[data-tapflip]').forEach((el) => {
      if (el.dataset.tfInit) return;
      el.dataset.tfInit = '1';
      this.on(el, 'click', () => {
        el.classList.toggle('is-flipped');
      });
    });
  }

  // ── reveal ─────────────────────────────────────────────────
  private reveal() {
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => {
      if (el.dataset.rvDone) {
        // ya se reveló en un montaje anterior: mostrar sin re-animar
        el.style.opacity = '1';
        el.style.transform = 'none';
        return false;
      }
      if (el.dataset.rvInit) return false;
      el.dataset.rvInit = '1';
      return true;
    });
    if (!els.length) return;
    const show = (el: HTMLElement) => {
      el.dataset.rvDone = '1';
      const d = +(el.dataset.delay || 0);
      this.later(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, d);
    };
    if (!('IntersectionObserver' in window)) {
      els.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    // Fallback por si el observer no entrega (frames throttled).
    const check = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        if (el.dataset.rvDone) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) {
          show(el);
          io.unobserve(el);
        }
      });
    };
    this.onScrollAny(check);
    this.every(check, 400);
    this.cleanups.push(() => io.disconnect());
  }

  // ── contadores ─────────────────────────────────────────────
  private counters() {
    const els = [...document.querySelectorAll<HTMLElement>('[data-count]')].filter((el) => {
      if (el.dataset.cInit) return false;
      el.dataset.cInit = '1';
      return true;
    });
    if (!els.length) return;
    const run = (group: HTMLElement[]) => {
      const start = performance.now();
      const stepFrame = (now: number) => {
        const t = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - t, 3);
        group.forEach((el) => {
          const target = +(el.dataset.count || 0);
          const dec = +(el.dataset.decimals || 0);
          const value = target * eased;
          el.textContent = dec
            ? value.toFixed(dec).replace('.', ',')
            : String(Math.round(value)).padStart(2, '0');
        });
        if (t < 1) this.later(() => stepFrame(performance.now()), 16);
      };
      stepFrame(performance.now());
    };
    const groups = new Map<HTMLElement, HTMLElement[]>();
    els.forEach((el) => {
      const key = (el.closest('section') || document.body) as HTMLElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(el);
    });
    const fire = (key: HTMLElement) => {
      if (key.dataset.cRan) return;
      key.dataset.cRan = '1';
      const group = groups.get(key);
      if (group) this.later(() => run(group), key.id === 'top' ? 1150 : 120);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          fire(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.05 },
    );
    groups.forEach((_, key) => io.observe(key));
    const check = () => {
      const vh = window.innerHeight;
      groups.forEach((_, key) => {
        if (key.dataset.cRan) return;
        const r = key.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) fire(key);
      });
    };
    this.onScrollAny(check);
    this.every(check, 400);
    this.later(check, 300);
    // Failsafe: si por cualquier motivo la animación no corrió (p. ej. un
    // observer perdido), a los 4s se escribe el valor final: nunca quedan "0".
    this.later(() => {
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const key = (el.closest('section') || document.body) as HTMLElement;
        if (key.dataset.cRan) return;
        const target = +(el.dataset.count || 0);
        const dec = +(el.dataset.decimals || 0);
        el.textContent = dec ? target.toFixed(dec).replace('.', ',') : String(Math.round(target)).padStart(2, '0');
      });
    }, 4000);
    this.cleanups.push(() => io.disconnect());
  }

  // ── navbar: progreso, fondo, link activo, rail, nodos ──────
  private navScroll() {
    let queued = false;
    const apply = () => {
      queued = false;
      const nav = document.querySelector<HTMLElement>('[data-nav]');
      const bar = document.querySelector<HTMLElement>('[data-progress]');
      const links = [...document.querySelectorAll<HTMLElement>('[data-navlink]')];
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      if (bar) bar.style.width = `${Math.min(100, (y / max) * 100).toFixed(2)}%`;
      if (nav) {
        const solid = y > 40;
        nav.style.background = solid ? 'rgba(5,8,22,.72)' : 'rgba(5,8,22,0)';
        nav.style.backdropFilter = solid ? 'blur(16px)' : 'blur(0px)';
        nav.style.borderBottomColor = solid ? 'rgba(78,159,212,.12)' : 'rgba(78,159,212,0)';
      }
      const rail = document.querySelector<HTMLElement>('[data-rail]');
      if (rail) {
        const grid = rail.parentElement?.parentElement;
        if (grid) {
          const gr = grid.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, (window.innerHeight * 0.62 - gr.top) / Math.max(1, gr.height)));
          rail.style.transform = `scaleY(${p.toFixed(3)})`;
        }
      }
      const nodes = [...document.querySelectorAll<HTMLElement>('[data-node]')];
      if (nodes.length) {
        const mid = window.innerHeight * 0.45;
        let best: HTMLElement | null = null;
        let bestD = Infinity;
        nodes.forEach((n) => {
          const r = n.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < bestD) {
            bestD = d;
            best = n;
          }
        });
        nodes.forEach((n) => {
          const active = n === best;
          n.style.transform = active ? 'scale(1.45)' : 'scale(1)';
          n.style.filter = active ? 'drop-shadow(0 0 10px rgba(79,201,141,.6))' : 'none';
        });
      }
      let current: HTMLElement | null = null;
      links.forEach((l) => {
        const sec = document.getElementById(l.dataset.navlink || '');
        if (sec && sec.getBoundingClientRect().top <= 140) current = l;
      });
      links.forEach((l) => {
        const active = l === current;
        l.style.color = active ? 'var(--lime-400)' : 'var(--text-secondary)';
        l.style.borderBottomColor = active ? 'var(--lime-400)' : 'transparent';
      });
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };
    this.onScrollAny(onScroll);
    this.on(window, 'resize', onScroll);
    apply();
  }

  // ── nodos de timeline: moverlos al card revelado ───────────
  private nodes() {
    document.querySelectorAll<HTMLElement>('[data-node]').forEach((n) => {
      const host = n.closest<HTMLElement>('[data-reveal]');
      if (host && n.parentElement !== host) host.appendChild(n);
    });
  }

  // ── flip de cards de experiencia ───────────────────────────
  private flips() {
    document.querySelectorAll<HTMLElement>('[data-flip]').forEach((flip) => {
      if (flip.dataset.fInit) return;
      flip.dataset.fInit = '1';
      const host = (flip.parentElement || flip) as HTMLElement;
      host.style.cursor = 'pointer';
      host.setAttribute('role', 'button');
      host.setAttribute('tabindex', '0');
      host.setAttribute('aria-label', 'Ver detalle de la experiencia');
      const toggle = () => {
        const open = flip.dataset.open === '1';
        flip.dataset.open = open ? '0' : '1';
        flip.style.transform = open ? 'rotateY(0deg)' : 'rotateY(180deg)';
        host.setAttribute('aria-pressed', open ? 'false' : 'true');
      };
      this.on(host, 'click', (e) => {
        if ((e.target as HTMLElement).closest('a')) return;
        toggle();
      });
      this.on(host, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  // ── filtro y layout de experiencia ─────────────────────────
  private expFilter() {
    // El filtro lo aplica el escenario (data-expstack): acá solo el estado.
    const stage = document.querySelector<HTMLElement>('[data-expstack]');
    const btns = [...document.querySelectorAll<HTMLElement>('[data-exp-btn]')];
    if (!stage || !btns.length) return;
    const apply = (f: string) => {
      stage.dataset.expFilter = f;
      stage.querySelectorAll<HTMLElement>('[data-flip]').forEach((flip) => {
        if (flip.dataset.open === '1') {
          flip.dataset.open = '0';
          flip.style.transform = 'rotateY(0deg)';
        }
      });
      btns.forEach((b) => {
        const act = b.dataset.expBtn === f;
        b.style.borderColor = act ? 'var(--blue-400)' : 'rgba(150,160,172,.22)';
        b.style.background = act ? 'rgba(16,42,67,.5)' : 'transparent';
        b.style.color = act ? '#fff' : 'var(--text-dim)';
        b.style.filter = act ? '' : 'grayscale(1)';
      });
    };
    btns.forEach((b) => this.on(b, 'click', () => apply(b.dataset.expBtn || 'all')));
    apply('all');
  }

  // ── ver más / ver menos proyectos ──────────────────────────
  private showMore() {
    const extras = [...document.querySelectorAll<HTMLElement>('[data-extra]')];
    const row = document.querySelector<HTMLElement>('[data-more-row]');
    const lessRow = document.querySelector<HTMLElement>('[data-less-row]');
    const btn = document.querySelector<HTMLElement>('[data-more-btn]');
    const lessBtn = document.querySelector<HTMLElement>('[data-less-btn]');
    if (!extras.length || !btn) return;
    const setOpen = (open: boolean) => {
      extras.forEach((e) => {
        e.style.display = open ? 'flex' : 'none';
        e.style.filter = '';
        e.style.pointerEvents = open ? '' : 'none';
        if (open) {
          e.style.opacity = '1';
          e.style.transform = 'none';
        }
      });
      if (row) row.style.display = open ? 'none' : 'flex';
      if (lessRow) lessRow.style.display = open ? 'flex' : 'none';
    };
    this.on(btn, 'click', () => setOpen(true));
    if (lessBtn) {
      this.on(lessBtn, 'click', () => {
        setOpen(false);
        document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    setOpen(false);
  }

  // ── títulos por palabras/caracteres ────────────────────────
  private splitNode(node: Node, out: HTMLElement[], mode?: string) {
    if (node.nodeType === 3) {
      const text = node.textContent || '';
      const parts = mode === 'words' ? text.split(/(\s+)/) : [...text];
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const s = document.createElement('span');
        s.textContent = part;
        s.style.cssText =
          'display:inline-block;opacity:0;filter:blur(10px);transform:translateY(18px);transition:opacity .7s var(--ease-out),filter .7s var(--ease-out),transform .7s var(--ease-out);will-change:opacity,transform';
        if (part === ' ') s.style.whiteSpace = 'pre';
        frag.appendChild(s);
        out.push(s);
      });
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === 1) {
      [...node.childNodes].forEach((c) => this.splitNode(c, out, mode));
    }
  }

  private textAnims() {
    const targets = [...document.querySelectorAll<HTMLElement>('[data-anim]')].filter((el) => {
      if (el.dataset.aInit) return false;
      el.dataset.aInit = '1';
      return true;
    });
    if (!targets.length) return;
    const map = new Map<HTMLElement, HTMLElement[]>();
    targets.forEach((el) => {
      const original = el.innerHTML;
      this.restores.push(() => {
        el.innerHTML = original;
      });
      const out: HTMLElement[] = [];
      [...el.childNodes].forEach((c) => this.splitNode(c, out, el.dataset.anim));
      map.set(el, out);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const parts = map.get(el) || [];
          const step = el.dataset.anim === 'words' ? 55 : 16;
          parts.forEach((s, i) =>
            this.later(() => {
              s.style.opacity = '1';
              s.style.filter = 'blur(0)';
              s.style.transform = 'none';
            }, i * step),
          );
          io.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );
    targets.forEach((el) => io.observe(el));
    this.cleanups.push(() => io.disconnect());
  }

  // ── typewriter ─────────────────────────────────────────────
  private typewriters() {
    interface Seg { text: string; el: HTMLElement | null }
    interface TwState { segs: Seg[]; total: number; cursor: HTMLElement; holders: HTMLElement[]; shown: number }

    const els = [...document.querySelectorAll<HTMLElement>('[data-typewriter]')].filter((el) => {
      if (el.dataset.twInit) return false;
      el.dataset.twInit = '1';
      return true;
    });
    if (!els.length) return;
    const specs = new Map<HTMLElement, Seg[]>();
    els.forEach((el) => {
      const original = el.innerHTML;
      const originalStyle = el.getAttribute('style');
      this.restores.push(() => {
        el.innerHTML = original;
        if (originalStyle === null) el.removeAttribute('style');
        else el.setAttribute('style', originalStyle);
      });
      const segs: Seg[] = [...el.childNodes].map((n) =>
        n.nodeType === 3
          ? { text: n.textContent || '', el: null }
          : { text: n.textContent || '', el: (n as HTMLElement).cloneNode(false) as HTMLElement },
      );
      specs.set(el, segs);
      if (!el.style.minHeight) el.style.minHeight = `${el.offsetHeight}px`;
      el.textContent = '';
      if (el.dataset.twBlur) {
        el.style.filter = 'blur(14px)';
        el.style.transition = 'filter .9s var(--ease-out)';
      }
    });
    const groups = new Map<HTMLElement, HTMLElement[]>();
    els.forEach((el) => {
      const key = (el.closest('section') || el.parentElement) as HTMLElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(el);
    });
    const prep = (el: HTMLElement): TwState => {
      const segs = specs.get(el)!;
      const total = segs.reduce((n, s) => n + s.text.length, 0) || 1;
      el.style.filter = 'blur(0)';
      const cursor = document.createElement('span');
      cursor.setAttribute('aria-hidden', 'true');
      cursor.style.cssText =
        'display:inline-block;width:2px;height:1em;margin-left:.12em;vertical-align:-.14em;border-radius:1px;background:var(--lime-400);box-shadow:0 0 10px rgba(107,245,168,.7);animation:blink 1.05s steps(1) infinite';
      el.appendChild(cursor);
      const holders = segs.map((seg) => {
        const h = seg.el ? (seg.el.cloneNode(false) as HTMLElement) : document.createElement('span');
        el.insertBefore(h, cursor);
        return h;
      });
      return { segs, total, cursor, holders, shown: -1 };
    };
    const render = (st: TwState, chars: number) => {
      if (chars === st.shown) return;
      st.shown = chars;
      let left = chars;
      for (let i = 0; i < st.segs.length; i++) {
        const len = st.segs[i].text.length;
        const take = Math.max(0, Math.min(len, left));
        st.holders[i].textContent = take ? st.segs[i].text.slice(0, take) : '';
        left -= len;
      }
    };
    const startGroup = (list: HTMLElement[]) => {
      const states = list.map(prep);
      const span = Math.max(...list.map((el) => +(el.dataset.twSpan || 2600)));
      const t0 = performance.now() + 200;
      const frame = () => {
        const now = performance.now();
        const p = Math.min(1, Math.max(0, (now - t0) / span));
        states.forEach((st) => render(st, Math.round(st.total * p)));
        if (p < 1) {
          this.later(frame, 16);
        } else {
          this.later(
            () =>
              states.forEach((st) => {
                st.cursor.style.transition = 'opacity .6s';
                st.cursor.style.opacity = '0';
              }),
            1400,
          );
        }
      };
      frame();
    };
    const fireGroup = (key: HTMLElement) => {
      if (key.dataset.twGroupDone) return;
      key.dataset.twGroupDone = '1';
      io.unobserve(key);
      const list = (groups.get(key) || []).filter((el) => !el.dataset.twDone);
      list.forEach((el) => {
        el.dataset.twDone = '1';
      });
      if (list.length) startGroup(list);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) fireGroup(e.target as HTMLElement);
        });
      },
      { threshold: 0.05 },
    );
    groups.forEach((_, key) => io.observe(key));
    const check = () => {
      const vh = window.innerHeight;
      groups.forEach((_, key) => {
        if (key.dataset.twGroupDone) return;
        const r = key.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) fireGroup(key);
      });
    };
    this.onScrollAny(check);
    this.every(check, 400);
    this.later(check, 300);
    this.cleanups.push(() => io.disconnect());
  }

  // ── barridos de hover ──────────────────────────────────────
  private sweepsAuto() {
    document.querySelectorAll<HTMLElement>('[data-sweep-auto]').forEach((el) => {
      if (el.dataset.swReady) return;
      el.dataset.swReady = '1';
      const kind = el.dataset.sweepAuto;
      const cs = getComputedStyle(el);
      if (cs.position === 'static') el.style.position = 'relative';
      [...el.childNodes].forEach((node) => {
        if (node.nodeType === 1) {
          const n = node as HTMLElement;
          n.style.position = n.style.position || 'relative';
          n.style.zIndex = '1';
        } else if (node.nodeType === 3 && node.textContent?.trim()) {
          const wrap = document.createElement('span');
          wrap.style.cssText = 'position:relative;z-index:1';
          wrap.textContent = node.textContent;
          node.parentNode?.replaceChild(wrap, node);
        }
      });
      const band = document.createElement('span');
      band.setAttribute('aria-hidden', 'true');
      const radius = cs.borderRadius;
      band.style.cssText =
        kind === 'border'
          ? `position:absolute;inset:-1px;border-radius:${radius};border:1px solid var(--green-400);background:rgba(150,160,172,.22);pointer-events:none;clip-path:inset(0 100% 0 0);transition:clip-path 1.5s cubic-bezier(.4,.05,.25,1);z-index:0`
          : `position:absolute;inset:0;border-radius:${radius};background:var(--green-400);pointer-events:none;clip-path:inset(0 100% 0 0);transition:clip-path 1.5s cubic-bezier(.4,.05,.25,1);z-index:0`;
      el.insertBefore(band, el.firstChild);
      el.setAttribute('data-sweep', '1');
    });
  }

  private sweeps() {
    document.querySelectorAll<HTMLElement>('[data-sweep],[data-sweep-border]').forEach((el) => {
      if (el.dataset.swBound) return;
      el.dataset.swBound = '1';
      const band = el.firstElementChild as HTMLElement | null;
      if (!band) return;
      this.on(el, 'pointerenter', () => {
        band.style.clipPath = 'inset(0 0 0 0)';
      });
      this.on(el, 'pointerleave', () => {
        band.style.transition = 'clip-path .5s ease-out';
        band.style.clipPath = 'inset(0 100% 0 0)';
        this.later(() => {
          band.style.transition = 'clip-path 1.5s cubic-bezier(.4,.05,.25,1)';
        }, 520);
      });
    });
  }

  // ── ripple al click ────────────────────────────────────────
  private ripple() {
    document.querySelectorAll<HTMLElement>('[data-magnetic],[data-flip-toggle],[data-ripple]').forEach((el) => {
      if (el.dataset.rInit) return;
      el.dataset.rInit = '1';
      const cs = getComputedStyle(el);
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';
      this.on(el, 'pointerdown', (e) => {
        const r = el.getBoundingClientRect();
        const d = Math.max(r.width, r.height) * 2;
        const s = document.createElement('span');
        s.style.cssText = `position:absolute;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px;width:${d}px;height:${d}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.45),transparent 65%);pointer-events:none;transform:scale(.2);opacity:.9;transition:transform .6s var(--ease-out),opacity .6s`;
        el.appendChild(s);
        requestAnimationFrame(() => {
          s.style.transform = 'scale(1)';
          s.style.opacity = '0';
        });
        this.later(() => s.remove(), 650);
      });
    });
  }

  // ── tilt 3D ────────────────────────────────────────────────
  private tilt() {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      if (card.dataset.tInit) return;
      card.dataset.tInit = '1';
      const shine = card.querySelector<HTMLElement>('[data-shine]');
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(1000px) rotateY(${((px - 0.5) * 7).toFixed(2)}deg) rotateX(${((0.5 - py) * 7).toFixed(2)}deg) translateY(-4px)`;
        if (shine) {
          shine.style.opacity = '1';
          shine.style.transform = `translate3d(${e.clientX - r.left - shine.offsetWidth / 2}px,${e.clientY - r.top - shine.offsetHeight / 2}px,0)`;
        }
      };
      const leave = () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        if (shine) shine.style.opacity = '0';
      };
      card.style.transition =
        'opacity var(--dur-slow) var(--ease-out), transform .5s var(--ease-out), border-color .35s, box-shadow .35s';
      this.on(card, 'pointermove', move);
      this.on(card, 'pointerleave', leave);
    });
  }

  // ── abanico de proyectos ───────────────────────────────────
  private fans() {
    // Cierre de seguridad: si al scrollear la card salió de abajo del cursor
    // sin disparar pointerleave, el abanico quedaba "pegado" abierto y las
    // hojas pisaban a las cards vecinas. En cada scroll se cierra todo lo
    // que ya no está realmente hovereado.
    if (!this.fanCloseBound) {
      this.fanCloseBound = true;
      this.onScrollAny(() => {
        document.querySelectorAll<HTMLElement>('[data-fan][data-fan-open]').forEach((card) => {
          if (!card.matches(':hover')) {
            const close = this.fanClosers.get(card);
            if (close) close();
          }
        });
      });
    }
    document.querySelectorAll<HTMLElement>('[data-fan]').forEach((card) => {
      if (card.dataset.fanBound) return;
      card.dataset.fanBound = '1';
      const s1 = card.querySelector<HTMLElement>('[data-sheet="1"]');
      const s2 = card.querySelector<HTMLElement>('[data-sheet="2"]');
      if (!s1 || !s2) return;
      const enter = () => {
        card.setAttribute('data-fan-open', '1');
        card.style.zIndex = '5';
        s1.style.opacity = '1';
        s2.style.opacity = '1';
        s1.style.transform = 'rotate(-2deg) translate(-28px,16px) scale(.985)';
        s2.style.transform = 'rotate(2deg) translate(28px,16px) scale(.985)';
      };
      const leave = () => {
        card.removeAttribute('data-fan-open');
        card.style.zIndex = '';
        s1.style.opacity = '0';
        s2.style.opacity = '0';
        s1.style.transform = 'rotate(0deg) translate(0,0) scale(1)';
        s2.style.transform = 'rotate(0deg) translate(0,0) scale(1)';
      };
      this.fanClosers.set(card, leave);
      this.on(card, 'pointerenter', enter);
      this.on(card, 'pointerleave', leave);
      this.on(card, 'pointercancel', leave);
      this.on(card, 'focus', enter);
      this.on(card, 'blur', leave);
    });
  }

  // ── botones magnéticos ─────────────────────────────────────
  private magnetic() {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      if (el.dataset.mInit) return;
      el.dataset.mInit = '1';
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = `translate3d(${(dx * 10).toFixed(1)}px,${(dy * 8).toFixed(1)}px,0) scale(1.03)`;
      };
      const leave = () => {
        el.style.transform = 'translate3d(0,0,0) scale(1)';
      };
      this.on(el, 'pointermove', move);
      this.on(el, 'pointerleave', leave);
    });
  }

  // ── spotlight + anillo de cursor ───────────────────────────
  private pointer() {
    if (coarsePointer()) return; // sin cursor en táctil
    const spot = document.querySelector<HTMLElement>('[data-spot]');
    const ring = document.querySelector<HTMLElement>('[data-ring]');
    if (!spot && !ring) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let sx = tx, sy = ty, rx = tx, ry = ty;
    let on = false;
    this.on(
      window,
      'pointermove',
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
        this.mouse = { x: e.clientX, y: e.clientY };
        if (!on) {
          on = true;
          if (spot) spot.style.opacity = '1';
          if (ring) ring.style.opacity = '1';
        }
      },
      { passive: true },
    );
    this.on(window, 'pointerdown', () => {
      if (ring) {
        ring.style.width = '16px';
        ring.style.height = '16px';
      }
    });
    this.on(window, 'pointerup', () => {
      if (ring) {
        ring.style.width = '26px';
        ring.style.height = '26px';
      }
    });
    const loop = () => {
      sx += (tx - sx) * 0.07;
      sy += (ty - sy) * 0.07;
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      if (spot) spot.style.transform = `translate3d(${sx}px,${sy}px,0)`;
      // rotate(45deg) convierte el cuadrado del anillo en rombo
      if (ring) ring.style.transform = `translate3d(${rx}px,${ry}px,0) rotate(45deg)`;
      this.pRaf = requestAnimationFrame(loop);
    };
    loop();
  }

  // ── parallax ───────────────────────────────────────────────
  private parallax() {
    let queued = false;
    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.speed || '0.1');
        const off = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };
    this.onScrollAny(onScroll);
    this.on(window, 'resize', onScroll);
    apply();
  }

  // ── entrada con zoom (transición Stack → Experiencia) ──────
  private zoomSection() {
    const els = [...document.querySelectorAll<HTMLElement>('[data-zoom-section]')];
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top > vh + 80 || r.top < -80) {
          if (r.top < 0) {
            el.style.transform = '';
            el.style.opacity = '';
            el.style.borderRadius = '';
          }
          continue;
        }
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
        const ease = 1 - Math.pow(1 - p, 3);
        const scale = 0.86 + 0.14 * ease;
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.opacity = (0.35 + 0.65 * ease).toFixed(3);
        el.style.borderRadius = `${(28 * (1 - ease)).toFixed(1)}px`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    this.onScrollAny(onScroll);
    this.on(window, 'resize', onScroll);
    this.cleanups.push(() => cancelAnimationFrame(raf));
  }

  // ── haz de luz de certificaciones ──────────────────────────
  private sheenWave() {
    const sec = document.getElementById('certificaciones');
    if (!sec) return;
    const bands = [...sec.querySelectorAll<HTMLElement>('[data-sheen-band]')];
    if (!bands.length) return;
    // El motor coordina un único haz que cruza toda la sección;
    // se desactiva la animación CSS individual de cada banda.
    bands.forEach((b) => {
      b.style.animation = 'none';
    });
    const period = 6000;
    let raf = 0;
    const tick = (now: number) => {
      const sr = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (sr.bottom < 0 || sr.top > vh) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const w = Math.max(1, sr.width);
      const p = (now % period) / period;
      const beamX = (p * 1.5 - 0.25) * w; // un solo haz cruza toda la sección
      bands.forEach((b) => {
        const parent = b.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        b.style.transform = `translateX(${(beamX - (r.left - sr.left)).toFixed(1)}px) skewX(-18deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    this.cleanups.push(() => cancelAnimationFrame(raf));
  }

  // ── efectos ligados al scroll (estilo damrod.dev) ─────────────
  // Todos los valores se SUAVIZAN con interpolación amortiguada (lerp por
  // frame, tipo GSAP ScrollSmoother): nada salta, todo llega con inercia.
  // data-bandx="0.45"        → translateX horizontal ligado al scroll
  // data-splitx="left|right" → panel que entra desde su lado
  // data-secfx="rise|zoom"   → transición de sección completa (suave)
  // data-pinsplit            → contacto pineado (--open/--reveal/--exit)
  // data-herotilt            → hero que se vuelve tarjeta, se inclina y se va (estilos inline)
  // data-depthcard           → card que entra desde el fondo (Stack)
  // data-exitfx              → sección que sale con desenfoque + fundido
  // data-footrow/footword    → contenido del footer que entra con el scroll
  // data-expstack            → Experiencia: mazo de cards apilado (sticky)
  // data-cardexit            → salida "carta de póker" (Sobre mí): gira ~90° a la derecha y se va abajo a la izquierda
  // data-overlayin           → sección que sube y se apoya encima de la anterior (Stack)
  // data-arctext             → texto sobre arco SVG
  private scrollFx() {
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    const SMOOTH = 0.12; // factor de amortiguación por frame
    const cur = new WeakMap<Element, Record<string, number>>();
    const sm = (el: Element, key: string, target: number, k = SMOOTH) => {
      let m = cur.get(el);
      if (!m) {
        m = {};
        cur.set(el, m);
      }
      const prev = m[key];
      const next = prev === undefined ? target : prev + (target - prev) * k;
      m[key] = Math.abs(next - target) < 0.0004 ? target : next;
      return m[key];
    };
    let raf = 0;
    let lastT = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // dt para que el suavizado del hero sea igual en 60 Hz y en 144 Hz
      const now = performance.now();
      const dt = Math.min(64, now - lastT);
      lastT = now;
      document.querySelectorAll<HTMLElement>('[data-secfx]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const mode = el.dataset.secfx;
        // ── Salida "carta de póker" (data-cardexit, solo desktop ≥900px, sin pin) ──
        // Mientras el final de la sección sube (85 % de la pantalla → arriba):
        //   x 0.00–0.45  la sección se recorta a proporción de carta (clip-path
        //                con esquinas redondeadas) y aparece la "cara": marco
        //                lima fino + índices "01 / LGR" en dos esquinas
        //   x 0.20–1.00  gira en sentido antihorario (~90°, con leve
        //                inclinación 3D), se achica y viaja a la esquina
        //                inferior derecha
        //   x 0.60–1.00  se desvanece
        // Todo pegado al scroll, ease-in-out senoidal, suavizado dt.
        if (el.dataset.cardexit && vw >= 900) {
          // posición SIN transform (getBoundingClientRect incluye el
          // transform propio → sería un lazo que hace saltar la animación)
          let absTop = 0;
          for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) absTop += n.offsetTop;
          const rTop = absTop - window.scrollY;
          const r = { top: rTop, bottom: rTop + el.offsetHeight };
          const sine = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
          const k = 1 - Math.exp(-dt / 55);
          const ein = sine((vh - r.top) / (vh * 0.6));
          const x = sm(el, 'cx', clamp01((vh * 0.85 - r.bottom) / (vh * 0.85)), k);
          const tyIn = sm(el, 'ty', (1 - ein) * 44, k);
          const c = sine(x / 0.45); // formación de la carta
          const t = sine((x - 0.2) / 0.8); // giro + viaje
          const f = sine((x - 0.6) / 0.4); // desvanecido
          const W = el.offsetWidth;
          const H = el.offsetHeight;
          // carta: alto ≤ 86 % de la pantalla, proporción de naipe (5:7)
          const cardH = Math.min(H, vh * 0.86);
          const cardW = Math.min(W, cardH * 0.72);
          const inX = ((W - cardW) / 2) * c;
          const inY = ((H - cardH) / 2) * c;
          const rad = 34 * c;
          // mantiene la carta centrada en pantalla mientras se forma (si no,
          // la sección ya se fue por arriba cuando gira)
          const hold = (vh * 0.5 - (r.top + H / 2)) * c;
          // queda DEBAJO de Stack (que sube y la tapa como otra carta)
          el.style.zIndex = '';
          el.style.clipPath = c > 0.001 ? `inset(${inY.toFixed(1)}px ${inX.toFixed(1)}px round ${rad.toFixed(1)}px)` : '';
          // el contenido se achica para entrar en la carta (no queda cortado)
          const content = el.querySelector<HTMLElement>(':scope > [data-cardcontent]');
          if (content) {
            const fit = Math.min(
              1,
              (cardW - 110) / Math.max(1, content.offsetWidth),
              (cardH - 150) / Math.max(1, content.offsetHeight),
            );
            const cs = 1 - (1 - fit) * c;
            content.style.transformOrigin = '50% 50%';
            content.style.transform = cs < 0.999 ? `scale(${cs.toFixed(4)})` : '';
          }
          el.style.transformOrigin = '50% 50%';
          el.style.transform =
            `perspective(2000px) translate3d(${(0.34 * vw * t).toFixed(1)}px,${(tyIn + hold + 0.34 * vh * t).toFixed(1)}px,0) ` +
            `rotateX(${(t * 12).toFixed(2)}deg) rotateZ(${(-t * 90).toFixed(2)}deg) scale(${(1 - t * 0.68).toFixed(4)})`;
          el.style.opacity = (Math.min(1, 0.5 + 0.5 * ein) * (1 - f)).toFixed(3);
          // se aleja y se oscurece mientras Stack la tapa
          el.style.filter = c > 0.002 ? `brightness(${(1 - c * 0.2 - t * 0.35).toFixed(3)})` : '';
          // Cara de la carta (se crea una vez): marco + índices en esquinas
          let face = el.querySelector<HTMLElement>(':scope > [data-cardface]');
          if (!face) {
            face = document.createElement('div');
            face.setAttribute('data-cardface', '1');
            face.setAttribute('aria-hidden', 'true');
            face.className = 'card-face';
            face.innerHTML =
              '<div class="card-face-frame"></div>' +
              `<img class="card-face-logo card-face-logo--tl" src="${asset('/images/logo-lgr.png')}" alt="">` +
              `<img class="card-face-logo card-face-logo--br" src="${asset('/images/logo-lgr.png')}" alt="">`;
            el.appendChild(face);
          }
          face.style.left = `${inX.toFixed(1)}px`;
          face.style.right = `${inX.toFixed(1)}px`;
          face.style.top = `${inY.toFixed(1)}px`;
          face.style.bottom = `${inY.toFixed(1)}px`;
          face.style.borderRadius = `${rad.toFixed(1)}px`;
          face.style.opacity = c.toFixed(3);
          return;
        }
        if (el.dataset.cardexit) {
          // en mobile vuelve al comportamiento normal: limpiar lo de desktop
          const face = el.querySelector<HTMLElement>(':scope > [data-cardface]');
          if (face) face.style.opacity = '0';
          if (el.style.clipPath) el.style.clipPath = '';
          if (el.style.zIndex) el.style.zIndex = '';
          const content = el.querySelector<HTMLElement>(':scope > [data-cardcontent]');
          if (content && content.style.transform) content.style.transform = '';
        }
        // entrada: recorrido largo → transición suave, nunca brusca
        const ein = easeInOut(clamp01((vh - r.top) / (vh * 0.6)));
        // salida: recién atenúa cuando el FINAL de la sección sube; opacidad
        // y brillo bajan de a poco (efecto opaco progresivo)
        const pout = clamp01((vh * 0.8 - r.bottom) / (vh * 0.6));
        let ty = 0;
        let sc = 1;
        if (mode === 'rise') ty = (1 - ein) * 44;
        if (mode === 'zoom') {
          sc = 0.97 + ein * 0.03;
          ty = (1 - ein) * 26;
        }
        sc *= 1 - pout * 0.04;
        const tyS = sm(el, 'ty', ty);
        const scS = sm(el, 'sc', sc);
        const opS = sm(el, 'op', Math.min(1, 0.5 + 0.5 * ein) * (1 - pout * 0.3));
        const brS = sm(el, 'br', 1 - pout * 0.35);
        if (!el.style.transformOrigin) el.style.transformOrigin = '50% 30%';
        el.style.transform = `translate3d(0,${tyS.toFixed(2)}px,0) scale(${scS.toFixed(4)})`;
        el.style.opacity = opS.toFixed(3);
        el.style.filter = brS < 0.995 ? `brightness(${brS.toFixed(3)})` : '';
      });
      document.querySelectorAll<HTMLElement>('[data-herotilt]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200) return;
        // Hero → tarjeta inclinada (estilo damrod). El hero queda sticky
        // dentro del escenario (el ::after suma el recorrido del pin) y el
        // progreso de ese pin maneja todo, pegado al scroll.
        // Las etapas se SOLAPAN para que sea un solo movimiento continuo
        // (sin frenadas entre etapas), cada una con ease-in-out senoidal:
        //   p 0.00–0.40  se vuelve tarjeta (achica al 80%, bordes)   hc
        //   p 0.08–0.70  se inclina hacia adentro (rotateX)           ht
        //   p 0.50–1.00  se hunde hacia el fondo y se apaga           hx
        // Recién cuando termina el pin entra "Sobre mí".
        // Rendimiento: los estilos se escriben directo en cada elemento (no
        // como variables CSS en el padre, que obligaban a recalcular los
        // estilos de todo el hero en cada frame → sensación trabada).
        el.setAttribute('data-herotilt-on', '1');
        const sec = el.querySelector<HTMLElement>('.hero-section');
        if (!sec) return;
        const hh = sec.offsetHeight;
        // Si el hero es más alto que la pantalla (mobile) se pinea cuando su
        // final llega abajo, así primero se lee completo.
        const stick = Math.min(0, vh - hh);
        const stickPx = `${stick}px`;
        if (sec.style.top !== stickPx) sec.style.top = stickPx;
        const pin = Math.max(1, el.offsetHeight - hh);
        const p = clamp01((stick - r.top) / (pin * 0.97));
        const ease = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
        // Suavizado corto e independiente del refresco: reparte cada paso
        // de la rueda en ~0.1 s, sin inercia (si parás, se frena).
        const k = 1 - Math.exp(-dt / 55);
        const hc = sm(el, 'hc', ease(p / 0.4), k);
        const ht = sm(el, 'ht', ease((p - 0.08) / 0.62), k);
        const hx = sm(el, 'hx', ease((p - 0.5) / 0.5), k);
        const hp = sm(el, 'hp', p, k);
        const mobile = vw < 900;
        const tilt = mobile ? 24 : 30;
        const radius = mobile ? 24 : 36;
        sec.style.transform =
          `translate3d(0,${(-hx * 4).toFixed(3)}vh,${(-hx * 320).toFixed(1)}px) ` +
          `scale(${(1 - hc * 0.2).toFixed(4)}) rotateX(${(ht * tilt).toFixed(3)}deg)`;
        sec.style.opacity = (1 - hx).toFixed(3);
        sec.style.borderRadius = `${(hc * radius).toFixed(1)}px`;
        sec.style.pointerEvents = hx > 0.9 ? 'none' : '';
        const bg = sec.querySelector<HTMLElement>('.hero-card-bg');
        if (bg) bg.style.opacity = hc.toFixed(3);
        const txt = el.querySelector<HTMLElement>('.hero-stacktext');
        if (txt) {
          txt.style.opacity = (hc * (1 - hx)).toFixed(3);
          txt.querySelectorAll<HTMLElement>('.hero-stacktext-row').forEach((row, i) => {
            const dir = i % 2 ? -1 : 1;
            row.style.transform = `translate3d(calc(-25% + ${(dir * hp * 0.18 * vw).toFixed(1)}px),0,0)`;
          });
        }
      });
      // ── Stack: cards "desde el fondo" (sin pin, pegado al scroll) ──
      // Cada card arranca lejos (translateZ −520px), chica, apagada y
      // desenfocada, y se acerca con ease-in-out mientras sube por la
      // pantalla. Escalonado por columna: las de la derecha llegan un poco
      // después, así la fila entra como una ola.
      const depthCards = [...document.querySelectorAll<HTMLElement>('[data-depthcard]')];
      if (depthCards.length) {
        const tops = depthCards.map((c) => Math.round(c.offsetTop));
        const kd = 1 - Math.exp(-dt / 55);
        depthCards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          if (r.top > vh + 200 || r.bottom < -200) return;
          // columna = cuántas cards anteriores comparten su misma fila
          let col = 0;
          for (let j = 0; j < i; j++) if (tops[j] === tops[i]) col++;
          const raw = clamp01((vh * 1.02 - r.top) / (vh * 0.5) - col * 0.14);
          const e = sm(card, 'd', -(Math.cos(Math.PI * raw) - 1) / 2, kd);
          const inv = 1 - e;
          if (e >= 0.999) {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.filter = '';
            return;
          }
          card.style.transform = `translate3d(0,${(inv * 70).toFixed(1)}px,${(-inv * 520).toFixed(1)}px) scale(${(0.86 + e * 0.14).toFixed(4)})`;
          card.style.opacity = (0.05 + e * 0.95).toFixed(3);
          card.style.filter = `blur(${(inv * 8).toFixed(2)}px) brightness(${(0.45 + e * 0.55).toFixed(3)})`;
        });
      }
      // ── Salida con desenfoque y fundido (sin pin) ──
      // Cuando el final de la sección sube por la mitad superior de la
      // pantalla, se va desenfocando, apagando y achicando apenas.
      // ── Entrada "carta que se apoya encima" (data-overlayin, Stack) ──
      // Mientras la sección entra, sube un poco más rápido que el scroll
      // (translate independiente del transform de data-exitfx), con bordes
      // superiores redondeados y una sombra suave arriba que se asientan al
      // apoyarse. Sutil, pegado al scroll, ease-in-out senoidal.
      document.querySelectorAll<HTMLElement>('[data-overlayin]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top > vh + 200 || r.bottom < -200) return;
        const sine = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
        const k = 1 - Math.exp(-dt / 55);
        const e = sm(el, 'ov', sine((vh - r.top) / (vh * 0.9)), k);
        const inv = 1 - e;
        el.style.zIndex = '2';
        el.style.translate = inv > 0.001 ? `0 ${(inv * 90).toFixed(1)}px` : '';
        el.style.borderTopLeftRadius = el.style.borderTopRightRadius = `${(8 + inv * 28).toFixed(1)}px`;
        el.style.boxShadow = inv > 0.001
          ? `0 -${(18 + inv * 22).toFixed(0)}px ${(50 + inv * 30).toFixed(0)}px -20px rgba(0,0,0,${(0.35 + inv * 0.35).toFixed(3)}), 0 -1px 0 rgba(78,159,212,${(0.08 + inv * 0.14).toFixed(3)})`
          : '0 -18px 50px -20px rgba(0,0,0,.35), 0 -1px 0 rgba(78,159,212,.08)';
      });
      document.querySelectorAll<HTMLElement>('[data-exitfx]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top > vh || r.bottom < -100) return;
        const raw = clamp01((vh * 0.62 - r.bottom) / (vh * 0.62));
        const x = sm(el, 'x', -(Math.cos(Math.PI * raw) - 1) / 2, 1 - Math.exp(-dt / 55));
        if (x <= 0.001) {
          el.style.filter = '';
          el.style.opacity = '';
          el.style.transform = '';
          return;
        }
        el.style.filter = `blur(${(x * 10).toFixed(2)}px)`;
        el.style.opacity = (1 - x * 0.9).toFixed(3);
        el.style.transform = `scale(${(1 - x * 0.05).toFixed(4)})`;
      });
      document.querySelectorAll<HTMLElement>('[data-pinsplit]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top > vh + 300 || r.bottom < -300) return;
        // Contacto: TODO el efecto va "scrubbeado" al scroll (la duración la
        // define cuánto scrolleás, no un reloj) y cada tramo usa ease-in-out.
        // El footer sube por encima de Contacto: el pin incluye su alto
        // (--footer-h) y esa parte final no cuenta para abrir/revelar.
        const footer = document.querySelector<HTMLElement>('.site-footer');
        const fh = footer ? footer.offsetHeight : 0;
        const sticky = el.querySelector<HTMLElement>('.contact-sticky');
        // En mobile el panel puede ser más alto que la pantalla: se pinea
        // cuando su final llega abajo, así primero se lee completo.
        if (sticky) {
          const st = `${Math.min(0, vh - sticky.offsetHeight)}px`;
          if (sticky.style.top !== st) sticky.style.top = st;
        }
        const total = r.height - vh - fh;
        // Entrada: mientras la sección sube desde abajo hasta quedar pineada
        const enter = clamp01((vh - r.top) / vh);
        let open: number;
        let rev: number;
        if (total > vh * 0.5) {
          // Modo pineado (desktop): el progreso DENTRO del wrapper maneja la
          // secuencia, como el pin de damrod:
          //   p 0.00–0.10  palabra cerrada · 0.10–0.52 abre · 0.40–0.72 revela
          const p = clamp01(-r.top / total);
          open = clamp01((p - 0.1) / 0.42);
          rev = clamp01((p - 0.4) / 0.32);
        } else {
          // Fallback sin pin (mobile): abre a medida que entra en pantalla
          const p = clamp01((vh * 0.78 - r.top) / (vh * 0.52));
          open = p;
          rev = clamp01((p - 0.35) / 0.5);
        }
        // Suavizado independiente del refresco (igual que el hero): reparte
        // cada paso de la rueda en ~0.1 s, sin inercia.
        const kc = 1 - Math.exp(-dt / 55);
        const sine = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
        const enterS = sm(el, 'enter', sine(enter), kc);
        const openS = sm(el, 'open', sine(open), kc);
        const revS = sm(el, 'rev', sine(rev), kc);
        // Salida: el footer sube por encima de Contacto (quieto). c = cuánto
        // lo tapó (lineal con el scroll); ex = c con ease-in-out.
        const fTop = footer ? footer.getBoundingClientRect().top : r.bottom;
        const c = clamp01((vh - fTop) / Math.max(1, Math.min(fh, vh)));
        const exS = sm(el, 'ex', sine(c), kc);
        // Setear variables solo si cambiaron: cada escritura obliga a
        // recalcular estilos de toda la sección (más fluido así).
        const setVar = (k: string, v: number) => {
          const str = v.toFixed(4);
          if (el.style.getPropertyValue(k) !== str) el.style.setProperty(k, str);
        };
        setVar('--enter', enterS);
        setVar('--open', openS);
        setVar('--reveal', revS);
        setVar('--exit', exS);
        // El footer NUNCA tapa el nombre: si su borde superior va a llegar al
        // nombre, el panel sube lo justo para que el nombre quede siempre
        // arriba del footer (lo "empuja"), con el mismo ease-in-out.
        if (sticky) {
          const name = sticky.querySelector<HTMLElement>('.contact-name');
          let lift = 0;
          if (name && fh) {
            const sr = sticky.getBoundingClientRect();
            // posición natural del nombre con el panel pineado: su distancia
            // al borde del panel (no cambia con el lift) + el top del sticky
            const rel = name.getBoundingClientRect().bottom - sr.top;
            const natural = Math.min(0, vh - sticky.offsetHeight) + rel;
            const gap = 28;
            const needEnd = Math.max(0, natural + gap - (vh - Math.min(fh, vh)));
            const needNow = Math.max(0, natural + gap - fTop);
            lift = Math.max(needNow, needEnd * exS);
          }
          const liftS = sm(sticky, 'lift', lift, kc);
          if (exS > 0.0005 || liftS > 0.5) {
            sticky.style.transform = `translate3d(0,${(-liftS).toFixed(1)}px,0) scale(${(1 - exS * 0.03).toFixed(4)})`;
            sticky.style.filter = `blur(${(exS * 4).toFixed(2)}px) brightness(${(1 - exS * 0.5).toFixed(3)})`;
          } else if (sticky.style.transform) {
            sticky.style.transform = '';
            sticky.style.filter = '';
          }
        }
        // El CTA del medio recién se puede clickear cuando la palabra abrió
        if (openS > 0.6) el.removeAttribute('data-cta-off');
        else el.setAttribute('data-cta-off', '1');
      });
      // ── Footer: contenido que entra pegado al scroll ──
      // c = cuánto subió el footer (0 = recién asoma, 1 = página al final).
      // Filas en cascada: suben 28px y pasan de borrosas a nítidas, cada una
      // con su tramo (desfasado 0.12) y ease-in-out senoidal. La palabra
      // gigante llega última: sube desde abajo y se enciende.
      {
        const foot = document.querySelector<HTMLElement>('.site-footer');
        if (foot) {
          const fr = foot.getBoundingClientRect();
          if (fr.top < vh + 100) {
            const fh = foot.offsetHeight;
            const c = clamp01((vh - fr.top) / Math.max(1, Math.min(fh, vh)));
            const kf = 1 - Math.exp(-dt / 55);
            const sine = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
            foot.querySelectorAll<HTMLElement>('[data-footrow]').forEach((row) => {
              const i = +(row.dataset.footrow || 0);
              const e = sm(row, 'f', sine((c - 0.12 - i * 0.12) / 0.45), kf);
              if (e >= 0.999) {
                if (row.style.opacity) {
                  row.style.opacity = '';
                  row.style.transform = '';
                  row.style.filter = '';
                }
                return;
              }
              const inv = 1 - e;
              row.style.opacity = e.toFixed(3);
              row.style.transform = `translate3d(0,${(inv * 28).toFixed(1)}px,0)`;
              row.style.filter = `blur(${(inv * 6).toFixed(2)}px)`;
            });
            const word = foot.querySelector<HTMLElement>('[data-footword]');
            if (word) {
              const e = sm(word, 'f', sine((c - 0.5) / 0.5), kf);
              word.style.transform = `translate3d(0,${((1 - e) * 55).toFixed(2)}%,0)`;
              word.style.opacity = e.toFixed(3);
            }
          }
        }
      }
      // ── Experiencia: cards + carpeta (sticky, pegado al scroll) ──
      // Solo cuentan las cards que pasan el filtro (data-exp-filter en el
      // escenario). seg (sobre m cards activas) recorre:
      //   0 → m−1     entran las cards; la anterior se archiva en su pestaña
      //   m−1 → m     se archiva la última
      //   m → m+1     la carpeta (cerrada, con las m pestañas) viaja al centro
      //   m+1 → m+2.8 queda quieta al centro para elegir una pestaña
      // Después el sticky se suelta y la sección sigue normal.
      document.querySelectorAll<HTMLElement>('[data-expstack]').forEach((el) => {
        // activo desde el inicio: así el alto de la página no cambia al llegar
        if (!el.hasAttribute('data-expstack-on')) el.setAttribute('data-expstack-on', '1');
        const r = el.getBoundingClientRect();
        if (r.top > vh + 200 || r.bottom < -200) return;
        const all = [...el.querySelectorAll<HTMLElement>('[data-expitem]')];
        if (!all.length) return;
        const filter = el.dataset.expFilter || 'all';
        const onF = (it: HTMLElement) => filter === 'all' || it.dataset.track === filter;
        const items = all.filter(onF);
        const m = Math.max(1, items.length);
        const ke = 1 - Math.exp(-dt / 55);
        const sine = (v: number) => -(Math.cos(Math.PI * clamp01(v)) - 1) / 2;
        const total = Math.max(1, el.offsetHeight - vh);
        const SEG_END = m + 2.8;
        const pRaw = clamp01(-r.top / total);
        // si cambia el filtro, el progreso salta sin animar (evita "rebobinados")
        if (el.dataset.expFilterPrev !== filter) {
          el.dataset.expFilterPrev = filter;
          const mm = cur.get(el);
          if (mm) delete mm.seg;
        }
        const seg = sm(el, 'seg', pRaw * SEG_END, ke);
        // ¿ya está fijo? (la línea se enciende recién ahí)
        const lit = sine(1 - r.top / (vh * 0.3));
        // Cards fuera del filtro: ocultas y sin pestaña
        all.forEach((it) => {
          if (onF(it)) return;
          it.style.opacity = '0';
          it.style.pointerEvents = 'none';
          it.style.transform = `translate3d(0,${vh}px,0)`;
        });
        const enter = items.map((_, i) => (i === 0 ? 1 : sine(seg - (i - 1))));
        const deck = all[0].parentElement;
        if (deck) {
          const h = Math.max(...items.map((it) => it.offsetHeight), 0);
          const hs = `${h}px`;
          if (deck.style.height !== hs) deck.style.height = hs;
        }
        const drop = Math.min(vh * 0.8, 720);
        const folder = el.querySelector<HTMLElement>('[data-expfolder]');
        // pestañas: solo las del filtro, reacomodadas una al lado de la otra
        const tabs = folder ? [...folder.querySelectorAll<HTMLElement>('[data-exptab]')] : [];
        tabs.forEach((tab) => {
          const it = all[+(tab.dataset.exptab || 0)];
          const k = items.indexOf(it);
          if (k < 0) {
            tab.style.display = 'none';
            return;
          }
          tab.style.display = '';
          tab.style.setProperty('--k', String(k));
          tab.style.setProperty('--tabs', String(m));
          tab.dataset.slot = String(k);
        });
        const stored = items.map((_, i) => sine(seg - i));
        const dr = deck ? deck.getBoundingClientRect() : null;
        const dw = deck ? Math.max(1, deck.offsetWidth) : 1;
        items.forEach((it, i) => {
          const e = enter[i];
          const st = stored[i];
          let tx = 0;
          let ty = (1 - e) * drop;
          let sc = 1;
          let op = 1;
          const tab = folder?.querySelector<HTMLElement>(`[data-exptab="${all.indexOf(it)}"]`);
          if (st > 0.0005 && tab && dr) {
            const tr = tab.getBoundingClientRect();
            const tgx = tr.left + tr.width / 2 - (dr.left + dr.width / 2);
            const tgy = tr.top + tr.height / 2 - dr.top;
            const tsc = tr.width / dw;
            tx = tgx * st;
            ty = ty + tgy * st;
            sc = 1 + (tsc - 1) * st;
            op = 1 - sine((st - 0.35) / 0.55);
          }
          if (tab) {
            const t = sine((st - 0.55) / 0.45);
            tab.style.opacity = t.toFixed(3);
            tab.style.transform = `translate3d(0,${((1 - t) * 14).toFixed(1)}px,0)`;
            tab.style.pointerEvents = t > 0.8 ? '' : 'none';
          }
          it.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${sc.toFixed(4)})`;
          it.style.filter = '';
          it.style.opacity = op < 0.999 ? op.toFixed(3) : '';
          it.style.zIndex = String(100 + i);
          it.style.pointerEvents = e > 0.6 && st < 0.1 ? '' : 'none';
        });
        // Cierre: la carpeta vuelve al centro (cerrada) y queda para elegir
        const fc = sine(seg - m);
        if (folder) {
          const sticky = folder.offsetParent as HTMLElement | null;
          if (sticky) {
            const cx = sticky.clientWidth / 2 - (folder.offsetLeft + folder.offsetWidth / 2);
            const cy = sticky.clientHeight * 0.55 - (folder.offsetTop + folder.offsetHeight / 2);
            folder.style.translate = `${(cx * fc).toFixed(1)}px ${(cy * fc).toFixed(1)}px`;
            folder.style.scale = (1 + fc * 0.45).toFixed(4);
          }
          folder.toggleAttribute('data-centered', fc > 0.9);
          const count = Math.round(stored.reduce((acc, v) => acc + v, 0));
          const cEl = folder.querySelector<HTMLElement>('[data-expfolder-count]');
          const cs = String(count).padStart(2, '0');
          if (cEl && cEl.textContent !== cs) cEl.textContent = cs;
          folder.style.opacity = sine(Math.min(1, seg * 2)).toFixed(3);
        }
        const chipEl = el.querySelector<HTMLElement>('.exp-stack-chip');
        if (chipEl) chipEl.style.opacity = (1 - fc).toFixed(3);
        // Línea: nace en el chip; apagada hasta que el bloque queda fijo
        const lineWrap = el.querySelector<HTMLElement>('.exp-stack-line');
        if (lineWrap) {
          if (chipEl) {
            const lt = `${Math.round(chipEl.offsetTop + chipEl.offsetHeight / 2)}px`;
            if (lineWrap.style.top !== lt) lineWrap.style.top = lt;
          }
          lineWrap.style.opacity = (1 - fc * 0.85).toFixed(3);
        }
        const line = el.querySelector<HTMLElement>('[data-expline]');
        if (line) {
          const t = sine(seg / m);
          const mix = (a2: number, b2: number) => Math.round(a2 + (b2 - a2) * t);
          const col = `rgb(${mix(107, 44)},${mix(245, 127)},${mix(168, 196)})`;
          line.style.background = `linear-gradient(180deg, ${col}, rgba(${mix(107, 44)},${mix(245, 127)},${mix(168, 196)},.15))`;
          line.style.boxShadow = lit > 0.05 ? `0 0 ${(14 * lit).toFixed(1)}px ${col}` : 'none';
          line.style.opacity = (0.12 + 0.88 * lit).toFixed(3);
          line.style.filter = lit < 0.999 ? `saturate(${lit.toFixed(3)})` : '';
          line.style.transform = `scaleY(${(0.15 + 0.85 * t).toFixed(4)})`;
        }
        // Chip: período y número de la card de arriba (entre las del filtro)
        const top = Math.min(m - 1, Math.max(0, Math.round(seg)));
        const per = el.querySelector<HTMLElement>('[data-expchip-period]');
        const cnt = el.querySelector<HTMLElement>('[data-expchip-count]');
        const txt = items[top]?.dataset.period || '';
        if (per && per.textContent !== txt) per.textContent = txt;
        const c = `${String(top + 1).padStart(2, '0')} / ${String(m).padStart(2, '0')}`;
        if (cnt && cnt.textContent !== c) cnt.textContent = c;
        // Tocar una pestaña: scroll suave hasta donde esa card está al centro
        if (!el.dataset.expClickInit) {
          el.dataset.expClickInit = '1';
          const onClick = (ev: Event) => {
            const tab = (ev.target as HTMLElement).closest<HTMLElement>('[data-exptab]');
            if (!tab) return;
            ev.preventDefault();
            ev.stopPropagation();
            const slot = +(tab.dataset.slot || 0);
            const mm = Math.max(1, +(getComputedStyle(tab).getPropertyValue('--tabs') || 1));
            const tot = Math.max(1, el.offsetHeight - window.innerHeight);
            const pp = slot / (mm + 2.8);
            const y = window.scrollY + el.getBoundingClientRect().top + pp * tot + 2;
            window.scrollTo({ top: y, behavior: 'smooth' });
          };
          el.addEventListener('click', onClick, true);
          this.cleanups.push(() => el.removeEventListener('click', onClick, true));
        }
      });
      document.querySelectorAll<HTMLElement>('[data-bandx]').forEach((el) => {
        const host = el.parentElement || el;
        const r = host.getBoundingClientRect();
        if (r.bottom < -400 || r.top > vh + 400) return;
        const speed = parseFloat(el.dataset.bandx || '0.45');
        const p = (vh - r.top) / (vh + r.height);
        const x = sm(el, 'x', (0.5 - p) * speed * vw);
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      });
      document.querySelectorAll<HTMLElement>('[data-splitx]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top > vh + 200) return;
        const dir = el.dataset.splitx === 'right' ? 1 : -1;
        const e = 1 - Math.pow(1 - clamp01((vh - r.top) / (vh * 0.58)), 3);
        const off = sm(el, 'off', (1 - e) * dir * Math.min(420, vw * 0.32));
        el.style.transform = `translate3d(${off.toFixed(1)}px,0,0)`;
        el.style.opacity = sm(el, 'op', 0.12 + 0.88 * e).toFixed(3);
      });
      document.querySelectorAll<SVGElement>('[data-arctext]').forEach((tp) => {
        const svg = tp.closest('svg');
        const host = svg?.parentElement;
        if (!host) return;
        const r = host.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) return;
        const p = (vh - r.top) / (vh + r.height);
        const off = sm(tp, 'o', -46 + p * 64);
        tp.setAttribute('startOffset', `${off.toFixed(2)}%`);
      });
    };
    raf = requestAnimationFrame(frame);
    this.cleanups.push(() => cancelAnimationFrame(raf));
  }

  // ── partículas ─────────────────────────────────────────────
  private particles() {
    const cv = document.querySelector<HTMLCanvasElement>('[data-particles]');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    interface Pt { x: number; y: number; vx: number; vy: number; r: number; c: string }
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Pt[] = [];
    let raf: number | null = null;
    let visible = true;
    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(34, Math.min(84, Math.round((w * h) / 21000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.5,
        c: Math.random() > 0.7 ? '33,224,127' : '78,159,212',
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (this.mouse) {
          const r = cv.getBoundingClientRect();
          const dx = p.x - (this.mouse.x - r.left);
          const dy = p.y - (this.mouse.y - r.top);
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000 && d2 > 1) {
            const f = (1 - d2 / 14000) * 0.6;
            const d = Math.sqrt(d2);
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},.5)`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            ctx.strokeStyle = `rgba(78,159,212,${((1 - d2 / 16000) * 0.11).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    size();
    draw();
    this.on(window, 'resize', size);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) draw();
        else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0 },
    );
    io.observe(cv);
    this.cleanups.push(() => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    });
  }
}
