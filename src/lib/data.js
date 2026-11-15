// All site copy. Carried over word for word from bdbconference.com (v9).

export const EVENT = {
  email: 'bdbcofficial@gmail.com',
  instagram: 'https://instagram.com/bdbc_official',
  tiktok: 'https://tiktok.com/@bdbc_official',
  handle: '@bdbc_official',
}

// [path, label, photo, background, text colour]
export const PAGES = [
  ['/', 'Home', 'gallery/2026/committee-vote', '#07152b', '#ffffff'],
  ['/about', 'About', 'gallery/2026/audience', '#152a7c', '#ffffff'],
  ['/program', 'Agenda', 'gallery/2026/committee-session', '#1d5687', '#ffffff'],
  ['/committees', 'Committees', 'gallery/2025/crisis-simulation', '#8f1a22', '#ffffff'],
  ['/impact', 'Impact', 'impact/donation-sorting', '#0b4c3a', '#ffffff'],
  ['/recognition', 'Recognition', 'gallery/2026/guest-visit', '#c08f1c', '#07152b'],
  ['/why-bdbc', 'Why BDBC', 'gallery/2026/delegate-speaking', '#152a7c', '#ffffff'],
  ['/gallery', 'Gallery', 'gallery/2025/flag-tradition', '#8f1a22', '#ffffff'],
  ['/contact', 'Contact', 'gallery/2026/networking', '#0b4c3a', '#ffffff'],
]
export const pageColour = (path) => {
  const p = PAGES.find((x) => x[0] === path)
  return p ? { bg: p[3], fg: p[4] } : { bg: '#07152b', fg: '#ffffff' }
}

export const STATS = [
  { n: 3, suffix: '', label: 'Editions', sub: '2025 · 2026 · 2027' },
  { n: 220, suffix: '+', label: 'Applicants', sub: 'and growing' },
  { n: 35, suffix: '+', label: 'Nationalities', sub: 'among delegates' },
  { n: 5, suffix: '', label: 'Committees', sub: 'per year' },
]

export const DISCOVER = [
  { to: '/program', title: 'Conference Agenda', text: 'A full agenda of debates, workshops, business sessions, and a closing gala ceremony.', img: 'gallery/2026/committee-session' },
  { to: '/impact', title: 'Humanitarian Impact', text: 'From food donations to scholarship partnerships — BDBC gives back to the community.', img: 'impact/donation-sorting' },
  { to: '/why-bdbc', title: 'Why Choose BDBC', text: 'Skills, networks, certificates, and real-world exposure across two powerful modules.', img: 'gallery/2026/delegate-speaking' },
]

export const AWARDS = ['Best Delegate', 'Best Speaker', 'Honourable Mention']

export const COMMITTEES = [
  {
    id: 'security-crisis',
    bg: '#8f1a22',
    fg: '#ffffff',
    no: '01',
    name: 'Security Crisis Committee',
    short: 'Security Crisis',
    formValue: 'Security Crisis Committee',
    img: 'gallery/2025/crisis-simulation',
    about:
      'A high-intensity, fast-paced committee where delegates represent national leaders and security advisors responding to global crises. From geopolitical tensions to humanitarian emergencies, you’ll negotiate in real time, draft emergency directives, and shape outcomes that affect entire regions.',
    why: 'Perfect for those who enjoy strategic thinking under pressure. You’ll develop rapid decision-making skills, sharpen your negotiation tactics, and gain confidence in handling complex, high-stakes scenarios.',
  },
  {
    id: 'business',
    bg: '#0b4c3a',
    fg: '#ffffff',
    no: '02',
    name: 'Business Committee',
    short: 'Business',
    formValue: 'Business Committee',
    img: 'gallery/2026/business-track',
    about:
      'This committee simulates the inner workings of global business governance, where delegates act as corporate leaders, regulators, and investors negotiating on trade, investment, and corporate responsibility. Topics range from digital economy regulation to sustainable business practices.',
    why: 'Ideal for future entrepreneurs, economists, or anyone interested in the intersection of business and policy. You’ll learn how real-world economic decisions are made and build skills in persuasive argumentation and strategic compromise.',
  },
  {
    id: 'ecosoc',
    bg: '#1d5687',
    fg: '#ffffff',
    no: '03',
    name: 'ECOSOC – Economic and Social Council',
    short: 'ECOSOC',
    formValue: 'ECOSOC — Economic and Social Council',
    img: 'gallery/2026/committee-vote',
    about:
      'ECOSOC is the UN’s main platform for discussing global economic and social challenges. Delegates represent member states debating issues like poverty reduction, education access, climate migration, and sustainable development.',
    why: 'A classic UN committee with real diplomatic weight. You’ll gain experience in multilateral negotiation, resolution writing, and policy formulation — skills that are directly transferable to academic, professional, and leadership roles.',
  },
  {
    id: 'asean',
    bg: '#c08f1c',
    fg: '#07152b',
    no: '04',
    name: 'ASEAN Economic Community Council',
    short: 'ASEAN',
    formValue: 'ASEAN Economic Community Council',
    img: 'gallery/2026/committee-session',
    about:
      'This regional committee focuses on economic cooperation within Southeast Asia. Delegates negotiate on trade agreements, investment policies, supply chain resilience, and sustainable development within the ASEAN framework.',
    why: 'A unique opportunity to explore regional economics and diplomacy in a focused, crisis-driven setting. You’ll develop expertise in regional policy, strategic compromise, and collaborative problem-solving.',
  },
  {
    id: 'european-council',
    bg: '#152a7c',
    fg: '#ffffff',
    no: '05',
    name: 'Model European Council',
    short: 'European Council',
    formValue: 'Model European Council',
    img: 'gallery/2026/delegate-speaking',
    about:
      'Delegates represent EU member states and institutions, negotiating on pressing European issues such as energy policy, migration, digital regulation, and economic integration. The committee mirrors the real decision-making processes of the European Council.',
    why: 'Ideal for those interested in European politics, law, or international relations. You’ll gain hands-on experience in EU-style diplomacy, learn how complex policy decisions are made, and build networking connections with peers passionate about Europe.',
  },
]

export const WHAT_WE_ARE = [
  'MUN is an academic simulation in which students act as delegates representing various countries, working to address real-world issues through the lens of their assigned nation’s policies and perspectives. Participants engage in debates, negotiations, and drafting resolutions, mimicking the procedures of UN committees.',
  'The Business Simulation at the BDBC is a hands-on, high-pressure corporate decision-making experience. Participants are placed into executive teams and tasked with managing a company through realistic global crises, market shifts, and internal challenges. Over the course of three days, each team must analyse situations, make strategic decisions, and present their outcomes to stakeholders.',
  'Together, these two modules create something the region has never had before: a space where the next generation of diplomats, entrepreneurs, and changemakers learn side by side.',
]

export const MODULES = [
  { label: 'Module 1', name: 'Model UN Simulation', skills: ['Critical thinking', 'Negotiating', 'Resolution drafting', 'Debate', 'Research skills'] },
  { label: 'Module 2', name: 'Business Simulation', skills: ['Marketing', 'Critical thinking', 'Leadership', 'Report writing', 'Entrepreneurship'] },
]

export const FOUNDERS = [
  { name: 'Nina Vujović', photo: 'people/nina', quote: 'After years in Model United Nations, I founded BDBC to redefine what youth conferences can achieve. By uniting diplomacy, business, and humanitarian values, BDBC equips the next generation not only to understand the world but to shape it together.' },
  { name: 'Mateja Stevčević', photo: 'people/mateja', quote: 'Every great leader starts with a single opportunity. BDBC was created to be that opportunity for the next generation — a place where ambitious young people can challenge themselves, exchange ideas, and develop the confidence to make a meaningful impact.' },
  { name: 'Romaric Roland Janković', photo: 'people/romaric', quote: 'What I value most about BDBC is watching delegates arrive as strangers and leave as a network of future leaders. We built this conference to open doors — the same doors it opened for us.' },
  { name: 'Andrej Arizanović', photo: 'people/andrej', quote: 'From an early age I wanted to create and lead. BDBC was the start of a bright future for me — and for every delegate who shares the same dreams I do.' },
]

export const BOARD = [
  { name: 'Nina Vujović', role: 'Secretary-General', photo: 'people/nina' },
  { name: 'Nazar Lyakhovchenko', role: 'Deputy Secretary-General', photo: 'people/nazar' },
  { name: 'Mateja Stevčević', role: 'President', photo: 'people/mateja' },
  { name: 'Romaric Roland Janković', role: 'Co-President', photo: 'people/romaric' },
  { name: 'Andrej Arizanović', role: 'Project Manager', photo: 'people/andrej' },
]

export const VALUES = [
  ['Diplomatic Education', 'We believe every young person deserves access to the negotiation and critical-thinking skills that shape global policy.'],
  ['Entrepreneurial Spirit', 'Business is not separate from diplomacy — it is diplomacy. We train the next generation to think across both worlds.'],
  ['Real Humanitarian Action', 'Learning without impact is incomplete. BDBC channels proceeds directly into communities that need support most.'],
  ['Eastern European Voice', 'We are proud to give the region a stage — showing the world that world-class conferences originate here too.'],
]

export const GUESTS = [
  { name: 'H.E. Florence Ferrari', role: 'Ambassador of France to Serbia', photo: 'people/florence' },
  { name: 'Jana Djudjić', role: 'European Young Ambassador', photo: 'people/jana' },
  { name: 'Aleksandar Mitić', role: 'Political Scientist, PhD', photo: 'people/mitic' },
]

export const PARTNERS = [
  { name: 'Faculty of Media & Communications', role: 'Academic Partner', logo: 'partners/fmk' },
  { name: 'Bambi', role: 'Sponsor', logo: 'partners/bambi' },
  { name: 'Lux Waterfront', role: 'Sponsor', logo: 'partners/lux_waterfront' },
  { name: 'Vulkan knjižare', role: 'Partner', logo: 'partners/vulkan' },
  { name: 'Chinatown Belgrade', role: 'Partner', logo: 'partners/chinatown' },
  { name: 'Vizartis Print', role: 'Print Partner', logo: 'partners/vizartis' },
  { name: 'BurgerHub', role: 'Catering Partner', logo: 'partners/burger_hub' },
  { name: 'NextFrame Social', role: 'Media Partner', logo: 'partners/nextframe' },
  { name: 'Ana i Vlade Divac Foundation', role: 'Humanitarian Partner', logo: 'partners/foundation_ana_i_vlade_' },
  { name: 'Zvečanska Centre', role: 'Humanitarian Partner', logo: 'partners/zvecanska' },
]

export const AGENDA = [
  {
    tag: 'Arrival Day',
    title: 'Day 1: Registration & Opening',
    items: [
      ['15:45 – 16:00', 'Arrival & Registration', 'Logistics'],
      ['16:30 – 17:15', 'Opening Ceremony', 'Ceremony'],
      ['17:15 – 18:15', 'Committee in Session', 'Committee'],
      ['18:15 – 18:30', 'Break', 'Logistics'],
      ['18:30 – 19:30', 'Committee in Session', 'Committee'],
    ],
  },
  {
    tag: 'Full Conference Day',
    title: 'Day 2: Committee Sessions',
    items: [
      ['10:00 – 10:30', 'Arrival', 'Logistics'],
      ['10:30 – 11:45', 'Committee in Session', 'Committee'],
      ['11:45 – 12:00', 'Break', 'Logistics'],
      ['12:00 – 13:15', 'Committee in Session', 'Committee'],
      ['13:15 – 14:30', 'Lunch Break', 'Break / Social'],
      ['14:30 – 15:45', 'Committee in Session', 'Committee'],
      ['15:45 – 16:00', 'Break', 'Logistics'],
      ['16:00 – 16:30', 'Committee in Session', 'Committee'],
    ],
  },
  {
    tag: 'Closing Day',
    title: 'Day 3: Final Sessions & Closing',
    items: [
      ['10:00 – 10:30', 'Arrival', 'Logistics'],
      ['10:30 – 11:45', 'Committee in Session', 'Committee'],
      ['11:45 – 12:00', 'Break', 'Logistics'],
      ['12:00 – 13:15', 'Committee in Session', 'Committee'],
      ['13:15 – 14:30', 'Lunch Break', 'Break / Social'],
      ['14:30 – 15:45', 'Committee in Session', 'Committee'],
      ['Afternoon', 'Closing Ceremony & Awards', 'Ceremony', 'Best delegate awards, certificates, and closing speeches.'],
    ],
  },
]

export const REASONS = [
  ['Real-World Skills', 'Develop negotiation, public speaking, critical thinking, and business strategy through hands-on experience — not just lectures.', '5 committees, two modules, one conference'],
  ['International Network', 'Debate alongside delegates of more than 35 different nationalities — and meet the guest diplomats, entrepreneurs, and future leaders who share your ambition.', '35+ nationalities among delegates'],
  ['Business Exposure', 'Pitch startup ideas, learn from founders, and understand markets — while still in school or university.', 'First MUN + business modules in Eastern Europe'],
  ['Diplomatic Experience', 'Simulate real UN committees, debate genuine global resolutions, and understand how international policy is actually made.', 'Authentic UN committee format'],
  ['Certificates & Recognition', 'Leave with certificates of participation, best-delegate awards, and credentials that stand out on university and job applications.', 'Embassy-recognized conference'],
  ['Social Impact', 'Your attendance directly funds humanitarian work — food donations and scholarship partnerships. You contribute just by being there.', '300+ kg donated; scholarships funded'],
]

export const COMPARE = [
  ['Authentic MUN Format', '✓', '✓'],
  ['Business Committee', '✓', '✕'],
  ['Embassy-Endorsed', '✓', 'Rare'],
  ['International Delegates', '✓', '✓'],
  ['Certificate of Participation', '✓', '✓'],
  ['Social Impact', '✓', 'Rare'],
  ['Diplomacy Meets Business', '✓', '✕'],
  ['Expert Guest Speakers', '✓', 'Rare'],
  ['Career Development', '✓', 'Limited'],
]

export const FIRST = [
  ['Universities read it', 'Admissions officers skim thousands of near-identical applications. “Represented Japan at an international conference in Belgrade” stands out, and you can talk about it in an interview for ten minutes without running out of material.'],
  ['Skills school never grades', 'Public speaking in English. Negotiating with someone who wants the opposite of what you want. Holding a room’s attention. A committee demands all three in one weekend.'],
  ['A network across borders', 'Delegates come from 35+ nationalities. The person seated next to you might study law in Vienna or run a student business in Skopje. People stay in touch long after the closing ceremony.'],
  ['Proof you can show', 'Every delegate receives a participation certificate. Chairs award Best Delegate, Best Speaker and Honourable Mention in each committee. All of it goes straight onto a CV or a university application.'],
]

export const GALLERY = [
  ['2026', 'gallery/2026/awards-ceremony', 'Certificates and awards at FMK'],
  ['2026', 'gallery/2026/german-delegation', 'Welcoming the Gymnasium Am Löhrtor delegation'],
  ['2026', 'gallery/2026/committee-vote', 'A motion put to the vote'],
  ['2026', 'gallery/2026/delegate-speaking', 'Taking the floor'],
  ['2026', 'gallery/2026/committee-session', 'Committee in session'],
  ['2026', 'gallery/2026/business-track', 'Business track in a working session'],
  ['2026', 'gallery/2026/audience', 'Opening ceremony audience'],
  ['2026', 'gallery/2026/networking', 'Networking between sessions'],
  ['2026', 'gallery/2026/celebration', 'Celebrating a moment together'],
  ['2026', 'gallery/2026/guest-visit', 'With H.E. Florence Ferrari, Ambassador of France to Serbia'],
  ['2025', 'gallery/2025/gpmun-sign', 'GPMUN, the edition that became BDBC'],
  ['2025', 'gallery/2025/venue-hall', 'Committee session at the historic venue'],
  ['2025', 'gallery/2025/committee-room', 'Delegates preparing between sessions'],
  ['2025', 'gallery/2025/crisis-simulation', 'Crisis committee in full swing'],
  ['2025', 'gallery/2025/flag-tradition', 'The signed-flag closing tradition'],
  ['2025', 'gallery/2025/opening-audience', 'Delegates at the opening session'],
  ['2025', 'gallery/2025/security-council-group', 'Security Council delegates with their placards'],
  ['2025', 'gallery/2025/serbian-flag-group', 'Delegates gathered around the Serbian flag'],
  ['2025', 'gallery/2025/delegates-listening', 'Following the debate'],
  ['2025', 'gallery/2025/delegates-row', 'Front row between sessions'],
  ['2025', 'gallery/2025/between-sessions', 'A light moment between sessions'],
].map(([year, src, caption]) => ({ year, src, caption }))

export const FORM_OPTIONS = {
  education: ['Elementary School', 'High School', 'University', 'Employed', 'Other'],
  dietary: ['None', 'Vegetarian', 'Vegan', 'Kosher', 'Halal', 'Gluten-free', 'Other'],
}
