import React, { useState, useEffect, useMemo } from 'react';
import './_ink-ivory.css';

const books = [
  { title: "The Berry Pickers", author: "Amanda Peters", category: "Fiction", moods: ["Tender", "Haunting", "Book-club ready"], channels: ["Friend recommendation", "Bookstore table", "Long-form review"], triggers: ["Voice", "Emotional reaction", "Cultural conversation"], coverColor: "#8B6F5C", catalogueUrl: "https://www.penguinrandomhouse.ca/books/729856/the-berry-pickers-by-amanda-peters/9781771647946", readerHook: "A voice-driven story about family, memory, grief, and what gets carried across generations.", discoveryPath: "I'd expect this to travel through book clubs, reviews, and heartfelt friend recommendations.", positioningAngle: "Lead with emotional intimacy, Canadian literary appeal, and book-club conversation." },
  { title: "Cloud Cuckoo Land", author: "Anthony Doerr", category: "Fiction", moods: ["Expansive", "Smart", "Book-club ready"], channels: ["Long-form review", "Author interview", "Bookstore table"], triggers: ["Premise", "Comparison titles", "Voice"], coverColor: "#4A7C9E", catalogueUrl: "https://www.penguinrandomhouse.ca/books/606830/cloud-cuckoo-land-by-anthony-doerr/9781982168438", readerHook: "A time-spanning story about books, survival, and the way stories connect us across centuries.", discoveryPath: "This is a long-form review book — it needs space to be explained and felt.", positioningAngle: "Lead with scale, ambition, and its uncanny ability to feel both epic and intimate." },
  { title: "I Who Have Never Known Men", author: "Jacqueline Harpman", category: "Fiction", moods: ["Haunting", "Strange", "Expansive"], channels: ["Reader community", "Social media rabbit hole", "Long-form review"], triggers: ["Voice", "Premise", "Emotional reaction"], coverColor: "#C4A882", catalogueUrl: "https://www.penguinrandomhouse.ca/books/736218/i-who-have-never-known-men-by-jacqueline-harpman/9780525659006", readerHook: "A spare, devastating fable about memory, identity, and what it means to be human.", discoveryPath: "This travels through reader communities, viral recommendations, and obsessive re-reads.", positioningAngle: "Position it as quietly unlike anything else — an unforgettable reading experience." },
  { title: "The Midnight Library", author: "Matt Haig", category: "Fiction", moods: ["Tender", "Cozy", "Book-club ready"], channels: ["Friend recommendation", "Social media rabbit hole", "Newsletter"], triggers: ["Emotional reaction", "Premise", "Cover"], coverColor: "#2D5E8E", catalogueUrl: "https://www.penguinrandomhouse.ca/books/622031/the-midnight-library-by-matt-haig/9780525559474", readerHook: "A library between life and death, filled with every life you could have lived.", discoveryPath: "Travels through gift-givers, social media, and word-of-mouth emotional impact.", positioningAngle: "Lead with the premise and emotional accessibility — it's a book people give to people they love." },
  { title: "Crying in H Mart", author: "Michelle Zauner", category: "Memoir", moods: ["Tender", "Haunting", "Book-club ready"], channels: ["Long-form review", "Author interview", "Friend recommendation"], triggers: ["Voice", "Author story", "Emotional reaction"], coverColor: "#D4856A", catalogueUrl: "https://www.penguinrandomhouse.ca/books/621733/crying-in-h-mart-by-michelle-zauner/9780525657743", readerHook: "A memoir about grief, Korean American identity, and the way food holds memory.", discoveryPath: "Arrives through reviews, author profiles, and deeply personal recommendations.", positioningAngle: "Lead with voice and emotional precision — readers feel seen from page one." },
  { title: "The Hundred-Year-Old Man Who Climbed Out the Window and Disappeared", author: "Jonas Jonasson", category: "Fiction", moods: ["Cozy", "Strange", "Book-club ready"], channels: ["Friend recommendation", "Bookstore table", "Newsletter"], triggers: ["Premise", "Comparison titles", "Voice"], coverColor: "#7B9E6E", catalogueUrl: "https://www.penguinrandomhouse.ca/", readerHook: "A 100-year-old man escapes his nursing home and stumbles through a century of history.", discoveryPath: "Word-of-mouth gold — travels by recommendation from people who couldn't stop laughing.", positioningAngle: "Sell the premise. It's impossible to resist once you've heard the setup." },
  { title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", category: "Non-Fiction", moods: ["Expansive", "Smart", "Cozy"], channels: ["Long-form review", "Reader community", "Newsletter"], triggers: ["Voice", "Cultural conversation", "Author story"], coverColor: "#5C7A5E", catalogueUrl: "https://www.penguinrandomhouse.ca/books/217465/braiding-sweetgrass-by-robin-wall-kimmerer/9781571313560", readerHook: "A botanist and indigenous scholar weaves together science, story, and reciprocal relationship with the land.", discoveryPath: "Slow-burning word-of-mouth — arrives through thoughtful newsletters and community reading.", positioningAngle: "Lead with wonder. This book changes how you see the world around you." },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", category: "Fiction", moods: ["Strange", "Cozy", "Hungry"], channels: ["Friend recommendation", "Bookstore table", "Author interview"], triggers: ["Voice", "Premise", "Comparison titles"], coverColor: "#B8860B", catalogueUrl: "https://www.penguinrandomhouse.ca/", readerHook: "Mostly harmless. The universe is large, strange, and deeply funny.", discoveryPath: "Passed from one reader to another for 40 years. Still works.", positioningAngle: "Don't sell the premise — sell the voice. There's nothing else like it." },
  { title: "Piranesi", author: "Susanna Clarke", category: "Fantasy", moods: ["Strange", "Haunting", "Smart"], channels: ["Reader community", "Social media rabbit hole", "Long-form review"], triggers: ["Premise", "Voice", "Emotional reaction"], coverColor: "#6A4E7A", catalogueUrl: "https://www.penguinrandomhouse.ca/books/623574/piranesi-by-susanna-clarke/9781635575637", readerHook: "A man lives in a house of infinite halls, filled with statues and tides. He doesn't know how he got there.", discoveryPath: "Goes viral in reader communities — passed hand to hand by people who can't explain it but can't stop thinking about it.", positioningAngle: "Sell the mystery. The less you say, the better. Let the opening pages do the work." }
];

const QUESTIONS = [
  { title: "What reading mood are you in?", options: ["Haunting", "Expansive", "Tender", "Strange", "Smart", "Cozy", "Hungry", "Book-club ready"] },
  { title: "Where would this book most likely find you?", options: ["Bookstore table", "Long-form review", "Friend recommendation", "Author interview", "Newsletter", "Reader community", "Social media rabbit hole"] },
  { title: "What makes you add a book to your TBR?", options: ["Voice", "Premise", "Cover", "Cultural conversation", "Emotional reaction", "Comparison titles", "Author story"] }
];

const THOMAS_FAVORITES = ["Cloud Cuckoo Land", "I Who Have Never Known Men", "The Berry Pickers"];

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
      setStep(step + 1); // Move to results
    }
  };

  const getMatchedBooks = () => {
    if (thomasMode) {
      return books.filter(b => THOMAS_FAVORITES.includes(b.title));
    }
    
    const [mood, channel, trigger] = selections;
    const scored = books.map(book => {
      let score = 0;
      if (book.moods.includes(mood)) score++;
      if (book.channels.includes(channel)) score++;
      if (book.triggers.includes(trigger)) score++;
      return { ...book, score };
    });
    
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const matchedBooks = getMatchedBooks();

  const reset = () => {
    setStep(0);
    setSelections([]);
    setThomasMode(false);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="ink-ivory-container">
      {/* HEADER / NAV */}
      <header className="p-6 md:p-10 border-b border-[var(--border-color)] flex justify-between items-center">
        <div className="font-serif text-2xl tracking-widest uppercase text-[var(--accent-gold)]">
          The Archives
        </div>
        <div className="text-sm tracking-widest uppercase text-[var(--text-secondary)]">
          Curated Discovery
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 min-h-[80vh] flex flex-col justify-center">
        
        {/* STEP 0: HERO */}
        {step === 0 && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="font-serif text-6xl md:text-8xl leading-none tracking-tight mb-8">
              Discover the <br/><span className="italic text-[var(--text-secondary)]">Exceptional.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-12 max-w-2xl font-light">
              An archival approach to finding your next unforgettable read. We pair your reading intuition with our curated collection of extraordinary titles.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="group relative inline-flex items-center gap-4 px-8 py-4 border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--accent-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 font-serif text-xl tracking-wider group-hover:text-[var(--bg-color)] transition-colors duration-500">Begin the Inquiry</span>
              <svg className="relative z-10 w-6 h-6 group-hover:text-[var(--bg-color)] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

        {/* STEPS 1-3: QUIZ */}
        {step > 0 && step <= QUESTIONS.length && (
          <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-700">
            
            {/* Progress / Shelf Summary */}
            <div className="mb-16 flex flex-wrap gap-3 items-center text-sm font-mono tracking-wider text-[var(--text-secondary)]">
              <span>INQUIRY:</span>
              {selections.map((sel, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="px-3 py-1 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)]">
                    {sel}
                  </span>
                  {idx < selections.length - 1 && <span>+</span>}
                </div>
              ))}
              {selections.length < QUESTIONS.length && (
                <span className="px-3 py-1 border border-dashed border-[var(--border-color)] opacity-50">
                  Awaiting...
                </span>
              )}
            </div>

            <h2 className="font-serif text-4xl md:text-5xl mb-12">
              {QUESTIONS[step - 1].title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[step - 1].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="text-left px-6 py-5 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-gold)] hover:bg-transparent transition-all duration-300 group"
                >
                  <span className="font-serif text-2xl group-hover:text-[var(--accent-gold)] transition-colors">{option}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-12 text-sm text-[var(--text-secondary)] font-mono uppercase tracking-widest">
              Vol. {step} of {QUESTIONS.length}
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step > QUESTIONS.length && (
          <div className="animate-in fade-in duration-1000 w-full space-y-24">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--border-color)] pb-8 gap-8">
              <div>
                <div className="flex items-center gap-6 mb-4">
                  <h2 className="font-serif text-5xl md:text-7xl">The Selection</h2>
                  {!thomasMode && (
                    <div className="gold-stamp px-4 py-1 font-serif text-2xl tracking-widest uppercase inline-block">
                      Matched
                    </div>
                  )}
                </div>
                <p className="text-[var(--text-secondary)] font-mono text-sm max-w-xl">
                  {thomasMode 
                    ? "Displaying personal selections by Thomas, candidate for the Digital Marketing & Content role." 
                    : "Curated based on your specific inclinations and literary appetites."}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={reset}
                  className="px-6 py-3 border border-[var(--border-color)] font-serif text-lg hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors"
                >
                  New Inquiry
                </button>
                <button 
                  onClick={() => setThomasMode(!thomasMode)}
                  className={`px-6 py-3 border font-serif text-lg transition-colors ${
                    thomasMode 
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[var(--bg-color)]' 
                      : 'border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]'
                  }`}
                >
                  {thomasMode ? "View Your Match" : "Thomas's Match"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedBooks.map((book, idx) => (
                <div 
                  key={book.title} 
                  className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-colors duration-500"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
                    <span className="font-mono text-xs uppercase tracking-widest bg-[var(--bg-color)] border border-[var(--border-color)] px-2 py-1">
                      {book.category}
                    </span>
                    <span className="font-serif text-[var(--text-secondary)] italic">No. 0{idx + 1}</span>
                  </div>
                  
                  {/* Spine/Cover proxy */}
                  <div 
                    className="h-64 m-6 border border-[var(--border-color)] relative overflow-hidden"
                    style={{ backgroundColor: book.coverColor }}
                  >
                    <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-sm">
                       <a href={book.catalogueUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#F5F0E8] font-serif text-lg text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-black transition-colors">
                         View Catalogue
                       </a>
                    </div>
                  </div>

                  <div className="px-6 pb-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-3xl mb-2 leading-tight">{book.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-6 tracking-wide font-light">{book.author}</p>
                    
                    <div className="mt-auto space-y-6">
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">The Hook</div>
                        <p className="text-sm font-light leading-relaxed">{book.readerHook}</p>
                      </div>
                      
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">Positioning</div>
                        <p className="text-sm font-light leading-relaxed">{book.positioningAngle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Print Receipt Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
              
              {/* Insight Card */}
              <div className="lg:col-span-7 bg-[var(--card-bg)] border border-[var(--border-color)] p-8 md:p-12">
                <h3 className="font-serif text-3xl mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[var(--accent-gold)] block"></span>
                  Applicant Insight
                </h3>
                <div className="space-y-6 text-[var(--text-secondary)] font-light leading-relaxed">
                  <p>
                    Thomas is applying for the <strong>Digital Marketing & Content</strong> position. This prototype demonstrates an understanding of how distinct aesthetic positioning changes the relationship between a reader and a catalog.
                  </p>
                  <p>
                    By framing discovery as an archival, deliberate inquiry rather than a rapid-fire quiz, the books are elevated. The <em>Ink & Ivory</em> variant prioritizes restraint, allowing the cover colors and the copy to command the room.
                  </p>
                  <p className="italic pt-4 border-t border-[var(--border-color)] font-serif text-lg">
                    "A great campaign doesn't just sell a book; it builds a world around it."
                  </p>
                </div>
              </div>

              {/* Receipt */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="reader-receipt w-full max-w-sm p-8 print-area">
                  <div className="text-center mb-6">
                    <div className="font-serif text-2xl uppercase tracking-widest border-b-2 border-black pb-2 mb-2 inline-block">The Archives</div>
                    <div className="font-mono text-xs uppercase">Curated Reading Record</div>
                  </div>
                  
                  <div className="receipt-dashed-line mb-4"></div>
                  
                  <div className="font-mono text-xs space-y-2 mb-6">
                    <div className="flex justify-between"><span>DATE:</span> <span>{new Date().toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span>CLERK:</span> <span>01-SYSTEM</span></div>
                    <div className="flex justify-between"><span>MODE:</span> <span>{thomasMode ? "APPLICANT" : "VISITOR"}</span></div>
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
                    <button 
                      onClick={printReceipt}
                      className="border border-black px-4 py-2 hover:bg-black hover:text-[var(--receipt-bg)] transition-colors uppercase"
                    >
                      Print Record
                    </button>
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
