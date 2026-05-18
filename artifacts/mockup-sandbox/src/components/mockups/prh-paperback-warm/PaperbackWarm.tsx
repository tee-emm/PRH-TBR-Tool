import React, { useState, useEffect } from 'react';
import './_paperback-warm.css';
import { BookOpen, Check, Printer, RefreshCcw, Sparkles } from 'lucide-react';

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

export function PaperbackWarm() {
  const [step, setStep] = useState(0); // 0: Hero, 1-3: Quiz, 4: Results
  const [selections, setSelections] = useState<string[]>([]);
  const [thomassMode, setThomassMode] = useState(false);
  const [matchedBooks, setMatchedBooks] = useState<typeof books>([]);

  const handleSelect = (option: string) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);
    
    if (newSelections.length === 3) {
      // Calculate matches
      const scored = books.map(book => {
        let score = 0;
        if (book.moods.includes(newSelections[0])) score++;
        if (book.channels.includes(newSelections[1])) score++;
        if (book.triggers.includes(newSelections[2])) score++;
        return { ...book, score };
      }).sort((a, b) => b.score - a.score);
      
      setMatchedBooks(scored.slice(0, 3));
      setTimeout(() => setStep(4), 400); // slight delay for feel
    } else {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setSelections([]);
    setThomassMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayBooks = thomassMode 
    ? books.filter(b => ["Cloud Cuckoo Land", "I Who Have Never Known Men", "The Berry Pickers"].includes(b.title))
    : matchedBooks;

  return (
    <div className="pb-theme overflow-x-hidden">
      {/* Navbar / Header */}
      <header className="px-6 py-8 md:px-12 md:py-10 border-b border-[var(--pb-border)] flex justify-between items-center">
        <div className="pb-heading text-2xl md:text-3xl font-bold tracking-tight text-[var(--pb-accent-warm)]">
          The Front Table ❧
        </div>
        {step === 4 && (
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-sm font-medium hover:text-[var(--pb-accent-warm)] transition-colors"
          >
            <RefreshCcw size={16} /> Start Over
          </button>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-[70vh]">
        
        {/* Step 0: Hero */}
        {step === 0 && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="pb-heading text-4xl md:text-6xl text-[var(--pb-text)] leading-tight">
              Let's find your next great read.
            </h1>
            <p className="text-lg md:text-xl text-[var(--pb-muted)] leading-relaxed pb-4">
              Welcome to the staff picks table. Tell us what you're craving, and we'll pull three books from the shelves we think you'll love.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-3 bg-[var(--pb-accent-warm)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#a34b29] transition-all transform hover:scale-105 shadow-md"
            >
              <BookOpen size={20} />
              Start Browsing
            </button>
            <div className="pt-12">
              <span className="text-[var(--pb-muted)] text-sm italic">Or, browse the bookseller's favorites:</span>
              <div className="mt-4">
                <button 
                  onClick={() => {
                    setThomassMode(true);
                    setStep(4);
                  }}
                  className="text-[var(--pb-accent-cool)] font-medium underline underline-offset-4 hover:text-[#425a34]"
                >
                  See Thomass's Top Picks
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Steps 1-3: Quiz */}
        {step > 0 && step < 4 && (
          <div className="max-w-3xl mx-auto">
            {/* Shelf Summary */}
            <div className="mb-12 flex flex-wrap gap-3 justify-center items-center min-h-[40px]">
              {selections.map((sel, idx) => (
                <div key={idx} className="bg-[var(--pb-card)] border border-[var(--pb-border)] px-4 py-2 rounded-md shadow-sm flex items-center gap-2 text-sm font-medium">
                  <Check size={14} className="text-[var(--pb-accent-cool)]" />
                  {sel}
                </div>
              ))}
              {selections.length < 3 && (
                <div className="text-[var(--pb-muted)] text-sm italic px-4 py-2 opacity-50 border border-transparent">
                  Waiting for your choice...
                </div>
              )}
            </div>

            <div key={step} className="animate-in fade-in slide-in-from-right-8 duration-500 text-center">
              <h2 className="pb-heading text-3xl md:text-4xl mb-10 text-[var(--pb-text)]">
                {QUESTIONS[step - 1].title}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {QUESTIONS[step - 1].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="px-6 py-3 rounded-full border-2 border-[var(--pb-border)] bg-[var(--pb-card)] text-[var(--pb-text)] hover:border-[var(--pb-accent-warm)] hover:text-[var(--pb-accent-warm)] transition-all font-medium text-lg hover:-translate-y-1"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-16 animate-in fade-in duration-700">
            
            <div className="text-center space-y-4">
              <h2 className="pb-heading text-4xl md:text-5xl text-[var(--pb-text)] relative inline-block">
                {thomassMode ? "Thomass's Staff Picks" : "Your Curated Stack"}
                {!thomassMode && (
                  <div className="absolute -right-8 -top-8 hidden md:block">
                    <div className="pb-stamp">MATCHED</div>
                  </div>
                )}
              </h2>
              <p className="text-lg text-[var(--pb-muted)] max-w-2xl mx-auto italic">
                {thomassMode 
                  ? "A hand-picked selection of favorites. These are the books I press into people's hands."
                  : "Based on your mood, where you find books, and what pulls you in, we pulled these from the shelves."}
              </p>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayBooks.map((book, idx) => (
                <div 
                  key={book.title} 
                  className="pb-card-hover bg-[var(--pb-card)] rounded-3xl overflow-hidden border border-[#E5DAC8] relative group flex flex-col"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="h-3 w-full" style={{ backgroundColor: book.coverColor }}></div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-6">
                      <span className="text-xs uppercase tracking-widest text-[var(--pb-muted)] font-bold mb-2 block">{book.category}</span>
                      <h3 className="pb-heading text-2xl font-bold mb-1 leading-snug">{book.title}</h3>
                      <p className="text-sm italic text-[var(--pb-muted)]">by {book.author}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-grow">
                      <p className="text-sm leading-relaxed"><strong className="font-semibold">The Hook:</strong> {book.readerHook}</p>
                      <p className="text-sm leading-relaxed text-[var(--pb-muted)]"><strong className="font-semibold">How to Position:</strong> {book.positioningAngle}</p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--pb-border)] flex flex-wrap gap-2">
                      {book.moods.slice(0,2).map(m => (
                        <span key={m} className="text-xs bg-[#F2E8D9] text-[#2D2824] px-2 py-1 rounded-sm">{m}</span>
                      ))}
                    </div>
                  </div>
                  <a 
                    href={book.catalogueUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center py-4 bg-[#E5DAC8] text-[#2D2824] font-semibold hover:bg-[var(--pb-accent-warm)] hover:text-white transition-colors"
                  >
                    View in Catalogue →
                  </a>
                </div>
              ))}
            </div>

            {/* Lower Section: Receipt & Insight Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-16 pt-16 border-t border-dashed border-[#C4623A]">
              
              {/* Receipt */}
              <div className="pb-receipt p-8 max-w-sm mx-auto md:mx-0 transform rotate-1">
                <div className="text-center mb-6 space-y-1">
                  <p className="font-bold">THE INDIE BOOKSHOP</p>
                  <p className="text-xs">123 Book Lover's Lane</p>
                  <p className="text-xs">Mon - Sun : 10AM - 6PM</p>
                  <p className="mt-4 mb-4 text-xs">========================</p>
                </div>
                
                {!thomassMode && (
                  <div className="mb-6 space-y-2 text-sm">
                    <p>MOOD: {selections[0]}</p>
                    <p>FOUND VIA: {selections[1]}</p>
                    <p>DRAWN BY: {selections[2]}</p>
                  </div>
                )}
                
                <div className="space-y-4 text-sm">
                  {displayBooks.map(b => (
                    <div key={b.title} className="flex justify-between gap-4">
                      <span className="truncate">{b.title.substring(0, 20).toUpperCase()}</span>
                      <span>*MATCH*</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 space-y-2">
                  <p className="text-xs">========================</p>
                  <p className="font-bold mt-4">HAPPY READING!</p>
                  <div className="flex justify-center mt-4 mb-4">
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-xs hover:bg-gray-800 transition-colors"
                    >
                      <Printer size={14} /> Print Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Applicant Insight */}
              <div className="bg-[var(--pb-card)] p-8 rounded-2xl shadow-sm border border-[#E5DAC8]">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-[var(--pb-accent-warm)]" />
                  <h3 className="pb-heading text-xl font-bold">Behind the Counter</h3>
                </div>
                <p className="text-[var(--pb-muted)] leading-relaxed mb-6">
                  Like a good bookseller, Thomass understands that a book doesn't just need to be good—it needs to find the right hands at the right time. He pairs a deep empathy for readers with a strategic understanding of how stories travel through communities, reviews, and word-of-mouth.
                </p>
                {!thomassMode ? (
                  <button 
                    onClick={() => setThomassMode(true)}
                    className="text-[var(--pb-accent-cool)] font-medium underline underline-offset-4 hover:text-[#425a34]"
                  >
                    View Thomass's personal staff picks
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (selections.length === 3) setThomassMode(false);
                      else reset();
                    }}
                    className="text-[var(--pb-accent-cool)] font-medium underline underline-offset-4 hover:text-[#425a34]"
                  >
                    {selections.length === 3 ? "Return to your curated matches" : "Take the matchmaker quiz"}
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      <footer className="px-6 py-10 text-center text-xs text-[var(--pb-muted)] max-w-4xl mx-auto opacity-70">
        <p>Book covers and catalogue information belong to their respective publishers, authors, artists, and rights holders. This noncommercial prototype was created as a personal application supplement and links back to Penguin Random House Canada catalogue pages.</p>
      </footer>
    </div>
  );
}
