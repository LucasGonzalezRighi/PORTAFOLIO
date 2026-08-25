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

export class EffectsEngine {
  private cleanups: Cleanup[] = [];
  private mouse: { x: number; y: number } | null = null;
  private pRaf = 0;
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
    this.step(() => this.tilt());
    this.step(() => this.fans());
    this.step(() => this.magnetic());
    this.step(() => this.ripple());
    this.step(() => this.sweepsAuto());
    this.step(() => this.sweeps());
    this.step(() => this.pointer());
    this.step(() => this.parallax());
    this.step(() => this.particles());
    this.step(() => this.zoomSection());
    this.step(() => this.sheenWave());
    // Reescaneo ante cambios del DOM (nodos nuevos de React):
    // todos los inicializadores son idempotentes vía dataset flags.
    const rescan = () => {
      this.step(() => this.hoverStyles());
      this.step(() => this.reveal());
      if (!reducedMotion()) {
        this.step(() => this.magnetic());
        this.step(() => this.ripple());
        this.step(() => this.tilt());
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

  // ── reveal ─────────────────────────────────────────────────
  private reveal() {
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => {
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
    const cards = [...document.querySelectorAll<HTMLElement>('[data-exp-card]')];
    const grid = document.querySelector<HTMLElement>('[data-exp-grid]');
    const line = document.querySelector<HTMLElement>('[data-exp-line]');
    const btns = [...document.querySelectorAll<HTMLElement>('[data-exp-btn]')];
    if (!cards.length || !grid) return;
    const mq = window.matchMedia('(min-width: 900px)');
    const layout = () => {
      const two = mq.matches;
      grid.style.gridTemplateColumns = two ? '1fr 1fr' : '1fr';
      if (line) line.style.display = two ? 'block' : 'none';
      cards.forEach((c) => {
        c.style.gridColumn = two ? (c.dataset.exp === 'dev' ? '1' : '2') : 'auto';
        c.style.gridRow = two && c.dataset.expRow ? c.dataset.expRow : 'auto';
        const node = c.querySelector<HTMLElement>('[data-node]');
        if (!node) return;
        if (!two) {
          node.style.display = 'none';
          return;
        }
        node.style.display = '';
        if (c.dataset.exp === 'dev') {
          node.style.left = 'auto';
          node.style.right = 'calc(-1 * clamp(24px,3vw,44px) - 8px)';
        } else {
          node.style.right = 'auto';
          node.style.left = 'calc(-1 * clamp(24px,3vw,44px) - 8px)';
        }
      });
    };
    layout();
    mq.addEventListener('change', layout);
    this.cleanups.push(() => mq.removeEventListener('change', layout));
    const apply = (f: string) => {
      cards.forEach((c) => {
        const flip = c.querySelector<HTMLElement>('[data-flip]');
        if (flip && flip.dataset.open === '1') {
          flip.dataset.open = '0';
          flip.style.transform = 'rotateY(0deg)';
        }
        const on = f === 'all' || c.dataset.exp === f;
        c.style.transition = 'opacity .45s, filter .45s';
        c.style.opacity = on ? '' : '.35';
        c.style.filter = on ? '' : 'grayscale(1) brightness(.85)';
        c.style.pointerEvents = on ? '' : 'none';
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
    document.querySelectorAll<HTMLElement>('[data-fan]').forEach((card) => {
      if (card.dataset.fanBound) return;
      card.dataset.fanBound = '1';
      const s1 = card.querySelector<HTMLElement>('[data-sheet="1"]');
      const s2 = card.querySelector<HTMLElement>('[data-sheet="2"]');
      if (!s1 || !s2) return;
      const enter = () => {
        card.style.zIndex = '5';
        s1.style.opacity = '1';
        s2.style.opacity = '1';
        s1.style.transform = 'rotate(-1.6deg) translate(-14px,0) scale(.985)';
        s2.style.transform = 'rotate(1.6deg) translate(14px,0) scale(.985)';
      };
      const leave = () => {
        card.style.zIndex = '';
        s1.style.opacity = '0';
        s2.style.opacity = '0';
        s1.style.transform = 'rotate(0deg) translate(0,0) scale(1)';
        s2.style.transform = 'rotate(0deg) translate(0,0) scale(1)';
      };
      this.on(card, 'pointerenter', enter);
      this.on(card, 'pointerleave', leave);
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
      if (ring) ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
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
