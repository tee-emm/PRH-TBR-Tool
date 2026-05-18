import React, { useState, useEffect } from 'react';
import './_clean-modern.css';
import { Check, ChevronRight, Printer, RotateCcw } from 'lucide-react';

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

export function CleanModern() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [thomasMode, setThomasMode] = useState(false);
  const [matchedBooks, setMatchedBooks] = useState<typeof books>([]);

  const handleStart = () => {
    setStep(1);
    setSelections([]);
    setMatchedBooks([]);
  };

  const handleSelect = (option: string) => {
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
        return { ...book, score };
      });
      
      const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 3);
      setMatchedBooks(sorted);
      setStep(4);
    }
  };

  const thomasBooks = books.filter(b => ["Cloud Cuckoo Land", "I Who Have Never Known Men", "The Berry Pickers"].includes(b.title));
  const displayBooks = thomasMode ? thomasBooks : matchedBooks;

  return (
    <div className="cm-container w-full min-h-screen pb-24">
      {/* 5. Applicant Insight Card (Always visible) */}
      <div className="bg-white border-b border-[var(--cm-border)] py-4 px-6 sm:px-12 flex justify-between items-center text-xs cm-mono text-[var(--cm-text-muted)] sticky top-0 z-50 shadow-sm">
        <div>Applicant Profile: Thomas</div>
        <div>Role: Marketing Assistant</div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 sm:px-12 pt-16 sm:pt-24">
        
        {step === 0 && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="cm-heading text-5xl sm:text-7xl font-light text-[var(--cm-text)] leading-[1.1] mb-8">
              Discover your next great read.
            </h1>
            <p className="text-lg text-[var(--cm-text-muted)] mb-12 max-w-xl">
              A curated selection process to find the perfect book for your current mood, preferred discovery channel, and reading triggers.
            </p>
            <button 
              onClick={handleStart}
              className="group flex items-center gap-4 bg-[var(--cm-accent)] text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#152a50] transition-colors"
            >
              Start Matching
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step > 0 && step <= 3 && (
          <div className="animate-in fade-in duration-500">
            {/* Live Shelf Summary */}
            <div className="mb-16 cm-mono text-sm border-b border-[var(--cm-border)] pb-8">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex gap-4 items-baseline">
                  <span className="text-[var(--cm-text-muted)]">01 MOOD:</span>
                  <span className={selections[0] ? "text-[var(--cm-accent)]" : "text-[var(--cm-border)]"}>
                    {selections[0] || "---"}
                  </span>
                </div>
                <div className="flex gap-4 items-baseline">
                  <span className="text-[var(--cm-text-muted)]">02 CHANNEL:</span>
                  <span className={selections[1] ? "text-[var(--cm-accent)]" : "text-[var(--cm-border)]"}>
                    {selections[1] || "---"}
                  </span>
                </div>
                <div className="flex gap-4 items-baseline">
                  <span className="text-[var(--cm-text-muted)]">03 TRIGGER:</span>
                  <span className={selections[2] ? "text-[var(--cm-accent)]" : "text-[var(--cm-border)]"}>
                    {selections[2] || "---"}
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="cm-mono text-[var(--cm-accent)] mb-4 text-xs">QUESTION 0{step}</p>
              <h2 className="cm-heading text-4xl sm:text-5xl mb-12">{QUESTIONS[step-1].title}</h2>
              
              <div className="flex flex-wrap gap-4">
                {QUESTIONS[step-1].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="border border-[var(--cm-border)] px-6 py-3 text-sm hover:border-[var(--cm-text)] hover:bg-[var(--cm-text)] hover:text-white transition-colors text-[var(--cm-text-muted)]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-[var(--cm-border)] pb-8 gap-6">
              <div>
                <div className="inline-block border-2 border-[var(--cm-accent)] text-[var(--cm-accent)] px-4 py-1 font-bold tracking-widest text-sm mb-6 cm-stamp-anim">
                  MATCHED
                </div>
                <h2 className="cm-heading text-4xl">Your curated selection.</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setThomasMode(!thomasMode)}
                  className={`text-xs px-4 py-2 border transition-colors ${thomasMode ? 'border-[var(--cm-accent)] bg-[var(--cm-accent)] text-white' : 'border-[var(--cm-border)] text-[var(--cm-text-muted)] hover:border-[var(--cm-text)]'}`}
                >
                  {thomasMode ? "VIEWING THOMAS'S PICKS" : "THOMAS'S PICKS"}
                </button>
                <button 
                  onClick={handleStart}
                  className="p-2 border border-[var(--cm-border)] text-[var(--cm-text-muted)] hover:text-[var(--cm-text)] transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {thomasMode && (
              <div className="mb-12 bg-[var(--cm-alt-bg)] p-8 border-l-4 border-[var(--cm-accent)]">
                <p className="cm-heading text-xl md:text-2xl text-[var(--cm-text)] max-w-3xl leading-relaxed">
                  "I selected these three titles because they represent the intersection of literary ambition and undeniable readability. They are books that demand to be discussed."
                </p>
                <p className="mt-4 text-sm text-[var(--cm-text-muted)] cm-mono">— Thomas, Applicant</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {displayBooks.map((book, idx) => (
                <div key={book.title} className="cm-card flex flex-col h-full bg-white border border-[var(--cm-border)]" style={{ borderTop: `4px solid ${book.coverColor}` }}>
                  <div className="p-6 flex-grow">
                    <p className="cm-mono text-[10px] text-[var(--cm-text-muted)] uppercase tracking-wider mb-2">{book.category}</p>
                    <h3 className="cm-heading text-2xl mb-1 leading-tight">{book.title}</h3>
                    <p className="text-sm text-[var(--cm-text-muted)] mb-6">{book.author}</p>
                    <p className="text-sm leading-relaxed mb-6">{book.readerHook}</p>
                    
                    <div className="space-y-4 pt-4 border-t border-[var(--cm-border)]">
                      <div>
                        <p className="cm-mono text-[10px] text-[var(--cm-text-muted)] mb-1">DISCOVERY</p>
                        <p className="text-xs">{book.discoveryPath}</p>
                      </div>
                      <div>
                        <p className="cm-mono text-[10px] text-[var(--cm-text-muted)] mb-1">POSITIONING</p>
                        <p className="text-xs">{book.positioningAngle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-[var(--cm-alt-bg)] border-t border-[var(--cm-border)]">
                    <a 
                      href={book.catalogueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[var(--cm-accent)] hover:underline flex items-center justify-between"
                    >
                      View Catalogue Entry <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Receipt Section */}
            <div className="cm-receipt-section border border-[var(--cm-border)] max-w-2xl mx-auto p-8 bg-[var(--cm-alt-bg)]">
              <div className="flex justify-between items-start mb-12 cm-no-print">
                <h3 className="cm-heading text-2xl">Discovery Receipt</h3>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-sm border border-[var(--cm-border)] px-4 py-2 hover:bg-white transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
              
              <div className="cm-mono text-sm space-y-8">
                <div className="text-center border-b border-dashed border-[var(--cm-border)] pb-6">
                  <p className="font-bold">PENGUIN RANDOM HOUSE</p>
                  <p className="text-[var(--cm-text-muted)]">FRONT TABLE CURATOR</p>
                  <p className="text-xs mt-2">{new Date().toLocaleDateString()}</p>
                </div>
                
                {!thomasMode && (
                  <div>
                    <p className="text-[var(--cm-text-muted)] mb-2">INPUT PARAMETERS:</p>
                    <div className="grid grid-cols-[100px_1fr] gap-2 text-xs">
                      <span>MOOD:</span><span>{selections[0]}</span>
                      <span>CHANNEL:</span><span>{selections[1]}</span>
                      <span>TRIGGER:</span><span>{selections[2]}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-[var(--cm-text-muted)] mb-4 border-b border-dashed border-[var(--cm-border)] pb-2">
                    {thomasMode ? "THOMAS'S SELECTIONS:" : "COMPUTED MATCHES:"}
                  </p>
                  <div className="space-y-4">
                    {displayBooks.map(book => (
                      <div key={book.title} className="flex justify-between text-xs">
                        <span className="max-w-[70%]">{book.title.toUpperCase()}</span>
                        <span className="text-[var(--cm-text-muted)]">{book.author}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center border-t border-dashed border-[var(--cm-border)] pt-6 text-xs text-[var(--cm-text-muted)]">
                  <p>THANK YOU FOR READING.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-24 py-12 border-t border-[var(--cm-border)] px-6 sm:px-12 text-center cm-mono text-[10px] text-[var(--cm-text-muted)] max-w-4xl mx-auto">
        Book covers and catalogue information belong to their respective publishers, authors, artists, and rights holders. This noncommercial prototype was created as a personal application supplement and links back to Penguin Random House Canada catalogue pages.
      </footer>
    </div>
  );
}
