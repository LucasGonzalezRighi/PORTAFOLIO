import { useState } from 'react';
import type { FormEvent } from 'react';
import { site } from '@/content/site';
import { useLang } from '@/i18n/LanguageContext';
import type { Dict } from '@/i18n/types';
import { asset } from '@/lib/asset';

/**
 * Formulario de contacto (look damrod, paleta propia).
 * Envío: si site.formEndpoint tiene una URL (webhook de n8n/Make), hace POST
 * con JSON; si está vacío, abre el cliente de mail del visitante prellenado.
 * Incluye honeypot anti-spam y validación con mensajes animados.
 */
function ContactForm({ f }: { f: Dict['contact']['form'] }) {
  const [values, setValues] = useState({ name: '', email: '', type: '', message: '', company: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle');
  const [typeOpen, setTypeOpen] = useState(false);

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = f.reqName;
    if (!values.email.trim()) e.email = f.reqEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = f.badEmail;
    if (!values.message.trim()) e.message = f.reqMsg;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (values.company) return; // honeypot: los bots lo completan, las personas no
    if (!validate()) return;
    if (!site.formEndpoint) {
      // Sin webhook configurado: mail del visitante prellenado
      const subject = encodeURIComponent(`[Portfolio] ${values.type || 'Contacto'} — ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, type: values.type, message: values.message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
      setValues({ name: '', email: '', type: '', message: '', company: '' });
    } catch {
      setStatus('fail');
    }
  };

  const fieldError = (msg?: string) =>
    msg ? (
      <div className="cf-error" role="alert">
        {msg}
      </div>
    ) : null;

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {/* Honeypot invisible */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(e) => set('company')(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div className="cf-item">
        <label className="cf-label" htmlFor="cf-name">{f.nameLabel}</label>
        <input id="cf-name" className="cf-input" type="text" placeholder={f.namePh} value={values.name} onChange={(e) => set('name')(e.target.value)} data-filled={values.name ? '1' : undefined} />
        {fieldError(errors.name)}
      </div>

      <div className="cf-item">
        <label className="cf-label" htmlFor="cf-email">{f.emailLabel}</label>
        <input id="cf-email" className="cf-input" type="email" placeholder={f.emailPh} value={values.email} onChange={(e) => set('email')(e.target.value)} data-filled={values.email ? '1' : undefined} />
        {fieldError(errors.email)}
      </div>

      <div className="cf-item">
        <label className="cf-label" htmlFor="cf-type">{f.typeLabel}</label>
        <div style={{ position: 'relative' }}>
          <select
            id="cf-type"
            className="cf-input cf-select"
            value={values.type}
            onChange={(e) => set('type')(e.target.value)}
            onFocus={() => setTypeOpen(true)}
            onBlur={() => setTypeOpen(false)}
            data-filled={values.type ? '1' : undefined}
          >
            <option value="" disabled>{f.typePh}</option>
            {f.typeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Chevron animado */}
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ position: 'absolute', right: '16px', top: '50%', color: 'var(--blue-400)', pointerEvents: 'none', transform: `translateY(-50%) rotate(${typeOpen ? 180 : 0}deg)`, transition: 'transform .3s var(--ease-out)' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="cf-item">
        <label className="cf-label" htmlFor="cf-msg">{f.msgLabel}</label>
        <textarea id="cf-msg" className="cf-input" rows={4} placeholder={f.msgPh} value={values.message} onChange={(e) => set('message')(e.target.value)} data-filled={values.message ? '1' : undefined} style={{ resize: 'none' }} />
        {fieldError(errors.message)}
      </div>

      <div className="cf-item">
        <button
          type="submit"
          data-magnetic="1"
          disabled={status === 'sending'}
          data-hover="box-shadow:0 22px 60px -16px rgba(33,224,127,.5)"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '15px 24px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--bg-0)', background: 'var(--gradient-cta)', boxShadow: '0 18px 50px -20px rgba(78,159,212,.55)', opacity: status === 'sending' ? 0.75 : 1, transition: 'box-shadow .35s,opacity .3s,transform .18s' }}
        >
          {status === 'sending' && (
            <span aria-hidden style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid rgba(5,8,22,.3)', borderTopColor: 'var(--bg-0)', animation: 'spin 0.8s linear infinite' }} />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>{status === 'sending' ? f.sending : f.send}</span>
        </button>
        {status === 'ok' && <div className="cf-status cf-status--ok">{f.success}</div>}
        {status === 'fail' && <div className="cf-status cf-status--fail">{f.error}</div>}
      </div>
    </form>
  );
}

/** Mitad de la palabra gigante, con su reflejo (efecto damrod, paleta propia) */
function GiantHalf({ text, accent = false }: { text: string; accent?: boolean }) {
  const cls = accent ? 'contact-giant-word contact-giant-word--accent' : 'contact-giant-word';
  return (
    <span style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
      <span className={cls} style={{ display: 'block' }}>
        {text}
      </span>
      <span aria-hidden className={`${cls} contact-giant-reflection`}>
        {text}
      </span>
    </span>
  );
}

/**
 * Contacto — scrollytelling pineado (estilo damrod.dev):
 * el wrapper .contact-pin mide 240vh y adentro un panel sticky de 100vh
 * queda "clavado" mientras el scroll maneja la secuencia:
 *   1. "CONTACTO" cerrado, gigante, centrado (sin botón).
 *   2. La palabra se parte y las mitades viajan a los bordes (--open).
 *   3. En el hueco aparece el CTA y debajo se revela la info (--reveal).
 *   4. Al soltarse el pin, el bloque se va con blur suave (--exit).
 * Las variables las maneja EffectsEngine.scrollFx (data-pinsplit).
 */
export function Contact() {
  const { dict, lang } = useLang();
  const t = dict.contact;
  // El typewriter consume el nodo de texto una sola vez: se anima con el
  // idioma inicial; si el usuario cambia de idioma, el texto se muestra plano.
  const [initialLang] = useState(lang);
  const typewriter = lang === initialLang;
  return (
    <section id="contacto" style={{ position: 'relative', background: 'rgba(5,8,22,.84)' }}>
      <div className="contact-pin" data-pinsplit="1">
        <div className="contact-sticky">
          {/* Decoración de fondo */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)', width: '110vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,95,168,.16),rgba(33,224,127,.06) 45%,transparent 68%)', filter: 'blur(80px)', animation: 'float2 24s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(78,159,212,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(78,159,212,.045) 1px,transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 60%,#000,transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 60%,#000,transparent 75%)' }} />
          </div>

          <span className="kicker" style={{ position: 'relative', color: 'var(--blue-400)' }}>{t.kicker}</span>

          {/* Palabra gigante: cerrada al entrar, se abre con el scroll */}
          <div className="contact-giant" aria-label={t.giant}>
            <div className="contact-half contact-half-left">
              <GiantHalf text={t.giant.slice(0, Math.ceil(t.giant.length / 2))} />
            </div>
            <div className="contact-half contact-half-right">
              <GiantHalf text={t.giant.slice(Math.ceil(t.giant.length / 2))} accent />
            </div>
            {/* CTA revelado en el hueco central: descarga del CV (como el
                botón central de la referencia), estilo outline propio */}
            <a
              className="contact-giant-cta"
              data-magnetic="1"
              href={asset(site.cv.href)}
              download={site.cv.download}
              data-hover="border-color:var(--green-400);color:#fff;box-shadow:0 0 44px -14px rgba(33,224,127,.45)"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 30px', borderRadius: 'var(--radius-pill)', fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap', color: 'var(--text-body)', border: '1px solid rgba(78,159,212,.3)', background: 'rgba(16,42,67,.55)', backdropFilter: 'blur(10px)', transition: 'border-color .3s,box-shadow .35s,color .3s,transform .18s' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11M6.5 10.5L12 16l5.5-5.5M4.5 20h15" />
              </svg>
              <span style={{ position: 'relative', zIndex: 1 }}>{dict.hero.cv}</span>
            </a>
          </div>

          {/* Información revelada al abrirse la palabra: dos columnas como la
              referencia — nombre gigante gris (entra deslizando) + rol +
              acciones a la izquierda, FORMULARIO a la derecha */}
          <div className="contact-reveal">
            <div className="contact-reveal-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div aria-hidden className="contact-name">
                  {/* Nombre desde la izquierda, apellido desde la derecha */}
                  <span className="contact-name-first">{site.firstName}</span>
                  <br />
                  <span className="contact-name-last">{site.lastName}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                  Full Stack Developer
                </div>
                <p
                  key={typewriter ? 'tw' : `plain-${lang}`}
                  data-typewriter={typewriter ? '1' : undefined}
                  style={{ margin: '6px 0 0', maxWidth: '46ch', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)' }}
                >
                  {t.blurb}
                </p>
                {/* Contacto directo, compacto */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '8px' }}>
                  <a href={`mailto:${site.email}`} data-hover="color:var(--lime-400)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', letterSpacing: '.05em', color: 'var(--text-dim)', transition: 'color .25s' }}>
                    {site.email}
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" data-hover="color:var(--lime-400)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', letterSpacing: '.05em', color: 'var(--text-dim)', transition: 'color .25s' }}>
                    LinkedIn ↗
                  </a>
                  <a href={`tel:${site.phone.tel}`} data-hover="color:var(--lime-400)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', letterSpacing: '.05em', color: 'var(--text-dim)', transition: 'color .25s' }}>
                    {site.phone.display}
                  </a>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', letterSpacing: '.05em', color: 'var(--text-faint)' }}>{t.locationValue}</span>
                </div>
              </div>

              <ContactForm f={t.form} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
