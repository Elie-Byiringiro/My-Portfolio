export const fallbackProfile = {
  id: 1,
  name: 'Byiringiro Elie',
  alias: 'M4STER',
  status: 'Available for new opportunities',
  roles: ['Full-Stack Developer', 'Cybersecurity Analyst', 'API Architect'],
  location: 'Kigali, Rwanda',
  started_coding: '2022 — and leveling up daily',
  focus: 'React + Node.js',
  email: 'byiringiroelie468@gmail.com',
  whatsapp: '0783547443',
  instagram: 'elie__001',
  github: 'elie',
  portfolio: 'elie.dev',
}

export const fallbackStats = [
  { id: 1, label: 'Years Experience', value: 3, suffix: '+', color: 'green' },
  { id: 2, label: 'Projects Built', value: 6, suffix: '+', color: 'blue' },
  { id: 3, label: 'PageSpeed Score', value: 95, suffix: '+', color: 'cyan' },
]

export const fallbackExperienceStats = [
  { id: 'total', label: 'Years Total', value: 3, suffix: '+' },
  { id: 'security', label: 'Yrs Security', value: 2, suffix: '' },
  { id: 'dev', label: 'Yr Dev', value: 1, suffix: '+' },
]

export const fallbackTestimonials = [
  {
    id: 1,
    quote:
      'The e-commerce platform transformed our checkout flow. Authentication, cart and payments all run reliably under real traffic. The work is solid and dependable.',
    name: 'Ntirenganya Janvier',
    role: 'Head of Product, TechSphere',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The store design and checkout flow brought our brand to life. The attention to detail is unmatched.',
    name: 'Uwimana Yassin',
    role: 'Lead Designer, CreativeFlow',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Working together was an absolute pleasure. The ability to translate complex ideas into clean, performant solutions is world-class.',
    name: 'Elissa Ntihinduka',
    role: 'Full Stack Developer, TechSolutions',
    rating: 5,
  },
]

export const fallbackFocus = [
  { id: 1, title: 'Production-ready systems' },
  { id: 2, title: 'Secure API development' },
  { id: 3, title: 'Database architecture' },
  { id: 4, title: 'Penetration testing' },
  { id: 5, title: 'Real-time applications' },
  { id: 6, title: 'CI/CD pipelines' },
]

export const fallbackExperience = [
  {
    id: 1,
    period: '2024 – Present',
    type: 'Full-time',
    role: 'Frontend Developer',
    place: 'Freelance & product work · Kigali, Rwanda',
    text: 'Building responsive web apps with HTML, CSS, JavaScript, and React. Focused on performance, accessibility, and modern UX patterns.',
    tags: ['React', 'Node.js', 'CSS', 'JavaScript'],
  },
  {
    id: 2,
    period: '2022 – 2024',
    type: 'Full-time',
    role: 'Cybersecurity Analyst',
    place: 'Security operations · Kigali, Rwanda',
    text: 'Securing web applications and APIs, performing penetration testing, vulnerability assessments, and implementing security best practices.',
    tags: ['Pen Testing', 'API Security', 'Linux', 'Networking'],
  },
]

export const fallbackSkills = [
  { id: 1, category: 'Languages', skill: 'JavaScript', level: 'advanced', percent: 92 },
  { id: 2, category: 'Languages', skill: 'TypeScript', level: 'intermediate', percent: 74 },
  { id: 3, category: 'Languages', skill: 'HTML5', level: 'advanced', percent: 90 },
  { id: 4, category: 'Languages', skill: 'CSS3', level: 'advanced', percent: 88 },
  { id: 5, category: 'Frontend', skill: 'React', level: 'advanced', percent: 90 },
  { id: 6, category: 'Frontend', skill: 'Vite', level: 'intermediate', percent: 76 },
  { id: 7, category: 'Frontend', skill: 'Tailwind CSS', level: 'intermediate', percent: 72 },
  { id: 8, category: 'Frontend', skill: 'Responsive Design', level: 'advanced', percent: 85 },
  { id: 9, category: 'Backend & Tools', skill: 'Node.js', level: 'intermediate', percent: 74 },
  { id: 10, category: 'Backend & Tools', skill: 'Express', level: 'intermediate', percent: 70 },
  { id: 11, category: 'Backend & Tools', skill: 'Git / GitHub', level: 'advanced', percent: 80 },
  { id: 12, category: 'Backend & Tools', skill: 'REST APIs', level: 'intermediate', percent: 78 },
]

export const fallbackProjects = [
  {
    id: 1,
    name: 'E-commerce',
    description: 'Authentication, product management, cart & secure payments.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
]

export const fallbackPosts = [
  {
    id: 1,
    slug: 'structuring-a-react-node-full-stack-project',
    title: 'How I Structure a React and Node.js Full-Stack Project',
    excerpt: 'A practical look at the folders, contracts and development workflow I use to keep a full-stack project understandable.',
    category: 'article',
    published_at: '2026-08-21',
    body: `Building a full-stack application used to feel like keeping too many ideas in my head at once. The frontend, the API, the database and deployment all had their own language, so it was easy to lose track of where a change belonged. I now begin every project by defining a clear boundary around each responsibility.

The first boundary is the data contract. Before writing components, I decide what the API will return and how each resource is identified. A small, predictable response shape prevents the frontend from guessing and makes the backend much easier to extend later.

On the React side, I keep the project focused around pages, reusable components, hooks and a small data layer. Components describe what the interface shows, while hooks coordinate fetching and state. This keeps visual code readable and gives data logic one clear place to live.

The Node.js service follows the same idea. Routes handle HTTP requests, controllers coordinate the work and service functions contain the business rules. A database repository can then be introduced without rewriting every route.

The final piece is a repeatable workflow: make one focused change, test the contract, verify the interface and commit the working result. Small steps make a large project feel manageable, and a clear structure makes future features cheaper to add.`,
    tags: ['React', 'Node.js', 'Architecture'],
    sort_order: 1,
  },
  {
    id: 2,
    slug: 'building-a-url-shortener-with-node-and-express',
    title: 'Building a URL Shortener with Node.js and Express',
    excerpt: 'The design decisions behind creating short links, custom aliases, safe redirects and simple click analytics.',
    category: 'write-up',
    published_at: '2026-07-30',
    body: `A URL shortener looks tiny from the outside, but the interesting work happens behind the redirect. I wanted to understand the complete path from receiving a long URL to recording a visit, so I built the API as a small Express service with an intentionally narrow feature set.

Every shortened link receives a unique slug. When someone provides a custom alias, the server checks that it contains only safe characters and is not already taken. The database stores the destination, alias, creation time and click count, while the API returns the information a client actually needs.

The redirect route is intentionally small. It looks up the slug, increments the visit count and sends the user onward with a temporary redirect. If the alias does not exist, the service returns a clear not-found response instead of silently sending someone to the home page.

I also learned that input validation is part of the feature, not an extra step added later. Limits on URL length, alias length and request rate make the service easier to maintain and safer when it is connected to a public database.

What started as a simple REST API became a useful lesson in designing predictable contracts. Every endpoint does one job, errors are explicit and data validation happens before the database is touched.`,
    tags: ['Node.js', 'Express', 'REST API'],
    sort_order: 2,
  },
  {
    id: 3,
    slug: 'designing-a-fast-accessible-react-portfolio',
    title: 'Designing a Fast and Accessible React Portfolio',
    excerpt: 'How thoughtful CSS, semantic markup and restrained animation can make a portfolio feel fast without becoming heavy.',
    category: 'guide',
    published_at: '2026-07-08',
    body: `A portfolio should help visitors understand who created it within a few seconds. That means the page needs a strong visual hierarchy, readable typography and content that works before decorative effects load. For this site, performance and accessibility are part of the design rather than a final optimization pass.

I start with semantic HTML and a logical heading structure. Navigation uses real links, sections have clear labels and interactive elements remain keyboard accessible. These basics improve usability and also give assistive technology a better understanding of the page.

The visual system is built from a small set of design tokens. Shared colors, spacing, radii and transitions make the interface consistent, while theme variables allow the dark and light versions to change without duplicating entire sections. Most effects use transform and opacity so animation stays smooth.

Images need explicit dimensions to prevent layout shifts, and decorative backgrounds should never carry essential information. On smaller screens, the layout changes by content priority: identity first, navigation stays compact and cards move into a single readable column.

The result feels fast because the browser has less unnecessary work to do. Accessibility improves because the design works beyond color and motion. Good frontend work is not a layer added at the end; it is the discipline that shapes every component from the beginning.`,
    tags: ['React', 'Performance', 'Accessibility'],
    sort_order: 3,
  },
  {
    id: 4,
    slug: 'learning-full-stack-development-one-project-at-a-time',
    title: 'Learning Full-Stack Development One Project at a Time',
    excerpt: 'A personal write-up about moving from first JavaScript lines to building complete products and publishing what I learn.',
    category: 'write-up',
    published_at: '2026-06-12',
    body: `My programming journey did not begin with a perfect plan. It began with curiosity and a willingness to make small things work. Early on, I followed tutorials, wrote simple layouts and repeatedly broke code while learning how the browser responded.

Projects changed the way I learn. A tutorial can show me the happy path, but building my own product forces me to decide what the data looks like, where responsibilities belong and what happens when a request fails. Every confusing problem becomes a practical lesson.

My first full-stack attempts were messy. Components held too much state, routes were difficult to extend and I changed database fields halfway through a feature. Those mistakes became useful because I could see exactly why the design was not working. Refactoring taught me more than quickly rewriting the same code again.

Publishing my progress also changed my mindset. A write-up forces me to explain not only what works, but why I chose it. If I cannot explain a decision clearly, I need to understand it better before moving on.

I am still early in this journey, but the pattern is clear: learn a concept, use it in a project, explain what was built and improve the next version. That loop turns coding from a collection of tutorials into a sustainable practice.`,
    tags: ['Learning', 'Full-Stack', 'Growth'],
    sort_order: 4,
  },
]