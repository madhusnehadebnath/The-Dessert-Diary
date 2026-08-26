import { useEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleArrowOutUpRight,
  Clock3,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Sparkles,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { siteConfig } from '@/config/site';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Cake = {
  id: string;
  name: string;
  category: string;
  image: string;
  tag: string;
  description: string;
};

const cakes: Cake[] = [
  {
    id: 'rose-occasion',
    name: 'Rose Occasion',
    category: 'Floral / birthday cakes',
    image: '/cakes/rose-birthday.jpeg',
    tag: 'Birthday',
    description: 'A sculpted white buttercream cake with fresh-looking crimson roses, pearl details and a little golden birthday glow.',
  },
  {
    id: 'dance-expression',
    name: 'Dance Expression',
    category: 'Custom / theme cakes',
    image: '/cakes/dance-theme.jpeg',
    tag: 'Custom',
    description: 'A joyful theme cake made around movement, music and the person you are celebrating. Every topper is made to fit your story.',
  },
  {
    id: 'rose-rhapsody',
    name: 'Rose Rhapsody',
    category: 'Floral / birthday cakes',
    image: '/cakes/rose-top.jpeg',
    tag: 'Floral',
    description: 'A dramatic piped rose blooming from the centre, finished with soft pink edges and the sweetest, most personal name on the board.',
  },
  {
    id: 'blue-note',
    name: 'Blue Note',
    category: 'Floral / birthday cakes',
    image: '/cakes/blue-birthday.jpeg',
    tag: 'Celebration',
    description: 'A cloud of blue and ivory rosettes with tiny gold pearls. Soft, spirited and ready for a very happy table.',
  },
  {
    id: 'petal-cream',
    name: 'Petal Cream',
    category: 'Floral / birthday cakes',
    image: '/cakes/pink-piped.jpeg',
    tag: 'Floral',
    description: 'Pretty pink piping, a creamy centre and just enough detail to make a quiet celebration feel like an event.',
  },
  {
    id: 'cupcake-garden',
    name: 'Cupcake Garden',
    category: 'Cupcakes',
    image: '/cakes/cupcakes.jpeg',
    tag: 'Box of 5–6',
    description: 'A garden of rose-swirled cupcakes in vanilla, chocolate, strawberry and mix flavours. Cupcakes are made to order in boxes of 5–6.',
  },
  {
    id: 'glass-cake',
    name: 'Glass Cake',
    category: 'Glass cakes',
    image: '/cakes/glass-cake.jpeg',
    tag: 'Layered',
    description: 'Creamy layers and chocolate cake tucked into a clear cup — a little dessert that looks as good as it tastes.',
  },
  {
    id: 'chocolate-tub',
    name: 'Chocolate Tub',
    category: 'Tub cakes',
    image: '/cakes/tub-cake.jpeg',
    tag: 'Comfort',
    description: 'Rich chocolate cake, cream and a generous scatter of biscuit and chocolate pieces. Made for spoon-first moments.',
  },
  {
    id: 'tea-time',
    name: 'Tea-Time Fruit Cake',
    category: 'Tea-time cakes',
    image: '/cakes/pink-rosette.jpeg',
    tag: 'Tea-time',
    description: 'For the afternoon table: tender cake, gentle piping and a mood that pairs very well with a second cup of tea.',
  },
  {
    id: 'yellow-bloom',
    name: 'Yellow Bloom',
    category: 'Floral / birthday cakes',
    image: '/cakes/yellow-floral.jpeg',
    tag: 'Bright',
    description: 'Sunlit yellow rosettes, pearl sprinkles and a glossy centre for birthdays that deserve a little extra brightness.',
  },
  {
    id: 'bento-moment',
    name: 'Bento Moment',
    category: 'Bento cakes',
    image: '/cakes/blue-rosette.jpeg',
    tag: 'Small & sweet',
    description: 'A compact cake with big feeling — personalised colour, message and flavour, made for one very special moment.',
  },
];

const categories = [
  'All',
  'Custom / theme cakes',
  'Floral / birthday cakes',
  'Cupcakes',
  'Glass cakes',
  'Tub cakes',
  'Tea-time cakes',
  'Bento cakes',
];

const gallery = [
  { image: '/cakes/dance-theme-detail.jpeg', label: 'The details matter' },
  { image: '/cakes/yellow-floral-top.jpeg', label: 'Piped by hand' },
  { image: '/cakes/cupcakes.jpeg', label: 'A little garden' },
  { image: '/cakes/pink-rosette.jpeg', label: 'Made for your table' },
  { image: '/cakes/tub-cake.jpeg', label: 'Spoon-first joy' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${revealed ? 'revealed' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function BrandReveal({ onDone }: { onDone: () => void }) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    const timer = window.setTimeout(() => onDoneRef.current(), 1550);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div className="brand-splash" aria-label={siteConfig.brand.fullName}>
      <img className="brand-splash-photo" src="/cakes/rose-birthday.jpeg" alt="" aria-hidden="true" />
      <div className="brand-splash-inner">
        <span className="brand-splash-kicker">home bakery · by ss</span>
        <span className="brand-splash-name">{siteConfig.brand.name}</span>
        <span className="brand-splash-line">a little sweetness, made personal</span>
      </div>
    </div>
  );
}

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const links = [
    { label: 'The diary', href: '#story' },
    { label: 'The catalogue', href: '#catalogue' },
    { label: 'Custom cakes', href: '#custom' },
    { label: 'Gallery', href: '#gallery' },
  ];
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a className="brand-mark" href="#top" data-testid="link-brand-home" onClick={() => setMenuOpen(false)}>
          <img className="mobile-brand-logo" src="/dessert-diary-mobile-logo.png" alt="The Dessert Diary by SS" />
          <span className="brand-name">The <em>Dessert</em> Diary</span>
          <span className="brand-by">{siteConfig.brand.byline}</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-order" href="#order" data-testid="link-nav-order" onClick={() => setMenuOpen(false)}>
            Start a brief <ArrowUpRight size={14} />
          </a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function CakeCard({ cake, onSelect }: { cake: Cake; onSelect: (cake: Cake) => void }) {
  return (
    <button className="cake-card" type="button" data-testid={`card-cake-${cake.id}`} onClick={() => onSelect(cake)} aria-label={`View details for ${cake.name}`}>
      <div className="cake-card-media">
        <img src={cake.image} alt={`${cake.name} ${cake.category}`} loading="lazy" />
        <span className="cake-card-tag">{cake.tag}</span>
      </div>
      <div className="cake-card-body">
        <div>
          <h3 className="cake-card-name">{cake.name}</h3>
          <p className="cake-card-category">{cake.category}</p>
        </div>
        <span className="cake-card-price">Price on request</span>
      </div>
    </button>
  );
}

function CakeModal({ cake, onClose, onOrder }: { cake: Cake; onClose: () => void; onOrder: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="modal-card" role="dialog" aria-modal="true" aria-labelledby="cake-modal-title">
        <button className="modal-close" type="button" aria-label="Close cake details" data-testid="button-close-cake-modal" onClick={onClose}><X size={18} /></button>
        <div className="modal-image"><img src={cake.image} alt={`${cake.name}, ${cake.category}`} /></div>
        <div className="modal-body">
          <p className="modal-category">{cake.category}</p>
          <h2 className="modal-title" id="cake-modal-title">{cake.name}</h2>
          <p className="modal-price">Price on request</p>
          <p className="modal-desc">{cake.description}</p>
          <p className="modal-note">Your idea. Her creativity. Your cake.</p>
          <button className="primary-cta" type="button" data-testid={`button-order-${cake.id}`} onClick={onOrder}>Ask about this cake <ArrowUpRight size={15} /></button>
        </div>
      </article>
    </div>
  );
}

function Lightbox({ image, label, onClose }: { image: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop lightbox-backdrop" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <button className="modal-close" type="button" aria-label="Close image viewer" data-testid="button-close-lightbox" onClick={onClose}><X size={18} /></button>
      <img className="lightbox-image" src={image} alt={label} onClick={(event) => event.stopPropagation()} />
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [lightbox, setLightbox] = useState<{ image: string; label: string } | null>(null);
  const [briefSent, setBriefSent] = useState(false);
  const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 821 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    event.currentTarget.style.setProperty('--depth-x', `${x}px`);
    event.currentTarget.style.setProperty('--depth-y', `${y}px`);
    event.currentTarget.style.setProperty('--depth-rotate', `${x / 9}deg`);
  };
  const resetHeroDepth = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--depth-x', '0px');
    event.currentTarget.style.setProperty('--depth-y', '0px');
    event.currentTarget.style.setProperty('--depth-rotate', '0deg');
  };

  useEffect(() => {
    document.title = `${siteConfig.brand.fullName} | Cakes made personal`;
    const description = siteConfig.brand.description;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', siteConfig.brand.fullName);
    document.head.appendChild(ogTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    document.head.appendChild(ogDescription);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCake || lightbox || splashVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCake, lightbox, splashVisible]);

  const visibleCakes = activeCategory === 'All' ? cakes : cakes.filter((cake) => cake.category === activeCategory);
  const openBrief = (cake?: Cake) => {
    setSelectedCake(null);
    document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' });
    if (cake) {
      window.setTimeout(() => {
        const idea = document.querySelector<HTMLTextAreaElement>('#cake-idea');
        if (idea) idea.value = `I’m interested in the ${cake.name}. `;
      }, 450);
    }
  };

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const occasion = String(form.get('occasion') || '').trim();
    const date = String(form.get('date') || '').trim();
    const idea = String(form.get('idea') || '').trim();
    const message = `Hello ${siteConfig.brand.fullName}!%0A%0AName: ${encodeURIComponent(name)}%0AOccasion: ${encodeURIComponent(occasion)}%0ADate: ${encodeURIComponent(date)}%0AMy idea: ${encodeURIComponent(idea)}`;
    setBriefSent(true);
    window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {splashVisible && <BrandReveal onDone={() => setSplashVisible(false)} />}
      <div className="site-shell" id="top">
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <span className="petal hero-petal-one" /><span className="petal hero-petal-two" /><span className="petal hero-petal-three" />
            <div className="hero-content">
              <div className="hero-copy brand-reveal">
                <p className="hero-kicker">small-batch cakes · made in her kitchen</p>
                <h1 className="hero-title" id="hero-title">The<br className="hero-break" /> <em>Dessert</em><br className="hero-break" /> Diary</h1>
                <p className="hero-subtitle">{siteConfig.brand.tagline}</p>
                <div className="hero-actions">
                  <a className="primary-cta" href="#catalogue" data-testid="link-hero-catalogue">Explore the catalogue <ArrowDownRight size={15} /></a>
                  <a className="secondary-cta" href="#order" data-testid="link-hero-order">Tell us your idea <ArrowUpRight size={15} /></a>
                </div>
                <div className="hero-note" aria-label="Bakery details">
                  <span><Heart size={14} /> eggless, always</span>
                  <span><Sparkles size={14} /> made to order</span>
                </div>
              </div>
              <div className="hero-object" aria-label="Featured floral celebration cake" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroDepth}>
                <img src="/cakes/rose-birthday.jpeg" alt="White celebration cake with deep red piped roses" />
                <span className="hero-object-label">made to order · with love</span>
              </div>
            </div>
            <div className="scroll-cue" aria-hidden="true">scroll to savour</div>
          </section>

          <section className="intro" id="story" aria-labelledby="story-title">
            <div className="section-wrap intro-grid">
              <Reveal className="intro-image">
                <img src="/cakes/rose-birthday.jpeg" alt="White birthday cake finished with deep red roses" loading="lazy" />
                <span className="image-caption">a cake with a point of view</span>
              </Reveal>
              <Reveal delay={1}>
                <p className="eyebrow">a note from the kitchen</p>
                <h2 className="intro-title" id="story-title">A Little Something <em>for Every Occasion</em></h2>
                <p className="intro-copy">{siteConfig.brand.name} is a home bakery by SS, where every cake begins with a conversation. A colour you love. A memory you want to keep. A person who deserves more than an ordinary slice.</p>
                <p className="intro-copy">From a quiet bento cake to a full theme centrepiece, the details are piped, placed and packed with care — eggless, fresh and made just for your table.</p>
                <div className="signature">with love, SS</div>
              </Reveal>
            </div>
          </section>

          <section className="catalogue" id="catalogue" aria-labelledby="catalogue-title">
            <div className="section-wrap">
              <Reveal className="catalogue-head">
                <div>
                  <p className="eyebrow">the catalogue</p>
                  <h2 className="section-title" id="catalogue-title">Choose your <em>kind</em> of sweet.</h2>
                </div>
                <p className="section-intro">Browse the things we love to make. Tap any cake for its little story — then make it yours.</p>
              </Reveal>
              <Reveal delay={1}>
                <div className="filters" role="tablist" aria-label="Cake categories">
                  {categories.map((category) => (
                    <button className={`filter-button ${activeCategory === category ? 'active' : ''}`} type="button" role="tab" aria-selected={activeCategory === category} key={category} data-testid={`button-filter-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`} onClick={() => setActiveCategory(category)}>
                      {category}
                    </button>
                  ))}
                </div>
              </Reveal>
              <div className="cake-grid" aria-live="polite">
                {visibleCakes.map((cake, index) => (
                  <Reveal key={cake.id} delay={(index % 3) + 1}>
                    <CakeCard cake={cake} onSelect={setSelectedCake} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="custom" id="custom" aria-labelledby="custom-title">
            <div className="section-wrap custom-grid">
              <Reveal>
                <p className="eyebrow">the custom cake diary</p>
                <h2 className="section-title" id="custom-title">Your Idea.<br /><em>Her Creativity.</em><br />Your Cake.</h2>
                <p className="custom-copy">Have a very particular vision? Tell us the mood, the colours, the inside flavour, the message, the tiny thing that will make them say, “This is so us.” We’ll turn your idea into something deliciously real.</p>
                <ul className="custom-list">
                  <li><Check size={15} /> flavour, colour and size</li>
                  <li><Check size={15} /> theme and topper details</li>
                  <li><Check size={15} /> personalised message</li>
                  <li><Check size={15} /> eggless celebration cakes</li>
                </ul>
                <a className="secondary-cta" href="#order" data-testid="link-custom-brief">Share your brief <ArrowUpRight size={15} /></a>
              </Reveal>
              <Reveal delay={2} className="custom-card">
                <img src="/cakes/dance-theme.jpeg" alt="Custom dance themed cake with a dancer topper" loading="lazy" />
                <h3 className="custom-card-title">No idea is too specific.</h3>
                <p>“Dance is the expression of emotion.”</p>
                <span className="custom-card-meta">Featured custom theme · Price on request</span>
              </Reveal>
            </div>
          </section>

          <section className="process" id="how-it-works" aria-labelledby="process-title">
            <div className="section-wrap">
              <Reveal className="process-head">
                <div>
                  <p className="eyebrow">how the magic moves</p>
                  <h2 className="section-title" id="process-title">From thought<br />to <em>first bite.</em></h2>
                </div>
                <p>Keep it simple. We’ll ask the right questions, confirm the details, and make your celebration feel looked after.</p>
              </Reveal>
              <div className="steps">
                <Reveal className="step" delay={1}><span className="step-number">01</span><span className="step-icon"><MessageCircle size={17} /></span><h3>Send the idea</h3><p>WhatsApp your occasion, date, flavour wishes and any references you have.</p></Reveal>
                <Reveal className="step" delay={2}><span className="step-number">02</span><span className="step-icon"><Palette size={17} /></span><h3>Make it yours</h3><p>We shape the design together — colours, size, message, topper and all the lovely details.</p></Reveal>
                <Reveal className="step" delay={3}><span className="step-number">03</span><span className="step-icon"><CalendarDays size={17} /></span><h3>Confirm the day</h3><p>Your flavour, design and date are confirmed before the cake is booked into the kitchen.</p></Reveal>
                <Reveal className="step" delay={1}><span className="step-number">04</span><span className="step-icon"><Heart size={17} /></span><h3>Celebrate</h3><p>We bake fresh, pack with care and confirm delivery availability with your order.</p></Reveal>
              </div>
            </div>
          </section>

          <section className="gallery" id="gallery" aria-labelledby="gallery-title">
            <div className="section-wrap">
              <Reveal className="gallery-head">
                <div>
                  <p className="eyebrow">from the diary</p>
                  <h2 className="section-title" id="gallery-title">The cakes <em>in their element.</em></h2>
                </div>
                <p className="gallery-hint"><CircleArrowOutUpRight size={14} /> tap to take a closer look</p>
              </Reveal>
              <div className="gallery-grid">
                {gallery.map((item, index) => (
                  <Reveal key={item.image} delay={(index % 3) + 1} className="gallery-item">
                    <button type="button" className="gallery-item" aria-label={`Open ${item.label} image`} data-testid={`button-gallery-${index + 1}`} onClick={() => setLightbox(item)}>
                      <img src={item.image} alt={item.label} loading="lazy" />
                      <span className="gallery-label">{item.label}</span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-band" id="order" aria-labelledby="order-title">
            <Reveal>
              <p className="eyebrow" style={{ justifyContent: 'center' }}>let’s make a little magic</p>
              <h2 id="order-title">Ready to make your occasion sweeter?</h2>
              <p>Share the first thought. We’ll take it from there.</p>
              <a className="primary-cta" href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} target="_blank" rel="noreferrer" data-testid="link-whatsapp-cta"><MessageCircle size={16} /> WhatsApp {siteConfig.contact.whatsappDisplay}</a>
            </Reveal>
            <div className="section-wrap order-form-wrap">
              <Reveal delay={1} className="order-form-card">
                <div className="order-form-intro">
                  <p className="eyebrow">or leave a little note</p>
                  <h3>Start your custom brief.</h3>
                  <p>There’s no need to have it all figured out. A name, an occasion and a feeling is a perfect place to begin.</p>
                  {briefSent && <p className="form-success" role="status" data-testid="status-brief-sent"><Check size={15} /> Your brief is ready in WhatsApp.</p>}
                </div>
                <form onSubmit={submitBrief} className="brief-form">
                  <div className="brief-field">
                    <label htmlFor="brief-name">Your name <span>*</span></label>
                    <input id="brief-name" name="name" required placeholder="How should we say hello?" data-testid="input-brief-name" />
                  </div>
                  <div className="brief-field">
                    <label htmlFor="brief-occasion">The occasion <span>*</span></label>
                    <input id="brief-occasion" name="occasion" required placeholder="Birthday, anniversary, just because…" data-testid="input-brief-occasion" />
                  </div>
                  <div className="brief-field">
                    <label htmlFor="brief-date">Date you’re dreaming of</label>
                    <input id="brief-date" name="date" type="date" data-testid="input-brief-date" />
                  </div>
                  <div className="brief-field brief-field-wide">
                    <label htmlFor="cake-idea">Your idea</label>
                    <textarea id="cake-idea" name="idea" rows={3} placeholder="Colours, flavours, a reference, a feeling…" data-testid="input-brief-idea" />
                  </div>
                  <button className="primary-cta" type="submit" data-testid="button-submit-brief">Send the brief <ArrowUpRight size={15} /></button>
                </form>
              </Reveal>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="section-wrap footer-grid">
            <div>
              <a className="brand-mark" href="#top" data-testid="link-footer-home"><span className="brand-name">{siteConfig.brand.name}</span><span className="brand-by">{siteConfig.brand.byline}</span></a>
              <p className="footer-tagline">{siteConfig.brand.tagline}</p>
            </div>
            <div>
              <p className="footer-heading">Explore</p>
              <div className="footer-links">
                <a href="#story" data-testid="link-footer-story">The diary</a>
                <a href="#catalogue" data-testid="link-footer-catalogue">Catalogue</a>
                <a href="#custom" data-testid="link-footer-custom">Custom cakes</a>
                <a href="#how-it-works" data-testid="link-footer-process">How to order</a>
              </div>
            </div>
            <div>
              <p className="footer-heading">Find the bakery</p>
              <div className="footer-contact">
                <a href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp"><MessageCircle size={14} /> WhatsApp {siteConfig.contact.whatsappDisplay}</a>
                <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={14} /> {siteConfig.contact.instagramHandle}</a>
                <span><Clock3 size={14} /> Made fresh to order</span>
                <span><MapPin size={14} /> Delivery availability confirmed per order</span>
              </div>
            </div>
          </div>
          <div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.brand.fullName}</span><span>eggless cakes · made with care</span></div>
        </footer>
      </div>
      {selectedCake && <CakeModal cake={selectedCake} onClose={() => setSelectedCake(null)} onOrder={() => openBrief(selectedCake)} />}
      {lightbox && <Lightbox image={lightbox.image} label={lightbox.label} onClose={() => setLightbox(null)} />}
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;