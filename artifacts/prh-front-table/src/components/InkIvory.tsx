import React, { useState } from 'react';
import './ink-ivory.css';

// Every entry below has been live-verified against the Penguin Random House Canada
// catalogue (page returns the actual book, not the SPA shell). Cover images load
// from PRH's official cover service keyed by the same ISBN as the catalogue URL,
// so titles, descriptions, covers, and links all point at the same edition.
// If a cover ever fails to load, the card falls back to a CSS-only typographic cover.
type Book = {
  title: string; author: string; category: string;
  moods: string[]; channels: string[]; triggers: string[];
  coverColor: string; isbn: string; catalogueUrl: string;
  readerHook: string; discoveryPath: string; positioningAngle: string;
};

const MOODS = [
  "Wreck me emotionally",
  "Take me somewhere strange",
  "Make me think hard",
  "Wrap me in a blanket",
  "Surprise me with voice",
  "Big, sweeping, epic",
  "Sharp and a little dangerous",
  "Something I can talk about for hours",
];

const CHANNELS = [
  "A friend texting me 'you NEED this'",
  "A bookseller's handwritten staff pick",
  "A reviewer I've followed for years",
  "An author interview that hooked me",
  "A literary newsletter in my inbox",
  "A reading community thread",
  "An algorithm that finally got me right",
];

const TRIGGERS = [
  "An opening line I can't shake",
  "A premise I have to know more about",
  "A cover that stops me dead",
  "It's the book of the year and I want in",
  "Someone I trust cried describing it",
  "The author's story behind the book",
  "It's the perfect comp for something I loved",
];

const books: Book[] = [
  {
    title: "Crying in H Mart", author: "Michelle Zauner", category: "Memoir",
    moods: ["Wreck me emotionally", "Surprise me with voice", "Something I can talk about for hours"],
    channels: ["A reviewer I've followed for years", "An author interview that hooked me", "A friend texting me 'you NEED this'"],
    triggers: ["Someone I trust cried describing it", "The author's story behind the book", "An opening line I can't shake"],
    coverColor: "#D4856A", isbn: "9781984898951",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/612676/crying-in-h-mart-by-michelle-zauner/9781984898951",
    readerHook: "A memoir about grief, Korean American identity, and the way food carries memory.",
    discoveryPath: "Arrives through reviews, author profiles, and deeply personal recommendations.",
    positioningAngle: "Lead with voice and emotional precision — readers feel seen from page one.",
  },
  {
    title: "All Fours", author: "Miranda July", category: "Fiction",
    moods: ["Take me somewhere strange", "Sharp and a little dangerous", "Something I can talk about for hours"],
    channels: ["A reading community thread", "A reviewer I've followed for years", "An author interview that hooked me"],
    triggers: ["An opening line I can't shake", "The author's story behind the book", "It's the book of the year and I want in"],
    coverColor: "#C3304B", isbn: "9780593190272",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/639464/all-fours-by-miranda-july/9780593190272",
    readerHook: "A semi-autobiographical novel about desire, midlife, and a road trip that never quite happens.",
    discoveryPath: "Sparks group-chat debate — travels through critics, podcasts, and word-of-mouth obsession.",
    positioningAngle: "Lean into the conversation. This is a book people argue about, recommend, and re-read.",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", category: "Fiction",
    moods: ["Wreck me emotionally", "Wrap me in a blanket", "Something I can talk about for hours"],
    channels: ["A friend texting me 'you NEED this'", "A bookseller's handwritten staff pick", "A literary newsletter in my inbox"],
    triggers: ["Someone I trust cried describing it", "A premise I have to know more about", "It's the perfect comp for something I loved"],
    coverColor: "#1F3A93", isbn: "9780735243361",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/690750/tomorrow-and-tomorrow-and-tomorrow-by-gabrielle-zevin/9780735243361",
    readerHook: "Two friends, thirty years, and the video games they build to find their way back to each other.",
    discoveryPath: "The quintessential handsell — staff picks, gift-givers, and 'you have to read this' texts.",
    positioningAngle: "Sell the friendship first; the games are the world it's set in, not the hook.",
  },
  {
    title: "James", author: "Percival Everett", category: "Fiction",
    moods: ["Make me think hard", "Sharp and a little dangerous", "Big, sweeping, epic"],
    channels: ["A reviewer I've followed for years", "An author interview that hooked me", "A reading community thread"],
    triggers: ["It's the book of the year and I want in", "A premise I have to know more about", "An opening line I can't shake"],
    coverColor: "#1F4D2B", isbn: "9780385550369",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/738749/james-by-percival-everett/9780385550369",
    readerHook: "Huckleberry Finn retold from Jim's perspective — fierce, funny, and devastatingly alive.",
    discoveryPath: "Arrives through prize lists, essays, and reviews that demand you make space for it.",
    positioningAngle: "Lead with literary heft and cultural urgency. This is a book the year revolves around.",
  },
  {
    title: "Lessons in Chemistry", author: "Bonnie Garmus", category: "Fiction",
    moods: ["Wrap me in a blanket", "Sharp and a little dangerous", "Something I can talk about for hours"],
    channels: ["A friend texting me 'you NEED this'", "A bookseller's handwritten staff pick", "A literary newsletter in my inbox"],
    triggers: ["A premise I have to know more about", "A cover that stops me dead", "It's the perfect comp for something I loved"],
    coverColor: "#E8A23A", isbn: "9780385697392",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/677234/lessons-in-chemistry-by-bonnie-garmus/9780385697392",
    readerHook: "A chemist-turned-reluctant-TV-cook refuses to let the 1960s tell her who she is.",
    discoveryPath: "Word-of-mouth that crossed every demographic — book clubs, gift tables, prestige TV halo.",
    positioningAngle: "Promise warmth and bite in the same breath. Sell her, not the era.",
  },
  {
    title: "The Secret History", author: "Donna Tartt", category: "Fiction",
    moods: ["Sharp and a little dangerous", "Make me think hard", "Take me somewhere strange"],
    channels: ["A reading community thread", "A bookseller's handwritten staff pick", "A friend texting me 'you NEED this'"],
    triggers: ["An opening line I can't shake", "A premise I have to know more about", "It's the perfect comp for something I loved"],
    coverColor: "#6B1F1F", isbn: "9781400031702",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/176619/the-secret-history-by-donna-tartt/9781400031702",
    readerHook: "A New England college, a tight circle of classics students, and a death they all know about.",
    discoveryPath: "Lives forever on dark-academia shelves, BookTok lists, and obsessive group reads.",
    positioningAngle: "Don't argue. Quote the opening paragraph. The book sells itself.",
  },
  {
    title: "Starlight", author: "Richard Wagamese", category: "Fiction",
    moods: ["Wreck me emotionally", "Wrap me in a blanket", "Surprise me with voice"],
    channels: ["A bookseller's handwritten staff pick", "A literary newsletter in my inbox", "A reviewer I've followed for years"],
    triggers: ["Someone I trust cried describing it", "The author's story behind the book", "An opening line I can't shake"],
    coverColor: "#2E4F3A", isbn: "9780771070877",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/575724/starlight-by-richard-wagamese/9780771070877",
    readerHook: "The unfinished final novel from one of Canada's most beloved Indigenous writers — luminous, tender, alive.",
    discoveryPath: "Canadian booksellers carry this one personally. It travels through trust.",
    positioningAngle: "Honour Wagamese's voice and legacy. Let the writing do the lifting.",
  },
  {
    title: "Trust", author: "Hernan Diaz", category: "Fiction",
    moods: ["Make me think hard", "Big, sweeping, epic", "Sharp and a little dangerous"],
    channels: ["A reviewer I've followed for years", "A literary newsletter in my inbox", "A reading community thread"],
    triggers: ["It's the book of the year and I want in", "A premise I have to know more about", "A cover that stops me dead"],
    coverColor: "#1B2A4E", isbn: "9780593420324",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/678664/trust-pulitzer-prize-winner-by-hernan-diaz/9780593420324",
    readerHook: "A Pulitzer-winning novel about wealth, narrative, and who gets to tell the story of a fortune.",
    discoveryPath: "Travels through long-form reviews, prize chatter, and reader communities that love form.",
    positioningAngle: "Sell the structure. Four versions of one story is the irresistible hook.",
  },
  {
    title: "Greek Lessons", author: "Han Kang", category: "Fiction",
    moods: ["Take me somewhere strange", "Surprise me with voice", "Wreck me emotionally"],
    channels: ["A reviewer I've followed for years", "A literary newsletter in my inbox", "An author interview that hooked me"],
    triggers: ["An opening line I can't shake", "The author's story behind the book", "A cover that stops me dead"],
    coverColor: "#7C6A52", isbn: "9780593595442",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/717358/greek-lessons-by-han-kang/9780593595442",
    readerHook: "A woman who has lost her voice. A teacher who is losing his sight. A quiet, devastating love story.",
    discoveryPath: "Carried by literary newsletters, Nobel attention, and readers who pass Han Kang hand to hand.",
    positioningAngle: "Lead with the author's stature, then let the silence of the prose speak.",
  },
];

const coverFor = (isbn: string) => `https://images.randomhouse.com/cover/${isbn}`;

const QUESTIONS = [
  { eyebrow: "Vol. I — The Mood", title: "What kind of reading night is this?", subtitle: "Pick the one that's loudest right now. There are no wrong answers, only honest ones.", options: MOODS },
  { eyebrow: "Vol. II — The Channel", title: "Where do you actually trust your next book to come from?", subtitle: "The algorithm is one option. So is the friend who never steers you wrong.", options: CHANNELS },
  { eyebrow: "Vol. III — The Spark", title: "What gets a book onto your stack?", subtitle: "The thing that makes you stop scrolling, pick it up, and walk to the counter.", options: TRIGGERS },
];

const THOMAS_FAVORITES = ["James", "Tomorrow, and Tomorrow, and Tomorrow", "Crying in H Mart"];

export function InkIvory() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [thomasMode, setThomasMode] = useState(false);

  const handleOptionSelect = (option: string) => {
    const newSelections = [...selections];
    newSelections[step - 1] = option;
    setSelections(newSelections);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const getMatchedBooks = () => {
    if (thomasMode) {
      return { books: books.filter(b => THOMAS_FAVORITES.includes(b.title)), isClosest: false };
    }
    const [mood, channel, trigger] = selections;
    const scored = books.map(book => {
      let score = 0;
      if (book.moods.includes(mood)) score++;
      if (book.channels.includes(channel)) score++;
      if (book.triggers.includes(trigger)) score++;
      return { ...book, score };
    });
    const sorted = scored.sort((a, b) => b.score - a.score);
    const exact = sorted.filter(b => b.score === 3);
    const top = sorted.slice(0, 3);
    return { books: top, isClosest: exact.length < 3 };
  };

  const { books: matchedBooks, isClosest } = getMatchedBooks();

  const reset = () => {
    setStep(0);
    setSelections([]);
    setThomasMode(false);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="ink-ivory-container ink-ivory-theme">
      <header className="p-6 md:p-10 border-b border-[var(--border-color)] flex justify-between items-center">
        <div className="font-serif text-2xl tracking-widest uppercase text-[var(--accent-gold)]">The Archives</div>
        <div className="text-sm tracking-widest uppercase text-[var(--text-secondary)]">Curated Discovery</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 min-h-[80vh] flex flex-col justify-center">
        {step === 0 && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight mb-8">
              Discover the <br/><span className="italic text-[var(--text-secondary)]">Exceptional.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-12 max-w-2xl font-light">
              An archival approach to finding your next unforgettable read. We pair your reading intuition with our curated collection of extraordinary titles.
            </p>
            <button onClick={() => setStep(1)} className="group relative inline-flex items-center gap-4 px-8 py-4 border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-[var(--accent-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 font-serif text-xl tracking-wider group-hover:text-[var(--bg-color)] transition-colors duration-500">Begin the Inquiry</span>
              <svg className="relative z-10 w-6 h-6 group-hover:text-[var(--bg-color)] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

        {step > 0 && step <= QUESTIONS.length && (
          <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-700">
            <div className="mb-16 flex flex-wrap gap-3 items-center text-sm font-mono tracking-wider text-[var(--text-secondary)]">
              <span>INQUIRY:</span>
              {selections.map((sel, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="px-3 py-1 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)]">{sel}</span>
                  {idx < selections.length - 1 && <span>+</span>}
                </div>
              ))}
              {selections.length < QUESTIONS.length && (
                <span className="px-3 py-1 border border-dashed border-[var(--border-color)] opacity-50">Awaiting...</span>
              )}
            </div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4">{QUESTIONS[step - 1].eyebrow}</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">{QUESTIONS[step - 1].title}</h2>
            <p className="text-[var(--text-secondary)] font-light text-lg md:text-xl mb-12 max-w-2xl italic">{QUESTIONS[step - 1].subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[step - 1].options.map((option, oIdx) => (
                <button key={option} onClick={() => handleOptionSelect(option)} className="text-left px-6 py-5 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-gold)] hover:bg-transparent transition-all duration-300 group flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[var(--text-secondary)] group-hover:text-[var(--accent-gold)] transition-colors w-8 shrink-0">{String(oIdx + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-xl md:text-2xl group-hover:text-[var(--accent-gold)] transition-colors leading-snug">{option}</span>
                </button>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-between text-sm text-[var(--text-secondary)] font-mono uppercase tracking-widest">
              <span>Vol. {step} of {QUESTIONS.length}</span>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="hover:text-[var(--accent-gold)] transition-colors">← Previous Volume</button>
              )}
            </div>
          </div>
        )}

        {step > QUESTIONS.length && (
          <div className="animate-in fade-in duration-1000 w-full space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--border-color)] pb-8 gap-8">
              <div>
                <div className="flex items-center gap-6 mb-4">
                  <h2 className="font-serif text-5xl md:text-7xl">The Selection</h2>
                  {!thomasMode && <div className="gold-stamp px-4 py-1 font-serif text-2xl tracking-widest uppercase inline-block">Matched</div>}
                </div>
                <p className="text-[var(--text-secondary)] font-mono text-sm max-w-xl">
                  {thomasMode
                    ? "Displaying personal selections by Thomass, candidate for the Digital Marketing & Content role."
                    : isClosest
                      ? "No exact triple-match in the verified catalogue — showing the closest catalogue matches."
                      : "Curated based on your specific inclinations and literary appetites."}
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={reset} className="px-6 py-3 border border-[var(--border-color)] font-serif text-lg hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors">New Inquiry</button>
                <button onClick={() => setThomasMode(!thomasMode)} className={`px-6 py-3 border font-serif text-lg transition-colors ${thomasMode ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[var(--bg-color)]' : 'border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]'}`}>
                  {thomasMode ? "View Your Match" : "Thomass's Match"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedBooks.map((book, idx) => (
                <div key={book.title} className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-colors duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
                    <span className="font-mono text-xs uppercase tracking-widest bg-[var(--bg-color)] border border-[var(--border-color)] px-2 py-1">{book.category}</span>
                    <span className="font-serif text-[var(--text-secondary)] italic">No. 0{idx + 1}</span>
                  </div>
                  <div className="h-72 mx-6 mt-6 mb-4 border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: book.coverColor }}>
                    <div className="cover-fallback absolute inset-0 flex flex-col justify-between p-5 text-[#F5F0E8]">
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">{book.category}</span>
                      <div>
                        <div className="font-serif text-2xl leading-tight mb-2">{book.title}</div>
                        <div className="font-light text-xs opacity-90">{book.author}</div>
                      </div>
                    </div>
                    <img
                      src={coverFor(book.isbn)}
                      alt={`Cover of ${book.title} by ${book.author}`}
                      loading="lazy"
                      className="cover-img relative z-10 max-h-full max-w-full object-contain shadow-2xl"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70 backdrop-blur-sm">
                      <a href={book.catalogueUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#F5F0E8] font-serif text-lg text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-black transition-colors">View Catalogue</a>
                    </div>
                  </div>
                  <div className="px-6 pb-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-3xl mb-2 leading-tight">{book.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-6 tracking-wide font-light">{book.author}</p>
                    <div className="space-y-6 mb-6">
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">The Hook</div>
                        <p className="text-sm font-light leading-relaxed">{book.readerHook}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">Positioning</div>
                        <p className="text-sm font-light leading-relaxed">{book.positioningAngle}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border-color)] space-y-3">
                      <a
                        href={book.catalogueUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-serif text-base text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        View in PRH Catalogue
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] opacity-70">
                        Source: Penguin Random House Canada catalogue.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
              <div className="lg:col-span-7 bg-[var(--card-bg)] border border-[var(--border-color)] p-8 md:p-12">
                <h3 className="font-serif text-3xl mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[var(--accent-gold)] block"></span>
                  Applicant Insight
                </h3>
                <div className="space-y-6 text-[var(--text-secondary)] font-light leading-relaxed">
                  <p>Thomass Muir is applying for the <strong className="text-[var(--text-primary)] font-medium">Digital Marketing & Content</strong> position at Penguin Random House Canada. This prototype demonstrates an understanding of how distinct aesthetic positioning changes the relationship between a reader and a catalogue.</p>
                  <p>By framing discovery as an archival, deliberate inquiry rather than a rapid-fire quiz, the books are elevated. The <em>Ink & Ivory</em> variant prioritizes restraint, allowing the cover colours and the copy to command the room.</p>
                  <p>I'm interested in the small decisions that help books find readers: the hook, the channel, the audience, the emotional entry point, and the language that makes someone curious enough to click, browse, borrow, or buy.</p>
                  <p className="italic pt-4 border-t border-[var(--border-color)] font-serif text-lg text-[var(--text-primary)]">"A great campaign doesn't just sell a book; it builds a world around it."</p>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="reader-receipt w-full max-w-sm p-8 print-area">
                  <div className="text-center mb-6">
                    <div className="font-serif text-2xl uppercase tracking-widest border-b-2 border-black pb-2 mb-2 inline-block">The Archives</div>
                    <div className="font-mono text-xs uppercase">Curated Reading Record</div>
                  </div>
                  <div className="receipt-dashed-line mb-4"></div>
                  <div className="font-mono text-xs space-y-2 mb-6">
                    <div className="flex justify-between"><span>DATE:</span><span>{new Date().toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span>CLERK:</span><span>01-SYSTEM</span></div>
                    <div className="flex justify-between"><span>MODE:</span><span>{thomasMode ? "APPLICANT" : "VISITOR"}</span></div>
                  </div>
                  <div className="receipt-dashed-line mb-4"></div>
                  <div className="mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-wider mb-3 font-bold">Input Variables:</div>
                    {!thomasMode && selections.length === 3 ? (
                      <ul className="font-mono text-xs space-y-1 ml-2">
                        <li>&gt; MOOD: {selections[0]}</li>
                        <li>&gt; CHAN: {selections[1]}</li>
                        <li>&gt; TRIG: {selections[2]}</li>
                      </ul>
                    ) : (
                      <div className="font-mono text-xs italic">Pre-selected applicant parameters</div>
                    )}
                  </div>
                  <div className="receipt-dashed-line mb-4"></div>
                  <div className="mb-8">
                    <div className="font-mono text-[10px] uppercase tracking-wider mb-3 font-bold">Issued Titles:</div>
                    <ul className="font-mono text-xs space-y-3">
                      {matchedBooks.map(b => (
                        <li key={b.title} className="leading-tight">
                          <div className="font-bold">{b.title}</div>
                          <div>by {b.author}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="receipt-dashed-line mb-6"></div>
                  <div className="text-center font-mono text-[10px] space-y-4">
                    <div>*** END OF RECORD ***</div>
                    <button onClick={printReceipt} className="border border-black px-4 py-2 hover:bg-black hover:text-[var(--receipt-bg)] transition-colors uppercase">Print Record</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--border-color)] py-12 px-6 text-center">
        <p className="max-w-3xl mx-auto text-xs font-mono text-[var(--text-secondary)] leading-relaxed opacity-60">
          Book covers and catalogue information belong to their respective publishers, authors, artists, and rights holders. This noncommercial prototype was created as a personal application supplement and links back to Penguin Random House Canada catalogue pages.
        </p>
      </footer>
    </div>
  );
}