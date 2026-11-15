// All site content in one place. Text carried over from bdbc-v9 unless noted.

export const EVENT = {
  name: 'Belgrade Diplomacy & Business Conference',
  short: 'BDBC',
  edition: 'BDBC 2027',
  when: 'End of February 2027',
  where: 'Belgrade',
  email: 'bdbcofficial@gmail.com',
  instagram: 'https://instagram.com/bdbc_official',
  tiktok: 'https://tiktok.com/@bdbc_official',
  handle: '@bdbc_official',
  feeTransfer: 45,
  feeCash: 50,
}

// One set of numbers, used on every page.
export const FACTS = {
  editions: 3, // GPMUN 2025, BDBC 2026, BDBC 2027
  applicants: '220+',
  nationalities: '35+',
  committees: 5,
  foodKg: 300,
}

export const AWARDS = ['Best Delegate', 'Best Speaker', 'Honourable Mention']

export const COMMITTEES = [
  {
    id: 'security-crisis',
    name: 'Security Crisis Committee',
    placard: 'Security Crisis',
    formValue: 'Security Crisis Committee',
    kind: 'Crisis',
    about:
      'A high-intensity, fast-paced committee where delegates represent national leaders and security advisors responding to global crises. From geopolitical tensions to humanitarian emergencies, you’ll negotiate in real time, draft emergency directives, and shape outcomes that affect entire regions.',
    why: 'Perfect for those who enjoy strategic thinking under pressure. You’ll develop rapid decision-making skills, sharpen your negotiation tactics, and gain confidence in handling complex, high-stakes scenarios.',
    sample: ['Iran', 'Israel', 'United States', 'China', 'Ukraine'],
  },
  {
    id: 'business',
    name: 'Business Committee',
    placard: 'Business',
    formValue: 'Business Committee',
    kind: 'Business',
    about:
      'This committee simulates the inner workings of global business governance, where delegates act as corporate leaders, regulators, and investors negotiating on trade, investment, and corporate responsibility. Topics range from digital economy regulation to sustainable business practices.',
    why: 'Ideal for future entrepreneurs, economists, or anyone interested in the intersection of business and policy. You’ll learn how real-world economic decisions are made and build skills in persuasive argumentation and strategic compromise.',
    sample: ['Chief Executive', 'Regulator', 'Investor', 'Supplier', 'Union'],
  },
  {
    id: 'ecosoc',
    name: 'ECOSOC – Economic and Social Council',
    placard: 'ECOSOC',
    formValue: 'ECOSOC — Economic and Social Council',
    kind: 'UN',
    about:
      'ECOSOC is the UN’s main platform for discussing global economic and social challenges. Delegates represent member states debating issues like poverty reduction, education access, climate migration, and sustainable development.',
    why: 'A classic UN committee with real diplomatic weight. You’ll gain experience in multilateral negotiation, resolution writing, and policy formulation — skills that are directly transferable to academic, professional, and leadership roles.',
    sample: ['Japan', 'Brazil', 'Nigeria', 'Canada', 'India'],
  },
  {
    id: 'asean',
    name: 'ASEAN Economic Community Council',
    placard: 'ASEAN',
    formValue: 'ASEAN Economic Community Council',
    kind: 'Regional',
    about:
      'This regional committee focuses on economic cooperation within Southeast Asia. Delegates negotiate on trade agreements, investment policies, supply chain resilience, and sustainable development within the ASEAN framework.',
    why: 'A unique opportunity to explore regional economics and diplomacy in a focused, crisis-driven setting. You’ll develop expertise in regional policy, strategic compromise, and collaborative problem-solving.',
    sample: ['Vietnam', 'Singapore', 'Indonesia', 'Thailand', 'Malaysia'],
  },
  {
    id: 'european-council',
    name: 'Model European Council',
    placard: 'European Council',
    formValue: 'Model European Council',
    kind: 'Regional',
    about:
      'Delegates represent EU member states and institutions, negotiating on pressing European issues such as energy policy, migration, digital regulation, and economic integration. The committee mirrors the real decision-making processes of the European Council.',
    why: 'Ideal for those interested in European politics, law, or international relations. You’ll gain hands-on experience in EU-style diplomacy, learn how complex policy decisions are made, and build networking connections with peers passionate about Europe.',
    sample: ['France', 'Germany', 'Poland', 'Spain', 'Croatia'],
  },
]

export const FOUNDERS = [
  {
    name: 'Nina Vujović',
    photo: 'people/nina',
    quote:
      'After years in Model United Nations, I founded BDBC to redefine what youth conferences can achieve. By uniting diplomacy, business, and humanitarian values, BDBC equips the next generation not only to understand the world but to shape it together.',
  },
  {
    name: 'Mateja Stevčević',
    photo: 'people/mateja',
    quote:
      'Every great leader starts with a single opportunity. BDBC was created to be that opportunity for the next generation — a place where ambitious young people can challenge themselves, exchange ideas, and develop the confidence to make a meaningful impact.',
  },
  {
    name: 'Romaric Roland Janković',
    photo: 'people/romaric',
    quote:
      'What I value most about BDBC is watching delegates arrive as strangers and leave as a network of future leaders. We built this conference to open doors — the same doors it opened for us.',
  },
  {
    name: 'Andrej Arizanović',
    photo: 'people/andrej',
    quote:
      'From an early age I wanted to create and lead. BDBC was the start of a bright future for me — and for every delegate who shares the same dreams I do.',
  },
]

export const BOARD = [
  { name: 'Nina Vujović', role: 'Secretary-General', photo: 'people/nina' },
  { name: 'Nazar Lyakhovchenko', role: 'Deputy Secretary-General', photo: 'people/nazar' },
  { name: 'Mateja Stevčević', role: 'President', photo: 'people/mateja' },
  { name: 'Romaric Roland Janković', role: 'Co-President', photo: 'people/romaric' },
  { name: 'Andrej Arizanović', role: 'Project Manager', photo: 'people/andrej' },
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

export const MODULES = [
  {
    name: 'Model UN Simulation',
    skills: ['Critical thinking', 'Negotiating', 'Resolution drafting', 'Debate', 'Research skills'],
    text: 'MUN is an academic simulation in which students act as delegates representing various countries, working to address real-world issues through the lens of their assigned nation’s policies and perspectives. Participants engage in debates, negotiations, and drafting resolutions, mimicking the procedures of UN committees.',
  },
  {
    name: 'Business Simulation',
    skills: ['Marketing', 'Critical thinking', 'Leadership', 'Report writing', 'Entrepreneurship'],
    text: 'The Business Simulation at the BDBC is a hands-on, high-pressure corporate decision-making experience. Participants are placed into executive teams and tasked with managing a company through realistic global crises, market shifts, and internal challenges. Over the course of three days, each team must analyse situations, make strategic decisions, and present their outcomes to stakeholders.',
  },
]

export const AGENDA = [
  {
    day: 'Day 1',
    title: 'Registration and opening',
    items: [
      ['15:45', '16:00', 'Arrival and registration', 'logistics'],
      ['16:30', '17:15', 'Opening ceremony', 'ceremony'],
      ['17:15', '18:15', 'Committee in session', 'committee'],
      ['18:15', '18:30', 'Break', 'logistics'],
      ['18:30', '19:30', 'Committee in session', 'committee'],
    ],
  },
  {
    day: 'Day 2',
    title: 'Committee sessions',
    items: [
      ['10:00', '10:30', 'Arrival', 'logistics'],
      ['10:30', '11:45', 'Committee in session', 'committee'],
      ['11:45', '12:00', 'Break', 'logistics'],
      ['12:00', '13:15', 'Committee in session', 'committee'],
      ['13:15', '14:30', 'Lunch break', 'social'],
      ['14:30', '15:45', 'Committee in session', 'committee'],
      ['15:45', '16:00', 'Break', 'logistics'],
      ['16:00', '16:30', 'Committee in session', 'committee'],
    ],
  },
  {
    day: 'Day 3',
    title: 'Final sessions and closing',
    items: [
      ['10:00', '10:30', 'Arrival', 'logistics'],
      ['10:30', '11:45', 'Committee in session', 'committee'],
      ['11:45', '12:00', 'Break', 'logistics'],
      ['12:00', '13:15', 'Committee in session', 'committee'],
      ['13:15', '14:30', 'Lunch break', 'social'],
      ['14:30', '15:45', 'Committee in session', 'committee'],
      ['Afternoon', '', 'Closing ceremony and awards', 'ceremony', 'Best Delegate, Best Speaker and Honourable Mention awards, certificates, and closing speeches.'],
    ],
  },
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
  payment: [
    { value: 'Bank transfer (€45)', label: 'Bank transfer, €45', note: 'Instructions arrive by email after you apply. Your seat is confirmed when the transfer arrives.' },
    { value: 'Cash at the conference (€50)', label: 'Cash on the first day, €50', note: 'Your seat is not guaranteed until you pay.' },
  ],
}
