import { useEffect, useRef, useState } from 'react'
import { gallery, packages, services, site } from './data/site.js'

const iconPaths = {
  ArrowDown: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>, ArrowLeft: <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
  ArrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>, ArrowUp: <><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>,
  Check: <path d="m5 12 4 4L19 6"/>, ChevronDown: <path d="m6 9 6 6 6-6"/>,
  Menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>, X: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
}
const Icon = ({ name, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>

const photo = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const categories = ['All moments', 'Traditional Weddings', 'Luxury Weddings', 'Floral Decor', 'Mandap Designs', 'Receptions', 'Pre-Wedding Celebrations']

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All moments')
  const [activeImage, setActiveImage] = useState(null)
  const [faqOpen, setFaqOpen] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState('')
  const [success, setSuccess] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const formRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setActiveImage(null); if (activeImage !== null && e.key === 'ArrowRight') moveImage(1); if (activeImage !== null && e.key === 'ArrowLeft') moveImage(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeImage])

  const shownGallery = gallery.filter(item => filter === 'All moments' || item.category === filter)
  const testimonials = [
    '“It felt like us, from beginning to end.”',
    '“We could simply be present and take it all in.”',
    '“The day unfolded with such ease and warmth.”',
  ]
  const moveImage = direction => setActiveImage(current => (current + direction + shownGallery.length) % shownGallery.length)
  const choosePackage = name => { setSelectedPackage(name); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => formRef.current?.querySelector('[name="name"]')?.focus(), 500) }
  const submitForm = e => { e.preventDefault(); setSuccess(true); e.currentTarget.reset(); setSelectedPackage('') }
  const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hello, I'm interested in planning a wedding. Could we discuss your packages and availability?")}`

  return <>
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}><span className="brand-mark">K</span><span className="brand-name">Kalyanavasa <i>Wedding Event Planners</i></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Icon name="X" /> : <Icon name="Menu" />}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {[['Home','home'],['Our Story','story'],['Packages','packages'],['Gallery','gallery'],['Services','services'],['Contact','contact']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Plan your wedding <span>↗</span></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-photo" role="img" aria-label="Romantic Indian wedding mandap framed by abundant flowers" />
        <div className="hero-wash" />
        <div className="hero-copy">
          <div className="eyebrow light"><span /> Weddings · Celebrations · Memories</div>
          <h1>Every love story<br />deserves a <em>beautiful</em><br />beginning.</h1>
          <p>We bring your people, traditions and dreams together in a celebration that feels entirely your own.</p>
          <div className="hero-actions"><a className="button button-light" href="#gallery">Explore our weddings <Icon name="ArrowRight" size={16} /></a><a className="text-link light-link" href="#contact">Let’s plan together <span>↗</span></a></div>
        </div>
        <div className="hero-caption">Thoughtfully planned.<br /><i>Beautifully remembered.</i></div>
        <a className="scroll-cue" href="#story"><span>Scroll to discover</span><Icon name="ArrowDown" size={14} /></a>
        <div className="hero-index">01 <span>—</span> 04</div>
      </section>

      <section className="intro section-pad" id="story">
        <div className="intro-visual reveal"><img src={photo('photo-1606800052052-a08af7148866')} alt="Warmly lit wedding ceremony with thoughtfully arranged flowers"/><div className="image-note">A day that feels<br/><i>like your own.</i></div></div>
        <div className="intro-copy reveal"><div className="eyebrow"><span/> A little about us</div><h2>More than a wedding.<br/>A story that <em>becomes yours.</em></h2><p className="lead">The most memorable celebrations are the ones that feel like you.</p><p>At Kalyanavasa, we bring thoughtful planning, meaningful traditions and considered design together—so you can be present for every moment, while the details fall gently into place.</p>
          <div className="principles"><div><b>01</b><span>Thoughtfully<br/>curated</span></div><div><b>02</b><span>Beautifully<br/>personal</span></div><div><b>03</b><span>Seamlessly<br/>executed</span></div></div><a href="#services" className="text-link">The way we work <span>↗</span></a></div>
      </section>

      <section className="packages section-pad" id="packages"><div className="section-heading reveal"><div><div className="eyebrow"><span/> Celebrations, considered</div><h2>A beginning for<br/><em>every kind of forever.</em></h2></div><p>Every celebration has its own rhythm. Find the kind of support that feels right for yours.</p></div>
        <div className="package-grid">{packages.map((item, i) => <article className={`package-card reveal ${i===1?'featured':''}`} key={item.name}><div className="package-image"><img src={photo(item.image,850)} alt={`${item.name} wedding celebration inspiration`}/><span className="package-number">0{i+1}</span></div><div className="package-body"><div className="eyebrow">{item.note}</div><h3>{item.name}</h3><p>{item.description}</p><button className="text-link" onClick={() => choosePackage(item.name)}>Enquire about this plan <Icon name="ArrowRight" size={15}/></button><details><summary>What’s included <Icon name="ChevronDown" size={15}/></summary><ul>{item.features.map(f=><li key={f}>{f}</li>)}</ul></details></div></article>)}</div>
        <p className="package-note">Every celebration is unique. Packages can be tailored to your vision.</p>
      </section>

      <section className="services section-pad" id="services"><div className="services-head reveal"><div className="eyebrow light"><span/> The thoughtful details</div><h2>Here for every<br/><em>little and lasting thing.</em></h2><p>From the first sketch to the last dance, we take care of the moving parts so you can be in the moment.</p></div><div className="service-list">{services.map(([num,title,desc])=><article className="service-item reveal" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p><Icon name="ArrowRight" size={16}/></article>)}</div></section>

      <section className="gallery-section section-pad" id="gallery"><div className="section-heading reveal"><div><div className="eyebrow"><span/> The inspiration edit</div><h2>Little moments,<br/><em>beautifully gathered.</em></h2></div><p>A collection of details and settings to spark an idea. Shared as inspiration, while our own celebrations await their stories.</p></div>
        <div className="filters" role="group" aria-label="Filter gallery">{categories.map(c=><button className={filter===c?'active':''} key={c} onClick={()=>{setFilter(c);setVisibleCount(6)}}>{c}</button>)}</div>
        <div className="gallery-grid">{shownGallery.slice(0,visibleCount).map((item,i)=><button className={`gallery-item ${item.shape||''} reveal`} key={item.image} onClick={()=>setActiveImage(i)} aria-label={`Open image: ${item.caption}`}><img src={photo(item.image,900)} alt={item.caption}/><span className="gallery-caption"><small>{item.category}</small>{item.caption}</span></button>)}</div>
        {shownGallery.length>visibleCount&&<button className="button button-outline gallery-more" onClick={()=>setVisibleCount(shownGallery.length)}>View more moments <Icon name="ArrowDown" size={15}/></button>}
      </section>

      <section className="process section-pad"><div className="process-title reveal"><div className="eyebrow"><span/> Your day, thoughtfully planned</div><h2>From your first idea<br/>to your <em>forever memory.</em></h2></div><div className="timeline">{[['01','Let’s connect','We listen to your vision, preferences, traditions and expectations.'],['02','Dream & design','Together we shape your theme, decor direction and celebration plan.'],['03','Plan every detail','We coordinate vendors, schedules, venue arrangements and logistics.'],['04','Celebrate beautifully','You get to be present while the thoughtful plan comes to life.']].map(([n,title,desc])=><article className="timeline-step reveal" key={n}><span className="step-no">{n}</span><span className="step-dot"/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section className="why section-pad"><div className="why-photo reveal"><img src={photo('photo-1511285560929-80b456fea0bc')} alt="Newlyweds sharing a quiet moment after their ceremony"/><span>Made with care,<br/><i>from the very first detail.</i></span></div><div className="why-copy reveal"><div className="eyebrow"><span/> The Kalyanavasa approach</div><h2>Good planning<br/>makes room for <em>more joy.</em></h2><p>We believe your wedding should feel generous, considered and true to you. Our role is to listen closely, bring clarity to the decisions and make the day easier to enjoy.</p><div className="why-points">{[['Personal celebrations','Your story guides each choice, from the overall feeling to the smallest detail.'],['Care in the details','A thoughtful eye keeps the many pieces feeling connected.'],['Considered budgets','We help shape priorities around what matters to you.'],['Steady coordination','Clear plans and communication help everyone move together.']].map(([t,d])=><div key={t}><Icon name="Check" size={15}/><p><b>{t}</b><br/>{d}</p></div>)}</div></div></section>

      <section className="testimonial section-pad"><div className="eyebrow light"><span/> Kind words (placeholders)</div><h2>{testimonials[testimonialIndex]}</h2><p className="quote-note">Sample testimonial placeholder — replace with real client feedback before publication.</p><div className="quote-controls"><button aria-label="Previous testimonial" onClick={()=>setTestimonialIndex((testimonialIndex+testimonials.length-1)%testimonials.length)}><Icon name="ArrowLeft"/></button><span>0{testimonialIndex+1} <i>—</i> 0{testimonials.length}</span><button aria-label="Next testimonial" onClick={()=>setTestimonialIndex((testimonialIndex+1)%testimonials.length)}><Icon name="ArrowRight"/></button></div></section>

      <section className="faq section-pad"><div className="faq-intro reveal"><div className="eyebrow"><span/> A few helpful things</div><h2>Good to know<br/><em>before we begin.</em></h2><p>Have a question we haven’t covered? We’d love to hear from you.</p><a href="#contact" className="text-link">Ask us anything <span>↗</span></a></div><div className="faq-list">{[
        ['How early should we book our wedding planner?','Many couples reach out 9–18 months ahead, especially for popular dates. If your celebration is sooner, get in touch—availability depends on the date and scope.'],
        ['Can we customize a wedding package?','Absolutely. The packages are a starting point, and we can tailor the scope around your priorities, traditions and celebration plans.'],
        ['Do you plan pre-wedding events and receptions?','Yes. We can help coordinate pre-wedding functions, the ceremony and reception, whether they happen together or across several days.'],
        ['Can you work with our preferred vendors?','Of course. We’re happy to coordinate with vendors you already love and can help explore options where you need them.'],
        ['Do you help with venue selection?','Yes. We can talk through your guest count, setting and practical needs to help find a venue that feels right.'],
        ['Can we discuss our requirements before choosing a package?','Please do. A first conversation is a lovely place to share your ideas and learn what kind of planning support might suit you.'],
      ].map(([q,a],i)=><article className={`faq-item ${faqOpen===i?'open':''}`} key={q}><button aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><Icon name="ChevronDown" size={17}/></button><div className="faq-answer"><p>{a}</p></div></article>)}</div></section>

      <section className="contact section-pad" id="contact"><div className="contact-intro reveal"><div className="eyebrow light"><span/> Your next chapter</div><h2>Let’s create<br/>something <em>beautiful</em><br/>together.</h2><p>Tell us a little about what you’re dreaming of. We’d love to hear where it begins.</p><div className="contact-lines"><a href={`mailto:${site.email}`}>{site.email}</a><span>{site.phone}</span><span>{site.location}</span></div><a className="whatsapp-link" href={waUrl} target="_blank" rel="noreferrer">A quick hello on WhatsApp <Icon name="ArrowRight" size={15}/></a></div>
        <form className="enquiry-form reveal" ref={formRef} onSubmit={submitForm}><div className="form-title">A note to Kalyanavasa <span>— let’s begin</span></div><div className="form-grid"><label>Your name *<input name="name" required autoComplete="name" placeholder="How should we address you?"/></label><label>Phone number *<input name="phone" required type="tel" autoComplete="tel" placeholder="Your best contact number"/></label><label>Email address *<input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></label><label>Wedding date<input name="date" type="date"/></label><label className="wide">Venue or city<input name="venue" placeholder="Where are you celebrating?"/></label><label>Package<select name="package" value={selectedPackage} onChange={e=>setSelectedPackage(e.target.value)}><option value="">Still exploring</option>{packages.map(p=><option key={p.name}>{p.name}</option>)}</select></label><label>Estimated guests<input name="guests" type="number" min="1" placeholder="A rough number is fine"/></label><label className="wide">Events to be planned<input name="events" placeholder="Ceremony, reception, pre-wedding…"/></label><label className="wide">Anything else on your mind?<textarea name="notes" rows="3" placeholder="Share a little about your hopes for the day"/></label></div><button className="button button-light submit-button" type="submit">Send an enquiry <Icon name="ArrowRight" size={16}/></button><p className="form-disclaimer">This is a frontend demo. Your enquiry is not sent or saved; backend integration is needed to receive submissions.</p>{success&&<div className="success-message" role="status">Thank you for sharing your plans. This demo has validated your enquiry; it hasn’t been sent. <button type="button" onClick={()=>setSuccess(false)} aria-label="Dismiss">×</button></div>}</form>
      </section>
    </main>

      <footer className="footer"><div className="footer-top"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">K</span><span className="brand-name">Kalyanavasa <i>Wedding Event Planners</i></span></a><p>Thoughtful planning for celebrations<br/>that feel entirely your own.</p></div><div><h4>Find your way</h4><a href="#story">Our story</a><a href="#packages">Packages</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div><div><h4>Thoughtful details</h4><a href="#services">Wedding design</a><a href="#services">Floral styling</a><a href="#services">Guest hospitality</a><a href="#services">Full planning</a></div><div><h4>Say hello</h4><span>{site.phone}</span><span>{site.email}</span><span>{site.location}</span><div className="socials"><a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="Instagram" size={17}/></a><a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href={waUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">wa</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kalyanavasa Wedding Event Planners</span><span>Made with care, for the moments that matter.</span><a href="#home" aria-label="Back to top">Back to top <Icon name="ArrowUp" size={14}/></a></div></footer>
    <a className="floating-wa" href={waUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">wa</a>

    {activeImage!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={()=>setActiveImage(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={()=>setActiveImage(null)}><Icon name="X"/></button><button className="lightbox-prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();moveImage(-1)}}><Icon name="ArrowLeft"/></button><figure onClick={e=>e.stopPropagation()}><img src={photo(shownGallery[activeImage].image,1600)} alt={shownGallery[activeImage].caption}/><figcaption>{shownGallery[activeImage].category} <span>·</span> {shownGallery[activeImage].caption}</figcaption></figure><button className="lightbox-next" aria-label="Next image" onClick={e=>{e.stopPropagation();moveImage(1)}}><Icon name="ArrowRight"/></button></div>}
  </>
}

export default App
