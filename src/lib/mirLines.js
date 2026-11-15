// Everything Mir says. Edit freely: lines are picked at random from each list.
//
// Who Mir is: the official dove of BDBC and, in his own words, Secretary-General
// of the sky. Dramatic, a little vain, deeply offended at being called a pigeon,
// fluent in Model UN procedure, motivated mostly by breadcrumbs. Never mean to
// anyone but himself.

// When you arrive on a page
export const ARRIVE = {
  '/': [
    'Hi, I’m Mir. Official dove of BDBC. Unofficial Secretary-General of the sky.',
    'Welcome! I’m Mir. Dove, diplomat, professional hoverer.',
    'Oh, a delegate! Quick, look important. I’m Mir.',
  ],
  '/about': ['Ah, the About page. Where they talk about everyone except me.', 'Two modules, one vision, one dove. You’re welcome.'],
  '/program': ['Lunch break is at 13:15. I’ll be outside. Drop crumbs.', 'Three days of debate. I’ve read the agenda. Mostly the lunch parts.'],
  '/committees': ['Five committees, five rooms. Pick one and I’ll save you a seat.', 'Choose wisely. I can only cheer for one room at a time.'],
  '/impact': ['100% of the proceeds go to children. I asked for 1% in breadcrumbs. Denied.', 'This is the page that makes me emotional. Doves cry too.'],
  '/recognition': ['Embassies noticed us. I like to think they noticed me first.', 'An ambassador came to BDBC. I wore my best feathers.'],
  '/why-bdbc': ['Why BDBC? Honestly, the dove alone is worth it.', 'First conference? I was nervous too. Then I learned to fly.'],
  '/gallery': ['Two editions of photos. Zero doves. I’ve filed a complaint.', 'Spot the dove: 0 found. Next year I’m in the front row.'],
  '/contact': ['Write to them. Don’t send a carrier pigeon. Pigeons are unreliable.', 'They reply faster than I fly. Usually.'],
  '/apply': ['Point of order: you’re about to make a great decision.', 'Let’s do this. I’ll cheer you on, very loudly, in bird.'],
  '/privacy': ['Privacy policy. I read it. I’m the only one. Hi.'],
  '/terms': ['Terms of participation. Rule zero: be nice to the dove.'],
}

// Late at night, instead of the home greeting
export const NIGHT = ['It’s late. Real diplomats sleep. Apply first, though.', 'Night shift. Just me, you, and the Danube.']

// When you click him; after many clicks he escalates
export const CLICK = [
  'Coo.',
  'I’m a dove. Not a pigeon. Write that down.',
  'Motion to stop poking me? Seconded.',
  'Point of personal privilege: my feathers.',
  'Rate my loop. Honestly. Out of ten.',
  'Mir means peace. Poking is not peaceful.',
  'Careful, I bruise like a peach.',
  'I’ve been trained by the finest chairs in Belgrade.',
]
export const CLICK_ANNOYED = ['Okay, that’s it. I’m calling the chairs.', 'Honourable delegate, you are out of order.', 'This is a peaceful protest. Against you.']
export const CLICK_GIVEUP = ['Fine. You win. Here’s my best loop.', 'You have outlasted a dove. Put that on your CV.']

// When you have been still for a while
export const IDLE = {
  default: [
    'Still here? I’m good at hovering. I can wait.',
    '*hovers professionally*',
    'If you need me, I’ll be right here. Flapping.',
    'My wings are getting tired. Kidding. They’re majestic.',
  ],
  '/apply': ['Take your time. I’ve rehearsed my celebration dance.', 'No pressure. But I already bought confetti.'],
  '/committees': ['Can’t decide? Pick the one with the best snacks.'],
  '/gallery': ['Still looking for me in the photos? Me too.'],
}

// Scrolling very fast
export const FAST_SCROLL = ['Whoa, slow down! I’m flying here.', 'Speed-reading? Very efficient. Very rude.', 'You scroll like a Security Crisis chair.']

// Coming back to the tab
export const WELCOME_BACK = ['Oh, you’re back! I didn’t move. Literally.', 'Missed me? I missed me too.']

// Pointing at an Apply button
export const APPLY_HOVER = ['Go on, claim your seat!', 'That button. Yes, that one. Press it.', 'I believe in you. Statistically.']

// Sections. Pages mark sections with data-dove-say="key"; he speaks once when it scrolls into view.
export const SECTIONS = {
  'home-archive': 'All these photos and not one dove. Suspicious.',
  'home-stats': '220+ applicants. I counted them myself. Twice.',
  'home-rooms': 'Five rooms. I’ve been politely removed from three.',
  'home-impact': '300 kg of food donated. I didn’t eat any. Mostly.',
  'home-awards': 'The trophy is in the fog. I know where it is. I’m not telling.',
  'home-first': 'No experience required. I had none and now I’m a mascot.',
  'home-seat': 'That badge could have your name on it. Mine says “Dove”. Just “Dove”.',
  'about-founders': 'The founders. Legends. Still haven’t made me a board member.',
  'about-board': 'Five board members, zero doves. Diversity of species: lacking.',
  'about-values': 'Mission and values. Mine is breadcrumbs. Yours can be bigger.',
  'about-guests': 'An actual ambassador. I behaved. Mostly.',
  'security-crisis': 'Security Crisis: where “let’s all calm down” goes to die.',
  business: 'Business Committee. I pitched bread futures here. Rejected.',
  ecosoc: 'ECOSOC: the economic and social council. I’m mostly social.',
  asean: 'ASEAN delegates, I hear the rice is excellent. Asking for a friend.',
  'european-council': 'European Council: 27 countries, one dove keeping the peace.',
  'program-day3': 'Closing ceremony: awards, speeches, and me crying in the corner.',
  'impact-food': '300 kilograms. Do you know how many breadcrumbs that is? I do.',
  'why-compare': 'BDBC vs a typical MUN. Typical MUNs don’t have me. Case closed.',
  'recognition-partners': 'Our sponsors. I’d sponsor too, but I’m paid in crumbs.',
}

// Application form: once per field when you click into it
export const FIELD = {
  dateOfBirth: 'I won’t tell anyone your age. Doves keep secrets.',
  fullName: 'Full legal name. Not your gamer tag.',
  email: 'Personal email please. School servers eat our messages. Not in a cute way.',
  phone: 'Phone number. I’d call, but, you know. Wings.',
  socialMedia: 'Drop your handle. I’d follow you, but no thumbs.',
  institution: 'Where do you study? I studied at the School of Hard Pecks.',
  experience: 'No experience? Perfect. Write “None”. I did.',
  countries1: 'Five countries. Dream big. Ask for the one with the best flag.',
  motivation: 'Be honest. “A dove told me to” is a valid answer.',
}
// Choosing a committee on the form
export const COMMITTEE_PICK = {
  'Security Crisis Committee': 'Security Crisis! Bring snacks, it gets intense.',
  'Business Committee': 'Business Committee! Buy low, coo high.',
  'ECOSOC — Economic and Social Council': 'ECOSOC! Very sensible. Your parents will be proud.',
  'ASEAN Economic Community Council': 'ASEAN! Excellent taste. In rice and in committees.',
  'Model European Council': 'European Council! May your consensus be unanimous.',
}
export const DIETARY = {
  None: 'No restrictions. A delegate after my own heart.',
  Vegetarian: 'Vegetarian! Seeds are underrated.',
  Vegan: 'Vegan! Respect. I’m technically gluten-tolerant.',
  'Gluten-free': 'Gluten-free? Then I’ll eat your bread. Deal?',
  Other: 'Noted. The caterers will be thrilled.',
}
export const PAYMENT = {
  bank: 'Bank transfer. Smart, you save €5. That’s a lot of bread.',
  cash: 'Cash on the day. Bring coins, I like shiny things.',
}
export const PROGRESS = { 1: 'Great start!', 5: 'Keep going! You’re doing great.', 9: 'Look at you, filling in forms like a diplomat.', 12: 'Almost there!' }
export const SUBMITTED = 'You’re in! I’m not crying, you’re crying.'

export const pick = (list) => list[Math.floor(Math.random() * list.length)]
