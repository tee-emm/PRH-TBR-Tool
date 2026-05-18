import React, { useState, useRef, useEffect } from 'react';
import './_group.css';

const books = [
  {
    title: "The Berry Pickers",
    author: "Amanda Peters",
    category: "Fiction",
    moods: ["Tender", "Haunting", "Book-club ready"],
    channels: ["Friend recommendation", "Bookstore table", "Long-form review"],
    triggers: ["Voice", "Emotional reaction", "Cultural conversation"],
    coverColor: "#8B6F5C",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/729856/the-berry-pickers-by-amanda-peters/9781771647946",
    readerHook: "A voice-driven story about family, memory, grief, and what gets carried across generations.",
    discoveryPath: "I'd expect this to travel through book clubs, reviews, and heartfelt friend recommendations.",
    positioningAngle: "Lead with emotional intimacy, Canadian literary appeal, and book-club conversation."
  },
  {
    title: "Cloud Cuckoo Land",
    author: "Anthony Doerr",
    category: "Fiction",
    moods: ["Expansive", "Smart", "Book-club ready"],
    channels: ["Long-form review", "Author interview", "Bookstore table"],
    triggers: ["Premise", "Comparison titles", "Voice"],
    coverColor: "#4A7C9E",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/606830/cloud-cuckoo-land-by-anthony-doerr/9781982168438",
    readerHook: "A time-spanning story about books, survival, and the way stories connect us across centuries.",
    discoveryPath: "This is a long-form review book — it needs space to be explained and felt.",
    positioningAngle: "Lead with scale, ambition, and its uncanny ability to feel both epic and intimate."
  },
  {
    title: "I Who Have Never Known Men",
    author: "Jacqueline Harpman",
    category: "Fiction",
    moods: ["Haunting", "Strange", "Expansive"],
    channels: ["Reader community", "Social media rabbit hole", "Long-form review"],
    triggers: ["Voice", "Premise", "Emotional reaction"],
    coverColor: "#C4A882",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/736218/i-who-have-never-known-men-by-jacqueline-harpman/9780525659006",
    readerHook: "A spare, devastating fable about memory, identity, and what it means to be human.",
    discoveryPath: "This travels through reader communities, viral recommendations, and obsessive re-reads.",
    positioningAngle: "Position it as quietly unlike anything else — an unforgettable reading experience."
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    moods: ["Tender", "Cozy", "Book-club ready"],
    channels: ["Friend recommendation", "Social media rabbit hole", "Newsletter"],
    triggers: ["Emotional reaction", "Premise", "Cover"],
    coverColor: "#2D5E8E",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/622031/the-midnight-library-by-matt-haig/9780525559474",
    readerHook: "A library between life and death, filled with every life you could have lived.",
    discoveryPath: "Travels through gift-givers, social media, and word-of-mouth emotional impact.",
    positioningAngle: "Lead with the premise and emotional accessibility — it's a book people give to people they love."
  },
  {
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    category: "Memoir",
    moods: ["Tender", "Haunting", "Book-club ready"],
    channels: ["Long-form review", "Author interview", "Friend recommendation"],
    triggers: ["Voice", "Author story", "Emotional reaction"],
    coverColor: "#D4856A",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/621733/crying-in-h-mart-by-michelle-zauner/9780525657743",
    readerHook: "A memoir about grief, Korean American identity, and the way food holds memory.",
    discoveryPath: "Arrives through reviews, author profiles, and deeply personal recommendations.",
    positioningAngle: "Lead with voice and emotional precision — readers feel seen from page one."
  },
  {
    title: "The Hundred-Year-Old Man Who Climbed Out the Window and Disappeared",
    author: "Jonas Jonasson",
    category: "Fiction",
    moods: ["Cozy", "Strange", "Book-club ready"],
    channels: ["Friend recommendation", "Bookstore table", "Newsletter"],
    triggers: ["Premise", "Comparison titles", "Voice"],
    coverColor: "#7B9E6E",
    catalogueUrl: "https://www.penguinrandomhouse.ca/",
    readerHook: "A 100-year-old man escapes his nursing home and stumbles through a century of history.",
    discoveryPath: "Word-of-mouth gold — travels by recommendation from people who couldn't stop laughing.",
    positioningAngle: "Sell the premise. It's impossible to resist once you've heard the setup."
  },
  {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    category: "Non-Fiction",
    moods: ["Expansive", "Smart", "Cozy"],
    channels: ["Long-form review", "Reader community", "Newsletter"],
    triggers: ["Voice", "Cultural conversation", "Author story"],
    coverColor: "#5C7A5E",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/217465/braiding-sweetgrass-by-robin-wall-kimmerer/9781571313560",
    readerHook: "A botanist and indigenous scholar weaves together science, story, and reciprocal relationship with the land.",
    discoveryPath: "Slow-burning word-of-mouth — arrives through thoughtful newsletters and community reading.",
    positioningAngle: "Lead with wonder. This book changes how you see the world around you."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    category: "Fiction",
    moods: ["Strange", "Cozy", "Hungry"],
    channels: ["Friend recommendation", "Bookstore table", "Author interview"],
    triggers: ["Voice", "Premise", "Comparison titles"],
    coverColor: "#B8860B",
    catalogueUrl: "https://www.penguinrandomhouse.ca/",
    readerHook: "Mostly harmless. The universe is large, strange, and deeply funny.",
    discoveryPath: "Passed from one reader to another for 40 years. Still works.",
    positioningAngle: "Don't sell the premise — sell the voice. There's nothing else like it."
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    category: "Fantasy",
    moods: ["Strange", "Haunting", "Smart"],
    channels: ["Reader community", "Social media rabbit hole", "Long-form review"],
    triggers: ["Premise", "Voice", "Emotional reaction"],
    coverColor: "#6A4E7A",
    catalogueUrl: "https://www.penguinrandomhouse.ca/books/623574/piranesi-by-susanna-clarke/9781635575637",
    readerHook: "A man lives in a house of infinite halls, filled with statues and tides. He doesn't know how he got there.",
    discoveryPath: "Goes viral in reader communities — passed hand to hand by people who can't explain it but can't stop thinking about it.",
    positioningAngle: "Sell the mystery. The less you say, the better. Let the opening pages do the work."
  }
];

const QUESTIONS = [
  {
    title: "What reading mood are you in?",
    options: ["Haunting", "Expansive", "Tender", "Strange", "Smart", "Cozy", "Hungry", "Book-club ready"]
  },
  {
    title: "Where would this book most likely find you?",
    options: ["Bookstore table", "Long-form review", "Friend recommendation", "Author interview", "Newsletter", "Reader community", "Social media rabbit hole"]
  },
  {
    title: "What makes you add a book to your TBR?",
    options: ["Voice", "Premise", "Cover", "Cultural conversation", "Emotional reaction", "Comparison titles", "Author story"]
  }
];

export default function App() {
  const [step, setStep] = useState(0); // 0: Hero, 1-3: Quiz, 4: Results
  const [selections, setSelections] = useState<string[]>([]);
  const [matchedBooks, setMatchedBooks] = useState<typeof books>([]);
  const [showThomass, setShowThomass] = useState(false);
  
  const quizRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStep(1);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelection = (option: string) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate matches
      const scored = books.map(book => {
        let score = 0;
        if (book.moods.includes(newSelections[0])) score++;
        if (book.channels.includes(newSelections[1])) score++;
        if (book.triggers.includes(newSelections[2])) score++;
        return { book, score };
      });
      
      // Sort by score descending, then fallback to random if tied
      scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);
      
      setMatchedBooks(scored.slice(0, 3).map(s => s.book));
      setStep(4);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const thomassBooks = books.filter(b => 
    ["Cloud Cuckoo Land", "I Who Have Never Known Men", "The Berry Pickers"].includes(b.title)
  );

  return (
    <div className="prh-app flex flex-col w-full">
      {/* 1. HERO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-[var(--prh-bg)]">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="prh-serif text-5xl md:text-7xl font-bold tracking-tight text-[var(--prh-text)] leading-tight">
              Build Your PRH<br/>Front Table
            </h1>
            <p className="text-lg md:text-xl font-medium text-[var(--prh-muted)]">
              A tiny catalogue-powered reader discovery tool by Thomass Muir.
            </p>
          </div>
          
          <p className="text-base md:text-lg leading-relaxed text-[var(--prh-muted)] max-w-xl mx-auto">
            I learn about books through patterns: the review that gives context, the reader reaction that gives urgency, the bookstore table that creates serendipity, and the interview that makes a book feel alive. This matchmaker turns those discovery habits into a small PRH starter shelf.
          </p>
          
          <button 
            onClick={handleStart}
            className="mt-8 px-8 py-4 bg-[var(--prh-accent)] text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-[var(--prh-accent)] focus:ring-opacity-50"
            aria-label="Start Matching"
          >
            Start Matching
          </button>
        </div>
      </section>

      {/* 2. MATCHMAKER QUIZ */}
      {step > 0 && (
        <section ref={quizRef} className="py-20 px-6 bg-white border-y border-[var(--prh-border)]">
          <div className="max-w-3xl mx-auto">
            
            {/* Live Summary */}
            <div className="mb-12 flex flex-wrap gap-3 items-center justify-center text-sm font-medium text-[var(--prh-muted)] border-b border-[var(--prh-border)] pb-6">
              <span className="uppercase tracking-wider text-xs font-bold text-[var(--prh-accent)] mr-2">Your Shelf:</span>
              <span className={`px-3 py-1 rounded-full border ${selections[0] ? 'border-[var(--prh-accent)] text-[var(--prh-accent)] bg-red-50' : 'border-dashed border-gray-300'}`}>
                Mood: {selections[0] || '...'}
              </span>
              <span className={`px-3 py-1 rounded-full border ${selections[1] ? 'border-[var(--prh-accent)] text-[var(--prh-accent)] bg-red-50' : 'border-dashed border-gray-300'}`}>
                Channel: {selections[1] || '...'}
              </span>
              <span className={`px-3 py-1 rounded-full border ${selections[2] ? 'border-[var(--prh-accent)] text-[var(--prh-accent)] bg-red-50' : 'border-dashed border-gray-300'}`}>
                Trigger: {selections[2] || '...'}
              </span>
            </div>

            {/* Questions */}
            {step < 4 && (
              <div className="space-y-8 animate-slide-up" key={step}>
                <h2 className="prh-serif text-3xl md:text-4xl font-bold text-center mb-8">
                  <span className="text-[var(--prh-accent)] block text-sm font-sans tracking-widest mb-2 uppercase">Step {step} of 3</span>
                  {QUESTIONS[step - 1].title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[step - 1].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelection(opt)}
                      className="p-6 text-left border-2 border-[var(--prh-border)] rounded-xl hover:border-[var(--prh-accent)] hover:bg-[#fff9f8] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--prh-accent)] group"
                    >
                      <span className="text-lg font-medium group-hover:text-[var(--prh-accent)] transition-colors">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. MATCHED RESULT */}
      {step === 4 && (
        <section ref={resultsRef} className="py-20 px-6 bg-[var(--prh-bg)] relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            
            <div className="text-center mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 mix-blend-multiply">
                <div className="animate-stamp inline-block border-4 border-[#D34C37] text-[#D34C37] prh-mono font-bold text-4xl py-2 px-6 rounded-md opacity-80 backdrop-blur-sm shadow-sm" style={{ transform: 'rotate(-15deg)' }}>
                  MATCHED
                </div>
              </div>
              <h2 className="prh-serif text-4xl md:text-5xl font-bold mb-4">Your PRH Starter Shelf</h2>
              <p className="text-[var(--prh-muted)] text-lg">Curated based on your mood, discovery channel, and reading triggers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {matchedBooks.map((book, i) => (
                <BookCard key={book.title} book={book} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. THOMASS MODE */}
      {step === 4 && (
        <section className="py-20 px-6 bg-white border-y border-[var(--prh-border)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <button 
                onClick={() => setShowThomass(!showThomass)}
                className="prh-serif text-2xl font-bold underline decoration-2 decoration-[var(--prh-accent)] underline-offset-8 hover:text-[var(--prh-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--prh-accent)] rounded-sm"
              >
                {showThomass ? "Hide Thomass's Current Shelf" : "Show Thomass's Current Shelf"}
              </button>
            </div>

            {showThomass && (
              <div className="animate-slide-up space-y-12">
                <div className="max-w-2xl mx-auto bg-[#F9F6F0] p-8 rounded-2xl border border-[var(--prh-border)]">
                  <p className="prh-serif text-xl italic text-[var(--prh-muted)] leading-relaxed text-center">
                    "These are the kinds of books that make me pay attention: layered, voice-driven, emotionally precise, and hard to shake. I'm drawn to stories about memory, survival, community, and the strange ways a book can stay with a reader long after finishing it."
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {thomassBooks.map((book, i) => (
                    <BookCard key={book.title} book={book} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. APPLICANT INSIGHT CARD */}
      <section className="py-20 px-6 bg-[var(--prh-bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-[var(--prh-border)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[var(--prh-accent)]"></div>
            <h3 className="prh-serif text-3xl font-bold mb-6">What this says about me as an applicant</h3>
            <p className="text-lg text-[var(--prh-muted)] leading-relaxed">
              I'm interested in the small decisions that help books find readers: the hook, the channel, the audience, the emotional entry point, and the language that makes someone curious enough to click, browse, borrow, or buy. As a designer and reader, I think about books through reader behaviour, positioning, accessibility, content design, and clear digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 6. READER DISCOVERY RECEIPT */}
      {step === 4 && (
        <section className="py-20 px-6 bg-gray-50 prh-receipt-container">
          <div className="max-w-md mx-auto">
            <div className="bg-[#F4F1EA] shadow-lg prh-receipt-edge p-8 sm:p-10 text-[var(--prh-text)] relative">
              <div className="text-center mb-8 border-b-2 border-dashed border-gray-300 pb-8">
                <h4 className="prh-mono font-bold text-2xl uppercase tracking-widest mb-2">PRH TBR</h4>
                <p className="prh-mono text-sm uppercase tracking-widest text-[var(--prh-muted)]">Matchmaker Receipt</p>
              </div>

              <div className="space-y-6 prh-mono text-sm sm:text-base">
                <div className="grid grid-cols-3 gap-2 border-b border-dashed border-gray-300 pb-4">
                  <span className="col-span-1 text-gray-500">MOOD:</span>
                  <span className="col-span-2 text-right font-bold">{selections[0]}</span>
                  
                  <span className="col-span-1 text-gray-500">CHANNEL:</span>
                  <span className="col-span-2 text-right font-bold">{selections[1]}</span>
                  
                  <span className="col-span-1 text-gray-500">TRIGGER:</span>
                  <span className="col-span-2 text-right font-bold">{selections[2]}</span>
                </div>

                <div className="border-b border-dashed border-gray-300 pb-4">
                  <p className="text-gray-500 mb-3">MATCHED SHELF:</p>
                  <ul className="space-y-2">
                    {matchedBooks.map(b => (
                      <li key={b.title} className="flex gap-2">
                        <span>*</span>
                        <span className="font-bold">{b.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-b border-dashed border-gray-300 pb-4">
                  <p className="text-gray-500 mb-1">DISCOVERY STYLE:</p>
                  <p className="font-bold">"Context + emotion + serendipity"</p>
                </div>

                <div className="pt-2 text-xs text-gray-500 leading-relaxed italic">
                  Applicant note: Thomass Muir thinks about books through reader behaviour, positioning, accessibility, content design, and clear digital experiences.
                </div>
              </div>

              <div className="mt-10 text-center print:hidden">
                <button 
                  onClick={handlePrint}
                  className="prh-mono text-sm px-6 py-3 border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-[#F4F1EA]"
                >
                  Print / Save Receipt
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-[var(--prh-bg)] border-t border-[var(--prh-border)] text-center text-[var(--prh-muted)] text-sm print:hidden">
        <div className="max-w-4xl mx-auto">
          <p>
            Book covers and catalogue information belong to their respective publishers, authors, artists, and rights holders. This noncommercial prototype was created as a personal application supplement and links back to Penguin Random House Canada catalogue pages.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Subcomponent: BookCard
function BookCard({ book, index }: { book: typeof books[0], index: number }) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-[var(--prh-border)] overflow-hidden flex flex-col h-full animate-slide-up hover:shadow-md transition-shadow group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Cover Area */}
      <div 
        className="h-64 sm:h-72 w-full flex items-center justify-center p-6 relative overflow-hidden"
        style={{ backgroundColor: book.coverColor + '20' }} // 20 hex is 12% opacity
      >
        <div className="absolute top-4 right-4 z-10">
          <span 
            className="prh-sticker inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-white"
            style={{ color: book.coverColor }}
          >
            {book.category}
          </span>
        </div>
        
        {/* Placeholder Cover */}
        <div 
          className="w-3/5 h-full rounded-sm shadow-lg border border-white/20 transform group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundColor: book.coverColor }}
          aria-label={`Cover for ${book.title}`}
          role="img"
        ></div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="prh-serif text-2xl font-bold mb-1 leading-tight">{book.title}</h3>
        <p className="text-[var(--prh-muted)] font-medium mb-6">{book.author}</p>

        <div className="space-y-4 flex-grow">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--prh-accent)] mb-1">Why this matched</h4>
            <p className="text-sm leading-relaxed">{book.readerHook}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--prh-accent)] mb-1">Discovery Path</h4>
            <p className="text-sm leading-relaxed">{book.discoveryPath}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--prh-accent)] mb-1">Positioning Angle</h4>
            <p className="text-sm leading-relaxed italic text-[var(--prh-muted)]">{book.positioningAngle}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--prh-border)]">
          <a 
            href={book.catalogueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-bold text-[var(--prh-text)] hover:text-[var(--prh-accent)] transition-colors focus:outline-none focus:underline"
          >
            View in PRH Catalogue
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
