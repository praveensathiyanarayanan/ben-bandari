/**
 * Ben Bandari — Contemporary Real Estate Portfolio
 * Interactive Functionality & Editorial Overlays
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPropertyFilter();
  initPortfolioCarousel();
  initModals();
  initContactForm();
  initScrollAnimations();
  initParallaxEffects();
  initTransactionsCarousel();
  initDeckScroll();
});

/* ==========================================================================
   Navigation
   ========================================================================== */
function initNavigation() {
  const siteNav = document.getElementById('siteNav');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileClose = document.getElementById('mobileCloseBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileDrawerBackdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-links a');

  // Scroll detection for header style
  function checkScroll() {
    if (window.scrollY > 50) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  // Mobile menu open / close
  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  // Close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Logo click: scroll smoothly to top
  const brandLogos = document.querySelectorAll('.nav-brand');
  brandLogos.forEach(brand => {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (history.pushState) {
        history.pushState(null, null, '#hero');
      }
    });
  });

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));
}

/* ==========================================================================
   Property Filter & Live Category Switching
   ========================================================================== */
function initPropertyFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.portfolio-card[data-property-category]');
  const track = document.getElementById('portfolioTrack');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      propertyCards.forEach(card => {
        const cardCategory = card.getAttribute('data-property-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });

      if (track) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   Modals (Property Details, Approach, Editorial)
   ========================================================================== */
const PROPERTY_DATA = {
  'residence': {
    title: 'The Residence',
    subtitle: 'Bellevue Hill, Sydney',
    price: '$18,500,000 AUD',
    specs: '4 Bedrooms · 4.5 Bathrooms · 520 sqm Internal Area · 820 sqm Land',
    status: 'SOVEREIGN MANDATE',
    architect: 'Durbach Block Jaggers',
    year: '2023',
    overview: 'An exemplary masterwork of contemporary Australian residential architecture. Perched on one of Bellevue Hill’s most coveted ridgelines, The Residence balances monolithic off-form concrete volumes with warm European oak joinery, frameless floor-to-ceiling glass, and landscaped subtropical courtyard sanctuaries designed by Myles Baldwin.',
    features: [
      'Master wing with dual dressing suites and limestone-clad bathroom',
      'Temperature-controlled subterranean wine cellar (1,200 bottle capacity)',
      '12-metre heated infinity-edge lap pool with harbour glimpses',
      'Bespoke Bulthaup kitchen with full suite of Gaggenau 400 appliances',
      'Private 4-car basement gallery with level internal lift access',
      'Integrated Bang & Olufsen architectural acoustics throughout'
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
  },
  'glass-pavilion': {
    title: 'The Glass Pavilion',
    subtitle: 'Toorak, Melbourne',
    price: '$24,000,000 AUD',
    specs: '5 Bedrooms · 6 Bathrooms · 780 sqm Internal Area · 1,140 sqm Land',
    status: 'PRIVATE TREATY',
    architect: 'Rob Mills Architecture & Interiors',
    year: '2024',
    overview: 'Set within an intensely private botanical precinct of prime Toorak, The Glass Pavilion represents the pinnacle of sculptural modernist pavilion design. Soaring double-height ceilings, hand-selected travertine slabs, and glass curtain walls create an effortless dialogue between interior serenity and reflective water features.',
    features: [
      'Dramatic 6-metre soaring gallery ceiling with skylights',
      'Wellness sanctuary featuring sauna, steam room, and cold plunge',
      'Self-contained guest residence with independent street access',
      'Sculptural spiral staircase formed from hand-poured white concrete',
      'Subterranean 6-car collector showroom with glass viewing ceiling'
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
  },
  'clontarf-monolith': {
    title: 'The Clontarf Monolith',
    subtitle: 'Middle Harbour, Sydney',
    price: '$28,500,000 AUD',
    specs: '5 Bedrooms · 6 Bathrooms · 840 sqm Internal · Deepwater Jetty',
    status: 'CONFIDENTIAL MANDATE',
    architect: 'Casey Brown Architecture',
    year: '2023',
    overview: 'Sculpted directly into the sandstone sea-cliffs of Middle Harbour, this monolithic trophy residence commands private beachfront access, a permanent deepwater jetty for private craft up to 65 feet, and an internal commercial-grade elevator linking 4 levels of pristine architectural living.',
    features: [
      'Private deepwater jetty with power, water, and vessel mooring pen',
      'Direct beach frontage with boathouse and water-craft launch ramp',
      'Internal 8-person commercial lift servicing all 4 levels',
      'Heated cantilevered horizon pool overlooking nautical passage',
      'Complete home automation with biometric security protocol'
    ],
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85'
  },
  'vaucluse-sanctuary': {
    title: 'Vaucluse Modernist Sanctuary',
    subtitle: 'Queens Avenue, Vaucluse, Sydney',
    price: '$22,500,000 AUD',
    specs: '4 Bedrooms · 5 Bathrooms · 610 sqm Internal · 950 sqm Grounds',
    status: 'OFF-MARKET EXCLUSIVE',
    architect: 'Luigi Rosselli Architects',
    year: '2023',
    overview: 'An extraordinary sanctuary marrying Rosselli’s signature fluid rammed-earth curves with expansive limestone terraces framing Sydney Harbour and the city skyline. Intimate internal courtyards create an ambient microclimate of light and silence.',
    features: [
      'Unobstructed city skyline and Sydney Harbour Bridge panoramas',
      'Subterranean wellness suite with Himalayan salt sauna and ice bath',
      'Acoustically isolated 10-seat Dolby Atmos screening room',
      'Full solar & Tesla Powerwall infrastructure with smart load-balancing',
      'Internal 5-car subterranean gallery with vehicle turntable'
    ],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
  },
  'crown-sky-villa': {
    title: 'The Crown Sky Villa',
    subtitle: 'One Circular Quay, Sydney',
    price: '$42,000,000 AUD',
    specs: '5 Bedrooms · 6 Bathrooms · 680 sqm Internal · 120 sqm Sky Deck',
    status: 'TROPHY PENTHOUSE',
    architect: 'Kerry Hill Architects',
    year: '2024',
    overview: 'Occupying the uppermost dual levels of Sydney’s most prestigious harbour address, The Crown Sky Villa commands 360-degree vistas across the Sydney Opera House, Harbour Bridge, and Pacific Ocean. A private internal glass elevator links both entertaining and private family quarters.',
    features: [
      'Double-height great room with 7-metre glass curtain walls',
      'Private rooftop sky terrace with heated plunge pool and outdoor fireplace',
      'Direct private key-coded express elevator access',
      'Dedicated 24/7 concierge and private five-star resident amenities',
      'Secure 4-car private vault within the underground parking facility'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
  },
  'botanical-penthouse': {
    title: 'The Botanical Penthouse',
    subtitle: 'East Melbourne Parkland Enclave',
    price: '$19,500,000 AUD',
    specs: '4 Bedrooms · 4.5 Bathrooms · 450 sqm Internal · 140 sqm Terrace',
    status: 'PRIVATE SYNDICATE',
    architect: 'Bates Smart',
    year: '2023',
    overview: 'Suspended above the canopy of the historic Fitzroy Gardens, this full-floor residence synthesises bespoke bronze joinery, Fior di Bosco Italian marble, and floor-to-ceiling glass wrapping around a private entertainer terrace with heated plunge pool.',
    features: [
      'Direct uninterrupted views over Fitzroy Gardens and Melbourne CBD skyline',
      'Private 140 sqm rooftop terrace with outdoor kitchen and wet bar',
      'Temperature-controlled 800-bottle dual-zone wine room',
      'Master suite occupying entire western wing with private terrace access',
      'Private 3-car lock-up garage with high-speed EV charging'
    ],
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85'
  },
  'horizon-crown': {
    title: 'Horizon Tower Crown',
    subtitle: 'Southbank, Melbourne',
    price: '$16,800,000 AUD',
    specs: '3 Bedrooms · 3.5 Bathrooms · 390 sqm Internal · 4-Car Vault',
    status: 'DISCREET ACQUISITION',
    architect: 'Elenberg Fraser',
    year: '2023',
    overview: 'Perched high above the Yarra River with 270-degree panoramic horizons encompassing Port Phillip Bay, the Botanic Gardens, and the glittering Melbourne city grid. Featuring bespoke brushed brass accents, automated acoustic glass, and executive boardroom facilities.',
    features: [
      'Private sky office with dedicated commercial fiber-optic connection',
      'Automated motorized glass acoustic panels throughout',
      'Executive master suite with Italian marble double shower and soak tub',
      'Resident access to private 25m indoor lap pool, gym, and private cinema',
      'Private 4-car enclosed basement garage with private storage annex'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
  },
  'promontory-estate': {
    title: 'The Promontory Estate',
    subtitle: 'Whale Beach, Northern Beaches, Sydney',
    price: 'Guide $32,000,000 AUD',
    specs: '6 Bedrooms · 7 Bathrooms · 1,250 sqm Building · 2,400 sqm Oceanfront Land',
    status: 'SOVEREIGN COMPOUND',
    architect: 'Peter Stutchbury Architecture',
    year: '2024',
    overview: 'A generational oceanfront estate commanding an entire headland promontory over Whale Beach. Masterfully engineered with weathered copper, zinc, local sandstone, and recycled ironbark timber, The Promontory is an international benchmark for coastal luxury that yields profound privacy and majestic Pacific swells.',
    features: [
      'Direct private access stairs descending to secluded ocean rock pools',
      'Helipad approval subject to council reservation',
      'Commercial-grade catering scullery and open entertainer kitchen',
      'Separate 2-bedroom caretaker or guest lodge with ocean balconies',
      '25m cantilevered infinity pool suspended above the ocean cliff'
    ],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
  },
  'promontory': {
    title: 'The Promontory Estate',
    subtitle: 'Whale Beach, Northern Beaches, Sydney',
    price: 'Guide $32,000,000 AUD',
    specs: '6 Bedrooms · 7 Bathrooms · 1,250 sqm Building · 2,400 sqm Oceanfront Land',
    status: 'SOVEREIGN COMPOUND',
    architect: 'Peter Stutchbury Architecture',
    year: '2024',
    overview: 'A generational oceanfront estate commanding an entire headland promontory over Whale Beach. Masterfully engineered with weathered copper, zinc, local sandstone, and recycled ironbark timber, The Promontory is an international benchmark for coastal luxury that yields profound privacy and majestic Pacific swells.',
    features: [
      'Direct private access stairs descending to secluded ocean rock pools',
      'Helipad approval subject to council reservation',
      'Commercial-grade catering scullery and open entertainer kitchen',
      'Separate 2-bedroom caretaker or guest lodge with ocean balconies',
      '25m cantilevered infinity pool suspended above the ocean cliff'
    ],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
  },
  'st-georges-estate': {
    title: 'St Georges Monolith Estate',
    subtitle: 'St Georges Road, Toorak, Melbourne',
    price: 'Guide $48,000,000 AUD',
    specs: '7 Bedrooms · 8 Bathrooms · 1,600 sqm Building · 3,100 sqm Grounds',
    status: 'GENERATIONAL TRUST',
    architect: 'Carr Design Group',
    year: '2024',
    overview: 'One of the most consequential estate holdings in Australian private wealth history. Spanning over 3,100 square metres of Paul Bangay manicured gardens on Melbourne’s most illustrious avenue. Features a private grand ballroom, subterranean Roman spa, and guardhouse perimeter security.',
    features: [
      'Chauffeur arrival courtyard with garaging for 8 collector vehicles',
      'Subterranean Roman bathhouse with heated mosaic pool, sauna, and steam',
      'Full-size championship north-south tennis court and pavilion',
      'Self-contained guardhouse and security operations centre',
      'Separate 3-bedroom guest villa with independent gated driveway'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
  },
  'wategos-reserve': {
    title: 'Wategos Coastal Reserve',
    subtitle: 'Marine Parade, Byron Bay Oceanfront, NSW',
    price: '$26,000,000 AUD',
    specs: '5 Bedrooms · 6 Bathrooms · 720 sqm Internal · 1,800 sqm Land',
    status: 'COASTAL SOVEREIGN',
    architect: 'Menzies Architecture',
    year: '2023',
    overview: 'Commanding absolute ocean frontage over Wategos Beach and Julian Rocks, this coastal sanctuary merges raw board-formed concrete with weathered teak and vast operable glass walls that dissolve the boundary between indoors and the Pacific surf.',
    features: [
      'Direct private dune path descending straight to Wategos surf break',
      '20m heated horizon pool with sunken ocean-view lounge and fire pit',
      'Master sanctuary occupying top floor with 180-degree ocean views',
      'Sub-tropical landscaped gardens featuring native coastal flora',
      'Secure 4-car basement garage with dedicated surfboard and water-craft bay'
    ],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
  }
};

const EDITORIAL_DATA = {
  'restraint': {
    category: 'ARCHITECTURAL ESSAY',
    title: 'The Architecture of Restraint: Why Understated Design Commands Longevity',
    readTime: '6 MIN READ',
    content: `
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">In prime residential markets, trends come and go with alarming velocity. Bold stylistic gimmicks frequently date residences within a decade of their construction. Yet certain architectural masterpieces appreciate not merely in monetary terms, but in cultural and aesthetic authority as the years pass.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">The difference lies in architectural restraint. When an architect prioritises honesty of material—poured in-situ concrete, hand-quarried travertine, unvarnished bronze, and solid timber—over superficial decorative veneers, the building ages with grace rather than decay.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">In Ben Bandari’s representation of premium properties, architectural provenance is treated as the foundational asset. A home that captures light with precision, respects natural topography, and eliminates visual noise commands enduring loyalty from high-net-worth acquisitions.</p>
      <blockquote style="border-left: 2px solid #E05006; padding-left: 20px; margin: 24px 0; font-style: italic; color: #1C1C1C;">"True luxury is never loud. It is the palpable absence of excess, where every single line serves a functional and emotional purpose." — Ben Bandari</blockquote>
      <p style="font-size: 17px; line-height: 1.6; color: #424242;">As discerning buyers seek enduring sanctuaries, properties rooted in rigorous architectural restraint will continue to outperform speculative luxury development across every metric.</p>
    `
  },
  'off-market': {
    category: 'MARKET INTELLIGENCE',
    title: 'Market Intelligence: The Shift Towards Off-Market Private Treaties',
    readTime: '5 MIN READ',
    content: `
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">Over the past three years, over 65% of Ben Bandari’s headline transactions were transacted without ever appearing on public real estate portals or public print campaigns.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">For ultra-high-net-worth vendors, discretion is paramount. Public marketing inevitably invites unwanted speculation, tourist inspections, and media exposure. Conversely, an off-market private treaty preserves vendor privacy while creating an authentic aura of scarcity and privilege among qualified buyers.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">The cornerstone of successful off-market brokerage is not wide broadcast, but surgical matchmaking. By maintaining deep, long-standing relationships with family offices, private wealth advisors, leading architects, and discreet international buyers, transactions occur swiftly at record-breaking valuations.</p>
    `
  },
  'proportion': {
    category: 'DESIGN PERSPECTIVE',
    title: 'Living with Proportion: Light, Spatial Volume and Contemporary Heritage',
    readTime: '4 MIN READ',
    content: `
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">When clients articulate what makes a home feel exceptional, they rarely cite square meterage first. They speak of warmth, light, calm, and atmosphere. These qualities are the direct byproduct of proportion.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">A room with generous ceiling height must possess balanced width and carefully positioned fenestration so the occupant feels anchored rather than vulnerable. Similarly, transitioning between compression (an intimate entry foyer) and expansion (a dramatic living pavilion framing a garden courtyard) provides the human nervous system with subtle emotional delight.</p>
      <p style="margin-bottom: 16px; font-size: 17px; line-height: 1.6; color: #424242;">Ben Bandari works closely with buyers to evaluate how a floor plan feels to live within, ensuring that capital is invested into properties whose spatial integrity will endure for generations.</p>
    `
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('generalModalBackdrop');
  const modalContainer = document.getElementById('modalDynamicContent');
  const modalClose = document.getElementById('modalCloseBtn');

  function openModal(htmlContent) {
    modalContainer.innerHTML = htmlContent;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    modalContainer.innerHTML = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Property detail triggers
  document.querySelectorAll('[data-property-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-property-key');
      const prop = PROPERTY_DATA[key];
      if (!prop) return;

      const html = `
        <div style="margin-bottom: 24px;">
          <span class="eyebrow" style="margin-bottom: 8px;">${prop.status}</span>
          <h2 style="font-size: 28px; font-weight: 500; color: #1C1C1C; margin-bottom: 4px;">${prop.title}</h2>
          <p style="font-size: 16px; color: #858585; margin-bottom: 16px;">${prop.subtitle}</p>
        </div>

        <div style="position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; margin-bottom: 24px; background: #F8F8F7;">
          <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #E8E8E8; padding-bottom: 16px; margin-bottom: 24px;">
          <div>
            <div style="font-size: 13px; color: #858585; text-transform: uppercase; letter-spacing: 0.08em;">Guide Price</div>
            <div style="font-size: 24px; font-weight: 600; color: #1C1C1C;">${prop.price}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; color: #858585; text-transform: uppercase; letter-spacing: 0.08em;">Architect & Year</div>
            <div style="font-size: 16px; font-weight: 500; color: #1C1C1C;">${prop.architect} (${prop.year})</div>
          </div>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #E05006; margin-bottom: 8px;">Specifications</h4>
          <p style="font-size: 16px; color: #424242; line-height: 1.5;">${prop.specs}</p>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #E05006; margin-bottom: 8px;">Architectural Overview</h4>
          <p style="font-size: 16px; color: #424242; line-height: 1.6;">${prop.overview}</p>
        </div>

        <div style="margin-bottom: 36px;">
          <h4 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #E05006; margin-bottom: 12px;">Key Highlights</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${prop.features.map(f => `
              <li style="display: flex; align-items: baseline; gap: 12px; font-size: 15px; color: #424242;">
                <span style="color: #E05006; font-size: 18px; line-height: 1;">•</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="display: flex; gap: 16px; align-items: center; padding-top: 24px; border-top: 1px solid #E8E8E8;">
          <a href="#contact" class="btn-orange-outline" onclick="document.getElementById('modalCloseBtn').click(); selectInterest('buying');" style="flex: 1; text-align: center;">
            Request Private Viewing with Ben
          </a>
          <button class="ghost-link" onclick="window.print()" style="padding-bottom: 4px;">Download Information Memorandum</button>
        </div>
      `;

      openModal(html);
    });
  });

  // "Discover My Approach" Trigger
  const approachBtn = document.getElementById('discoverApproachBtn');
  if (approachBtn) {
    approachBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const html = `
        <span class="royal-crest-badge" style="margin-bottom: 16px;">
          <span class="crest-diamond">◆</span>
          <span>THE SOVEREIGN ADVISORY MODEL</span>
          <span class="crest-diamond">◆</span>
        </span>
        <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 500; color: #121212; margin-bottom: 16px; line-height: 1.2;">The Sovereign Standard in Prime Real Estate</h2>
        
        <img src="ben-bandari.jpg" alt="Ben Bandari — Sovereign Real Estate Advisor" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border: 1px solid rgba(197, 160, 89, 0.35); margin-bottom: 24px; box-shadow: 0 16px 36px rgba(0,0,0,0.15);">

        <p style="font-size: 16px; line-height: 1.65; color: #424242; margin-bottom: 20px;">
          Ben Bandari founded his private practice on a fundamental premise: real estate at the highest echelon is neither a commodity market nor a high-volume transactional industry. It is a nuanced advisory discipline requiring architectural fluency, uncompromising integrity, and genuine discretion for global royal dynasties and family offices.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 28px 0;">
          <div style="border: 1px solid rgba(197, 160, 89, 0.3); padding: 22px; background: #F8F8F7;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 8px;">01. STRICT CLIENT CEILING</div>
            <h4 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1C1C1C;">Boutique by Design</h4>
            <p style="font-size: 13px; color: #555; line-height: 1.55;">Ben maintains a strict limit on active client mandates simultaneously. Every client receives direct, unmediated personal representation from Ben himself—not a junior associate.</p>
          </div>
          <div style="border: 1px solid rgba(197, 160, 89, 0.3); padding: 22px; background: #F8F8F7;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 8px;">02. ARCHITECTURAL DEDICATION</div>
            <h4 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1C1C1C;">Design As Value</h4>
            <p style="font-size: 13px; color: #555; line-height: 1.55;">Understanding materials, light, construction integrity, and architectural provenance enables Ben to articulate the true intrinsic value of a residence to global buyers.</p>
          </div>
          <div style="border: 1px solid rgba(197, 160, 89, 0.3); padding: 22px; background: #F8F8F7;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 8px;">03. DISCREET SYNDICATION</div>
            <h4 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1C1C1C;">Sovereign Ecosystem</h4>
            <p style="font-size: 13px; color: #555; line-height: 1.55;">A trusted international network of family offices, legal counsel, and private wealth managers ensures direct access to off-market opportunities.</p>
          </div>
          <div style="border: 1px solid rgba(197, 160, 89, 0.3); padding: 22px; background: #F8F8F7;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 8px;">04. UNCOMPROMISING DATA</div>
            <h4 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1C1C1C;">Strategic Realism</h4>
            <p style="font-size: 13px; color: #555; line-height: 1.55;">Transparent valuations grounded in verified transaction comps, construction replacement costs, and granular macroeconomic intelligence.</p>
          </div>
        </div>

        <div style="text-align: right; margin-top: 24px;">
          <a href="#contact" class="btn-royal-gold" onclick="document.getElementById('modalCloseBtn').click();">
            Initiate a Confidential Discussion
          </a>
        </div>
      `;
      openModal(html);
    });
  }

  // Editorial Triggers
  document.querySelectorAll('[data-editorial-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-editorial-key');
      const article = EDITORIAL_DATA[key];
      if (!article) return;

      const html = `
        <span class="eyebrow">${article.category} · ${article.readTime}</span>
        <h2 style="font-size: 28px; font-weight: 500; color: #1C1C1C; margin-bottom: 24px; line-height: 1.25;">${article.title}</h2>
        <div style="border-top: 1px solid #E8E8E8; padding-top: 24px; margin-bottom: 24px;">
          ${article.content}
        </div>
        <div style="padding-top: 20px; border-top: 1px solid #E8E8E8; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; color: #858585;">Published by Ben Bandari Advisory</span>
          <button class="ghost-link" onclick="document.getElementById('modalCloseBtn').click()">Back to Editorial</button>
        </div>
      `;
      openModal(html);
    });
  });
}

// Global helper to select inquiry interest
window.selectInterest = function(val) {
  const radio = document.querySelector(`input[name="interest"][value="${val}"]`);
  if (radio) radio.checked = true;
};

/* ==========================================================================
   Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const interest = form.querySelector('input[name="interest"]:checked')?.value || 'Buying';
    const message = form.querySelector('[name="message"]').value.trim();

    if (!fullName || !email || !message) {
      statusBox.className = 'form-status error';
      statusBox.textContent = 'Please fill out all required fields (Name, Email, and Message).';
      statusBox.style.display = 'block';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusBox.className = 'form-status error';
      statusBox.textContent = 'Please provide a valid email address.';
      statusBox.style.display = 'block';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          interest,
          message,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        statusBox.className = 'form-status success';
        statusBox.innerHTML = `
          <strong>Enquiry Submitted Successfully</strong><br>
          ${result.message}<br>
          <span style="font-size: 12px; color: #858585; margin-top: 6px; display: inline-block;">Reference: ${result.reference}</span>
        `;
        form.reset();
      } else {
        throw new Error(result.error || 'Unable to submit enquiry.');
      }
    } catch (err) {
      statusBox.className = 'form-status error';
      statusBox.textContent = 'There was a problem submitting your enquiry. Please reach out directly to contact@benbandari.com or call +61 (0) 400 123 456.';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ==========================================================================
   Smooth Scroll Animations & Image Reveal
   ========================================================================== */
function initScrollAnimations() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // Intersection Observer for graceful fade-up reveals
  const revealElements = document.querySelectorAll('.section-title, .royal-about-container, .showcase-flagship-card, .showcase-compact-card, .transaction-card, .service-card, .editorial-article-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-item');
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   Smooth Section-Wise Sliding Card Parallax Engine (Hardware-Accelerated)
   ========================================================================== */
function initParallaxEffects() {
  const heroImg = document.getElementById('heroParallaxImg');
  const heroContent = document.getElementById('heroContent');
  const heroSection = document.getElementById('hero');
  const cards = Array.from(document.querySelectorAll('.card-section'));
  const footer = document.querySelector('.site-footer');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // 1. Hero Parallax (smooth fade and gentle perspective push)
    if (heroSection && scrollY <= windowHeight * 1.25) {
      const progress = Math.min(1, Math.max(0, scrollY / windowHeight));

      if (heroImg) {
        const bgOffset = scrollY * 0.28;
        const scaleVal = 1.03 + progress * 0.05;
        heroImg.style.transform = `translate3d(0, ${bgOffset.toFixed(1)}px, 0) scale(${scaleVal.toFixed(3)})`;
      }

      if (heroContent) {
        const contentOffset = scrollY * -0.22;
        const opacityVal = Math.max(0, 1 - progress * 1.25);
        heroContent.style.transform = `translate3d(0, ${contentOffset.toFixed(1)}px, 0)`;
        heroContent.style.opacity = opacityVal.toFixed(3);
      }
    }

    // 2. Ben Bandari Sovereign Portrait Parallax
    const benImg = document.getElementById('benPortraitParallax');
    const royalStage = document.getElementById('royalStage');
    if (benImg && royalStage) {
      const stageRect = royalStage.getBoundingClientRect();
      if (stageRect.top < windowHeight && stageRect.bottom > 0) {
        const stageProgress = (windowHeight - stageRect.top) / (windowHeight + stageRect.height);
        const pClamped = Math.max(0, Math.min(1, stageProgress));
        // Optical vertical shift: glides smoothly through the gilded salon
        const yOffset = (pClamped - 0.5) * 80;
        const scale = 1.05 + Math.sin(pClamped * Math.PI) * 0.035;
        benImg.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation on load
  updateParallax();
}

/* ==========================================================================
   Smooth Section-Wise Pinned Stacking Deck with Dwell & Glide
   ========================================================================== */
function initDeckScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const container = document.getElementById('deckContainer');
  if (!container) return;

  const sectionIds = ['hero', 'about', 'properties', 'transactions', 'services', 'editorial', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length < 2) return;

  ScrollTrigger.matchMedia({
    // Desktop: Pinned vertical stacking cards with dwell duration
    "(min-width: 992px)": function() {
      // Set z-indexes and initial positions with silky fade-in readiness
      sections.forEach((sec, i) => {
        sec.style.zIndex = i + 1;
        if (i > 0) {
          gsap.set(sec, { yPercent: 100 });
          const content = sec.querySelector('.container');
          if (content) {
            gsap.set(content, { opacity: 0, y: 35 });
          }
        } else {
          gsap.set(sec, { yPercent: 0 });
        }
      });

      const totalTransitions = sections.length - 1;
      // Snappy and responsive scroll pacing (cuts scroll distance in half for faster transitions)
      const totalScrollDistance = window.innerHeight * totalTransitions * 0.75;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=" + totalScrollDistance,
          scrub: 0.3, // Snappy real-time tracking with minimal lag
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const step = p * totalTransitions;
            const activeIndex = Math.min(totalTransitions, Math.floor(step + 0.35));
            const activeId = sectionIds[activeIndex];

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
              if (link.getAttribute('href') === '#' + activeId) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });

            // Nav bar scrolled style
            const siteNav = document.getElementById('siteNav');
            if (siteNav) {
              if (activeIndex > 0 || p > 0.04) {
                siteNav.classList.add('scrolled');
              } else {
                siteNav.classList.remove('scrolled');
              }
            }
          }
        }
      });

      // Sequential stacking timeline with majestic upward glide and container fade-in:
      // Transition 1 (Hero -> About): Immediate, swift glide over Hero with zero pre-dwell
      const about = document.getElementById('about');
      tl.to(about, {
        yPercent: 0,
        ease: "power2.out",
        duration: 0.65
      });
      const aboutContent = about.querySelector('.container');
      if (aboutContent) {
        tl.to(aboutContent, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.5
        }, "<0.12");
      }

      // Subsequent transitions (About -> Properties, Properties -> Transactions, etc.):
      // 1. Dwell: crisp pause so section locks in and is immediately viewable
      // 2. Glide: swift, silky glide directly on top of previous section
      // 3. Fade-in: content smoothly fades in and rises into place as the section arrives
      for (let i = 2; i < sections.length; i++) {
        tl.to({}, { duration: 0.25 });
        const sec = sections[i];
        const content = sec.querySelector('.container');
        tl.to(sec, {
          yPercent: 0,
          ease: "power2.out",
          duration: 0.65
        });
        if (content) {
          tl.to(content, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.5
          }, "<0.12");
        }
      }

      // Smooth in-page anchor navigation: scroll to exact card time
      document.querySelectorAll('.nav-brand, .nav-link, .btn-royal-outline, .btn-royal-gold, .hero-actions a').forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            const id = href.substring(1);
            if (id === 'hero' || id === '' || link.classList.contains('nav-brand')) {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              return;
            }
            const index = sectionIds.indexOf(id);
            if (index !== -1 && tl.scrollTrigger) {
              e.preventDefault();
              const progress = index / totalTransitions;
              const target = tl.scrollTrigger.start + progress * (tl.scrollTrigger.end - tl.scrollTrigger.start);
              window.scrollTo({
                top: target,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    },

    // Mobile fallback: clear all transforms
    "(max-width: 991px)": function() {
      sections.forEach(sec => {
        gsap.set(sec, { clearProps: "all" });
        const content = sec.querySelector('.container');
        if (content) {
          gsap.set(content, { clearProps: "all" });
        }
      });
    }
  });
}

/* ==========================================================================
   Transactions Horizontal Carousel & Drag Navigation
   ========================================================================== */
function initTransactionsCarousel() {
  const track = document.getElementById('transactionsTrack');
  const prevBtn = document.getElementById('transPrevBtn');
  const nextBtn = document.getElementById('transNextBtn');

  if (!track) return;

  const cardWidth = 382; // 360px card + 22px gap

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // Smooth drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollLeft - walk;
  });

  // Horizontal scroll on mouse wheel when hovered over Track Record
  const transContainer = document.querySelector('.transactions-container') || track;
  transContainer.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!delta) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= maxScroll - 4;

    if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
      e.preventDefault();
      e.stopPropagation();
      track.scrollLeft += delta * 1.15;
    }
  }, { passive: false });
}

/* ==========================================================================
   Portfolio Horizontal Carousel & Drag Navigation
   ========================================================================== */
function initPortfolioCarousel() {
  const track = document.getElementById('portfolioTrack');
  const prevBtn = document.getElementById('propPrevBtn');
  const nextBtn = document.getElementById('propNextBtn');
  const progressFill = document.getElementById('portfolioProgressFill');
  const counterEl = document.getElementById('portfolioCounter');

  if (!track) return;

  function updateProgress() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    
    // Progress fill percentage (from min 25% to 100%)
    if (progressFill) {
      const fillPercent = 25 + progress * 75;
      progressFill.style.width = `${fillPercent}%`;
    }

    // Step index from 1 to 4
    if (counterEl) {
      const step = Math.min(4, Math.max(1, Math.round(progress * 3) + 1));
      counterEl.textContent = `0${step} / 04`;
    }
  }

  track.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const getScrollStep = () => {
    const firstCard = track.querySelector('.portfolio-card');
    return firstCard ? firstCard.offsetWidth + 20 : 330;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }

  // Smooth drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollLeft - walk;
  });

  // Horizontal scroll on mouse wheel when hovered over Portfolio
  const portContainer = document.querySelector('.royal-properties-container') || track;
  portContainer.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!delta) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= maxScroll - 4;

    if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
      e.preventDefault();
      e.stopPropagation();
      track.scrollLeft += delta * 1.15;
    }
  }, { passive: false });
}
