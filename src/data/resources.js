// Resource data for anti-trafficking information

export const hotlines = [
  {
    id: 'trafficking_hotline',
    name: 'Ghana Human Trafficking Secretariat',
    number: '0800-100-100',
    description: 'Free 24/7 hotline for trafficking reports and support',
    type: 'emergency'
  },
  {
    id: 'police',
    name: 'Ghana Police Emergency',
    number: '191',
    description: 'Emergency police assistance',
    type: 'emergency'
  },
  {
    id: 'hope_project',
    name: 'Hope Education Project',
    number: '+233-XX-XXX-XXXX', // Replace with actual number
    description: 'Support for trafficking survivors and education',
    type: 'support'
  },
  {
    id: 'dovvsu',
    name: 'DOVVSU (Domestic Violence & Victim Support Unit)',
    number: '0302-773-906',
    description: 'Support for victims of violence and exploitation',
    type: 'support'
  }
];

export const warningSigns = [
  {
    category: 'Job Offer Red Flags',
    signs: [
      'Asking for upfront payment (visa fees, processing fees, document fees)',
      'Salary that seems too good to be true (>$3,000/month for basic work)',
      'No company address or verifiable registration',
      'Recruiter not on Ghana Immigration Service approved list',
      'Using personal WhatsApp/phone instead of official company email',
      'Pressure to decide immediately or miss the "opportunity"',
      'Vague job description with no clear duties'
    ]
  },
  {
    category: 'Trafficking Tactics',
    signs: [
      'Taking your passport or ID card "for processing"',
      'Demanding secrecy - "don\'t tell your family"',
      'Offering foreign jobs with no interview or credential checks',
      'Debt bondage - paying for your travel but you owe them',
      'Isolation - taking you away from support networks',
      'Threats or intimidation if you ask questions'
    ]
  },
  {
    category: 'Protect Yourself',
    signs: [
      'NEVER pay money to job recruiters upfront',
      'ALWAYS verify recruiters with Ghana Immigration Service',
      'NEVER give your passport or ID to recruiters',
      'ALWAYS tell family and friends about job opportunities',
      'ALWAYS get written contracts before accepting jobs',
      'ALWAYS research the company online independently'
    ]
  }
];

export const verifiedAgencies = {
  title: 'Ghana Immigration Service Verified Recruitment Agencies',
  description: 'Only work with agencies on this official government list',
  url: 'https://immigration.gov.gh/licensed-recruitment-agencies/',
  note: 'If a recruiter is NOT on this list, report them to authorities'
};

export const educationalTips = [
  {
    title: 'Know Your Rights',
    content: 'In Ghana, it is ILLEGAL for recruiters to charge you fees for finding you a job. Real employers pay recruitment costs, not workers.'
  },
  {
    title: 'The Ghana Labor Act',
    content: 'The Labor Act (Act 651) prohibits forced labor and trafficking. If you are threatened, held against your will, or forced to work, this is a crime.'
  },
  {
    title: 'Safe Migration',
    content: 'If you want to work abroad legally: (1) Check embassy websites for work visa requirements, (2) Use only licensed recruitment agencies, (3) Get proper work permits BEFORE traveling, (4) Keep your travel documents with you always.'
  },
  {
    title: 'Kayaye Worker Rights',
    content: 'Kayaye workers are legitimate workers with rights. You deserve safe working conditions, fair pay, and protection from exploitation. Organizations like Hope Education Project offer support and alternative opportunities.'
  },
  {
    title: 'What If You\'re Already Trapped?',
    content: 'If you or someone you know is in a trafficking situation: (1) Call 0800-100-100 hotline, (2) Contact the nearest Ghana embassy if abroad, (3) Tell someone you trust, (4) You are a victim, not a criminal - seek help.'
  }
];

export const statistics = {
  title: 'Human Trafficking in Ghana',
  facts: [
    'Ghana is a source, transit, and destination country for trafficking',
    'Most victims are women and children trafficked for forced labor or sexual exploitation',
    'Common destinations for Ghanaian victims: Libya, Lebanon, Kuwait, Saudi Arabia, Europe',
    'Internal trafficking is common - rural areas to cities for forced labor',
    'The average age of trafficking victims from Northern Ghana is 18-25 years'
  ],
  source: 'US State Department Trafficking in Persons Report 2023'
};
