import React, { useState } from 'react';
import './ink-ivory.css';
import penguinLogo from '@assets/image_1779085723877.png';

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

const PACING = [
  "A single feverish weekend",
  "A long slow burn over a month",
  "Short stories I can finish on the train",
  "A doorstopper I want to live inside",
  "A propulsive page-turner",
  "Something I can dip in and out of",
  "A perfectly contained novella",
  "A lush, layered second-read kind of book",
];

const ENDINGS = [
  "Wreck me in the last fifty pages",
  "Leave me with hope, please",
  "A twist I didn't see coming",
  "Quiet and ambiguous — let me sit with it",
  "Earned, satisfying, complete",
  "A perfect closing line I'll memorize",
  "Devastating but inevitable",
  "Open-ended — I want to argue about it",
];

type RawBook = {
  t: string; a: string; cat: string; isbn: string; url: string; cc: string;
  hook: string; pos: string;
  m: number[]; ch: number[]; tr: number[]; pa: number[]; en: number[];
};

// Cover palette used only for the typographic fallback if the live cover fails.
const PALETTE = ["#D4856A", "#C3304B", "#1F3A93", "#1F4D2B", "#E8A23A", "#6B1F1F", "#2E4F3A", "#1B2A4E", "#7C6A52", "#3D5C3A", "#8B3A2E", "#4A4E69", "#A8763E", "#2C4A5E", "#7A2E4A", "#5D4037", "#386641", "#9B2226", "#264653", "#6A4C93"];

// Every book below has been live-verified against the Penguin Random House Canada
// catalogue (page returns the actual book, not the SPA "not found" shell) and the
// cover service returns a valid JPEG for the same ISBN. So title, author, cover
// image, and "View in PRH Catalogue" link always point at the same edition.
const RAW: RawBook[] = [
  { t: "James", a: "Percival Everett", cat: "Fiction", isbn: "9780385550369", url: "https://www.penguinrandomhouse.ca/books/738749/james-by-percival-everett/9780385550369", cc: PALETTE[3],
    hook: "Huckleberry Finn retold from Jim's perspective — fierce, funny, and devastatingly alive.",
    pos: "Lead with literary heft and cultural urgency. This is a book the year revolves around.",
    m: [2,6,5], ch: [2,3,5], tr: [3,1,0], pa: [4,7], en: [4,6] },
  { t: "All Fours", a: "Miranda July", cat: "Fiction", isbn: "9780593190272", url: "https://www.penguinrandomhouse.ca/books/639464/all-fours-by-miranda-july/9780593190272", cc: PALETTE[1],
    hook: "A semi-autobiographical novel about desire, midlife, and a road trip that never quite happens.",
    pos: "Lean into the conversation. This is a book people argue about, recommend, and re-read.",
    m: [1,6,7], ch: [5,2,3], tr: [0,5,3], pa: [0,4], en: [7,3] },
  { t: "Tomorrow, and Tomorrow, and Tomorrow", a: "Gabrielle Zevin", cat: "Fiction", isbn: "9780735243361", url: "https://www.penguinrandomhouse.ca/books/690750/tomorrow-and-tomorrow-and-tomorrow-by-gabrielle-zevin/9780735243361", cc: PALETTE[2],
    hook: "Two friends, thirty years, and the video games they build to find their way back to each other.",
    pos: "Sell the friendship first; the games are the world it's set in, not the hook.",
    m: [0,3,7], ch: [0,4,6], tr: [4,1,6], pa: [1,7], en: [0,6] },
  { t: "Trust", a: "Hernan Diaz", cat: "Fiction", isbn: "9780593420324", url: "https://www.penguinrandomhouse.ca/books/678664/trust-pulitzer-prize-winner-by-hernan-diaz/9780593420324", cc: PALETTE[7],
    hook: "A Pulitzer-winning novel about wealth, narrative, and who gets to tell the story of a fortune.",
    pos: "Sell the structure. Four versions of one story is the irresistible hook.",
    m: [2,5,6], ch: [2,4,5], tr: [3,1,2], pa: [3,7], en: [7,3] },
  { t: "The Secret History", a: "Donna Tartt", cat: "Fiction", isbn: "9781400031702", url: "https://www.penguinrandomhouse.ca/books/176619/the-secret-history-by-donna-tartt/9781400031702", cc: PALETTE[5],
    hook: "A New England college, a tight circle of classics students, and a death they all know about.",
    pos: "Don't argue. Quote the opening paragraph. The book sells itself.",
    m: [6,2,1], ch: [5,1,0], tr: [0,1,6], pa: [3,4], en: [6,5] },
  { t: "Greek Lessons", a: "Han Kang", cat: "Fiction", isbn: "9780593595442", url: "https://www.penguinrandomhouse.ca/books/717358/greek-lessons-by-han-kang/9780593595442", cc: PALETTE[8],
    hook: "A woman losing her voice. A teacher losing his sight. A quiet, devastating love story.",
    pos: "Lead with the author's Nobel stature, then let the silence of the prose speak.",
    m: [1,4,0], ch: [2,4,3], tr: [0,5,2], pa: [6,7], en: [3,5] },
  { t: "Crying in H Mart", a: "Michelle Zauner", cat: "Memoir", isbn: "9781984898951", url: "https://www.penguinrandomhouse.ca/books/612676/crying-in-h-mart-by-michelle-zauner/9781984898951", cc: PALETTE[0],
    hook: "A memoir about grief, Korean American identity, and the way food carries memory.",
    pos: "Lead with voice and emotional precision — readers feel seen from page one.",
    m: [0,4,7], ch: [2,3,0], tr: [4,5,0], pa: [5,6], en: [0,1] },
  { t: "Lessons in Chemistry", a: "Bonnie Garmus", cat: "Fiction", isbn: "9780385697392", url: "https://www.penguinrandomhouse.ca/books/677234/lessons-in-chemistry-by-bonnie-garmus/9780385697392", cc: PALETTE[4],
    hook: "A chemist-turned-reluctant-TV-cook refuses to let the 1960s tell her who she is.",
    pos: "Promise warmth and bite in the same breath. Sell her, not the era.",
    m: [3,6,7], ch: [0,4,6], tr: [1,2,6], pa: [4,1], en: [1,4] },
  { t: "Starlight", a: "Richard Wagamese", cat: "Fiction", isbn: "9780771070877", url: "https://www.penguinrandomhouse.ca/books/575724/starlight-by-richard-wagamese/9780771070877", cc: PALETTE[6],
    hook: "The unfinished final novel from one of Canada's most beloved Indigenous writers — luminous, tender, alive.",
    pos: "Honour Wagamese's voice and legacy. Let the writing do the lifting.",
    m: [0,3,4], ch: [1,4,2], tr: [4,5,0], pa: [6,7], en: [3,5] },
  { t: "Medicine Walk", a: "Richard Wagamese", cat: "Fiction", isbn: "9780771089213", url: "https://www.penguinrandomhouse.ca/books/226075/medicine-walk-by-richard-wagamese/9780771089213", cc: PALETTE[9],
    hook: "A son walks his estranged father into the bush to die — and learns who he is along the way.",
    pos: "A modern Canadian classic. Hand it to anyone who loved Cormac McCarthy or Louise Erdrich.",
    m: [0,4,5], ch: [1,4,2], tr: [5,0,4], pa: [1,4], en: [4,6] },
  { t: "Intermezzo", a: "Sally Rooney", cat: "Fiction", isbn: "9780735281844", url: "https://www.penguinrandomhouse.ca/books/667030/intermezzo-by-sally-rooney/9780735281844", cc: PALETTE[10],
    hook: "Two brothers, grief, chess, and the messy women they love.",
    pos: "Rooney's longest, most ambitious novel yet. Lead with the brothers.",
    m: [0,2,7], ch: [2,4,5], tr: [3,5,0], pa: [3,1], en: [3,4] },
  { t: "Normal People", a: "Sally Rooney", cat: "Fiction", isbn: "9781984843333", url: "https://www.penguinrandomhouse.ca/books/592625/normal-people-by-sally-rooney/9781984843333", cc: PALETTE[11],
    hook: "Marianne and Connell, drawn together and apart, through school and beyond.",
    pos: "The book that made a generation read literary fiction again. Trust the obsession.",
    m: [0,7,4], ch: [0,5,4], tr: [6,4,1], pa: [4,0], en: [3,0] },
  { t: "Never Let Me Go", a: "Kazuo Ishiguro", cat: "Fiction", isbn: "9780307400994", url: "https://www.penguinrandomhouse.ca/books/580373/never-let-me-go-by-kazuo-ishiguro/9780307400994", cc: PALETTE[12],
    hook: "A boarding school. A terrible secret. A love story that quietly breaks you.",
    pos: "Don't spoil the premise. Just promise readers they'll never forget it.",
    m: [0,1,2], ch: [2,4,5], tr: [1,6,4], pa: [4,7], en: [6,0] },
  { t: "On Earth We're Briefly Gorgeous", a: "Ocean Vuong", cat: "Fiction", isbn: "9780525562047", url: "https://www.penguinrandomhouse.ca/books/600633/on-earth-were-briefly-gorgeous-by-ocean-vuong/9780525562047", cc: PALETTE[13],
    hook: "A letter from a son to his illiterate mother — a poet writing in prose that aches.",
    pos: "Quote a sentence. Just one. That's the whole pitch.",
    m: [4,0,2], ch: [2,3,4], tr: [0,5,4], pa: [6,7], en: [5,3] },
  { t: "Long Island", a: "Colm Tóibín", cat: "Fiction", isbn: "9780771012297", url: "https://www.penguinrandomhouse.ca/books/742492/long-island-by-colm-toibin/9780771012297", cc: PALETTE[14],
    hook: "Eilis Lacey is back, twenty years after Brooklyn, and her life is about to crack open.",
    pos: "You don't need to have read Brooklyn — but readers who did will pre-order on sight.",
    m: [4,5,3], ch: [2,4,1], tr: [6,5,1], pa: [6,7], en: [4,3] },
  { t: "The Marriage Portrait", a: "Maggie O'Farrell", cat: "Fiction", isbn: "9781039005655", url: "https://www.penguinrandomhouse.ca/books/727008/the-marriage-portrait-by-maggie-ofarrell/9781039005655", cc: PALETTE[15],
    hook: "Renaissance Italy, a teenage duchess, and the painting she fears will outlive her.",
    pos: "Sumptuous historical fiction with a thriller's pulse. Sell the dress and the dread together.",
    m: [5,0,6], ch: [1,4,0], tr: [1,2,6], pa: [1,7], en: [6,4] },
  { t: "North Woods", a: "Daniel Mason", cat: "Fiction", isbn: "9780593597040", url: "https://www.penguinrandomhouse.ca/books/726262/north-woods-by-daniel-mason/9780593597040", cc: PALETTE[16],
    hook: "A single house in Western Massachusetts, centuries of inhabitants — human and otherwise.",
    pos: "Structurally inventive, deeply tender. Compare to Cloud Atlas with leaves in the wind.",
    m: [5,1,2], ch: [2,4,1], tr: [1,3,5], pa: [2,7], en: [4,3] },
  { t: "Martyr!", a: "Kaveh Akbar", cat: "Fiction", isbn: "9780593537619", url: "https://www.penguinrandomhouse.ca/books/734476/martyr-by-kaveh-akbar/9780593537619", cc: PALETTE[17],
    hook: "A poet's debut novel about addiction, art, martyrdom, and the search for a meaningful death.",
    pos: "Built on essays, debate, and stunned reviews. This is a writer's book that reads like a thriller.",
    m: [4,6,2], ch: [2,3,4], tr: [0,5,3], pa: [4,0], en: [7,3] },
  { t: "The Heaven & Earth Grocery Store", a: "James McBride", cat: "Fiction", isbn: "9780593422946", url: "https://www.penguinrandomhouse.ca/books/691602/the-heaven-and-earth-grocery-store-by-james-mcbride/9780593422946", cc: PALETTE[18],
    hook: "A Pottstown neighbourhood in the 1920s, where Jewish and Black residents are bound together by a secret.",
    pos: "Big-hearted and propulsive. Frame it as a great American novel that handsells itself.",
    m: [3,5,7], ch: [1,0,4], tr: [6,1,3], pa: [4,1], en: [1,4] },
  { t: "Real Americans", a: "Rachel Khong", cat: "Fiction", isbn: "9780593862766", url: "https://www.penguinrandomhouse.ca/books/725682/real-americans-by-rachel-khong/9780593862766", cc: PALETTE[19],
    hook: "Three generations of a Chinese American family wrestle with identity, science, and inheritance.",
    pos: "A sweeping family saga that doesn't read like one. Sell the structure and the secrets.",
    m: [5,0,7], ch: [4,2,5], tr: [1,6,3], pa: [2,3], en: [4,6] },
  { t: "Wandering Stars", a: "Tommy Orange", cat: "Fiction", isbn: "9780771050367", url: "https://www.penguinrandomhouse.ca/books/656310/wandering-stars-by-tommy-orange/9780771050367", cc: PALETTE[0],
    hook: "A sequel to There There that reaches back centuries and forward into trauma's inheritance.",
    pos: "Frame it as essential American literature — and a standalone for new readers.",
    m: [4,0,5], ch: [2,3,4], tr: [5,3,6], pa: [2,7], en: [6,4] },
  { t: "There There", a: "Tommy Orange", cat: "Fiction", isbn: "9780525635574", url: "https://www.penguinrandomhouse.ca/books/563403/there-there-by-tommy-orange/9780525635574", cc: PALETTE[1],
    hook: "Twelve Native Americans converging on the Big Oakland Powwow — and the day everything detonates.",
    pos: "The debut that rewrote what contemporary Native American fiction could do.",
    m: [4,6,2], ch: [5,2,0], tr: [5,3,0], pa: [4,2], en: [6,7] },
  { t: "Headshot", a: "Rita Bullwinkel", cat: "Fiction", isbn: "9780593654125", url: "https://www.penguinrandomhouse.ca/books/723031/headshot-by-rita-bullwinkel/9780593654125", cc: PALETTE[2],
    hook: "Eight teenage girl boxers, two days, one tournament in Reno. Sentence-level fireworks.",
    pos: "Lead with the prose. This is a stylist's novel about violence and ambition.",
    m: [6,4,2], ch: [2,4,5], tr: [1,3,0], pa: [2,6], en: [3,7] },
  { t: "Blue Sisters", a: "Coco Mellors", cat: "Fiction", isbn: "9780593723760", url: "https://www.penguinrandomhouse.ca/books/735553/blue-sisters-by-coco-mellors/9780593723760", cc: PALETTE[3],
    hook: "Three sisters reunite after the death of their fourth — and their grief makes a mess of everything.",
    pos: "Booksellers loved Cleopatra & Frankenstein. This is the book they hand the same reader next.",
    m: [0,7,3], ch: [0,1,4], tr: [4,1,6], pa: [2,4], en: [0,1] },
  { t: "Know My Name", a: "Chanel Miller", cat: "Memoir", isbn: "9780735223721", url: "https://www.penguinrandomhouse.ca/books/553663/know-my-name-by-chanel-miller/9780735223721", cc: PALETTE[4],
    hook: "Chanel Miller reclaims her name and her story after the Stanford assault case.",
    pos: "An act of recovery written like literature. Frame it as essential, not heavy.",
    m: [0,6,7], ch: [2,3,4], tr: [4,5,3], pa: [4,5], en: [6,4] },
  { t: "The Year of Magical Thinking", a: "Joan Didion", cat: "Memoir", isbn: "9780307386410", url: "https://www.penguinrandomhouse.ca/books/40772/the-year-of-magical-thinking-by-joan-didion/9780307386410", cc: PALETTE[5],
    hook: "Didion's account of the year after her husband's sudden death. Spare, ruthless, indispensable.",
    pos: "The book people press into the hands of anyone grieving. Position it as a gift.",
    m: [0,2,4], ch: [2,4,1], tr: [5,0,4], pa: [6,5], en: [3,5] },
  { t: "H is for Hawk", a: "Helen Macdonald", cat: "Non-Fiction", isbn: "9780143194675", url: "https://www.penguinrandomhouse.ca/books/417558/h-is-for-hawk-by-helen-macdonald/9780143194675", cc: PALETTE[6],
    hook: "Grieving her father, Helen Macdonald trains a goshawk — and the bird trains her.",
    pos: "Nature writing crossed with memoir crossed with literary criticism. Quietly transformational.",
    m: [4,3,1], ch: [2,4,1], tr: [5,1,0], pa: [5,6], en: [3,1] },
  { t: "In the Dream House", a: "Carmen Maria Machado", cat: "Memoir", isbn: "9780771094507", url: "https://www.penguinrandomhouse.ca/books/602561/in-the-dream-house-by-carmen-maria-machado/9780771094507", cc: PALETTE[7],
    hook: "A memoir of an abusive relationship told through every genre the author can summon.",
    pos: "Formally radical, emotionally devastating. Lead with the structure as a hook, not a warning.",
    m: [1,6,4], ch: [2,5,4], tr: [0,1,5], pa: [2,5], en: [7,3] },
  { t: "The Marrow Thieves", a: "Cherie Dimaline", cat: "Speculative", isbn: "9781774885475", url: "https://www.penguinrandomhouse.ca/books/744474/the-marrow-thieves-by-cherie-dimaline/9781774885475", cc: PALETTE[8],
    hook: "A near-future Canada where Indigenous people are hunted for the marrow that holds dreams.",
    pos: "YA-readable, adult-resonant. A modern Canadian classic with the urgency of a thriller.",
    m: [5,0,6], ch: [4,5,1], tr: [1,6,3], pa: [4,1], en: [1,4] },
  { t: "Empire of Wild", a: "Cherie Dimaline", cat: "Fiction", isbn: "9780735277205", url: "https://www.penguinrandomhouse.ca/books/600423/empire-of-wild-by-cherie-dimaline/9780735277205", cc: PALETTE[9],
    hook: "A Métis woman searching for her vanished husband finds him preaching at a revival tent — and not himself.",
    pos: "Rougarou folklore meets contemporary thriller. Sell the wildness.",
    m: [1,6,5], ch: [1,4,5], tr: [1,2,5], pa: [4,1], en: [2,4] },
  { t: "The Strangers", a: "Katherena Vermette", cat: "Fiction", isbn: "9780735239630", url: "https://www.penguinrandomhouse.ca/books/624145/the-strangers-by-katherena-vermette/9780735239630", cc: PALETTE[10],
    hook: "Four generations of Métis women, each one carrying the others.",
    pos: "Bookseller-favourite Canadian fiction. Frame it as essential reading on family and survival.",
    m: [0,4,2], ch: [4,1,2], tr: [5,0,4], pa: [5,7], en: [6,3] },
  { t: "The Handmaid's Tale", a: "Margaret Atwood", cat: "Classic", isbn: "9780771008795", url: "https://www.penguinrandomhouse.ca/books/6125/the-handmaids-tale-by-margaret-atwood/9780771008795", cc: PALETTE[11],
    hook: "Offred lives in Gilead, where her body is not her own.",
    pos: "Still the dystopian benchmark. Sell its renewed urgency, not its TV halo.",
    m: [5,6,2], ch: [0,1,5], tr: [1,6,3], pa: [4,1], en: [6,0] },
  { t: "The Testaments", a: "Margaret Atwood", cat: "Fiction", isbn: "9780771009457", url: "https://www.penguinrandomhouse.ca/books/566433/the-testaments-by-margaret-atwood/9780771009457", cc: PALETTE[12],
    hook: "Gilead, fifteen years on, told by three women — including Aunt Lydia.",
    pos: "Booker winner. Sell the propulsive plotting; this is faster than the original.",
    m: [5,6,7], ch: [4,2,5], tr: [6,3,1], pa: [4,1], en: [4,2] },
  { t: "Alias Grace", a: "Margaret Atwood", cat: "Fiction", isbn: "9780771008825", url: "https://www.penguinrandomhouse.ca/books/6090/alias-grace-by-margaret-atwood/9780771008825", cc: PALETTE[13],
    hook: "A Victorian Canadian murderess. A doctor who doesn't know what to believe. A confession that won't settle.",
    pos: "True-crime obsessives, historical fiction readers, Atwood completists — three audiences, one book.",
    m: [1,6,4], ch: [1,4,2], tr: [1,5,6], pa: [3,5], en: [3,7] },
  { t: "Beloved", a: "Toni Morrison", cat: "Classic", isbn: "9780307264886", url: "https://www.penguinrandomhouse.ca/books/117647/beloved-by-toni-morrison/9780307264886", cc: PALETTE[14],
    hook: "A formerly enslaved mother in Ohio, the daughter she lost, and the ghost that won't leave.",
    pos: "Pulitzer Prize. Position as essential reading; let the reverence do the work.",
    m: [0,5,4], ch: [2,1,4], tr: [3,6,5], pa: [3,7], en: [6,5] },
  { t: "Song of Solomon", a: "Toni Morrison", cat: "Classic", isbn: "9780679445043", url: "https://www.penguinrandomhouse.ca/books/117657/song-of-solomon-by-toni-morrison/9780679445043", cc: PALETTE[15],
    hook: "Macon 'Milkman' Dead III searches for gold and finds his family's mythic past instead.",
    pos: "Morrison's most accessible novel. Recommend to first-time Morrison readers.",
    m: [5,4,2], ch: [2,1,4], tr: [5,6,3], pa: [3,7], en: [4,3] },
  { t: "The Thursday Murder Club", a: "Richard Osman", cat: "Mystery", isbn: "9781984880987", url: "https://www.penguinrandomhouse.ca/books/633983/the-thursday-murder-club-by-richard-osman/9781984880987", cc: PALETTE[16],
    hook: "Four retirees in a posh care home investigate cold cases — until a real murder lands in their laps.",
    pos: "Cozy mystery that crossed over to literary readers. Lead with the wit.",
    m: [3,7,6], ch: [0,4,6], tr: [1,6,2], pa: [4,5], en: [2,4] },
  { t: "We Solve Murders", a: "Richard Osman", cat: "Mystery", isbn: "9780593653241", url: "https://www.penguinrandomhouse.ca/books/719827/we-solve-murders-by-richard-osman/9780593653241", cc: PALETTE[17],
    hook: "Osman launches a new series — a globe-trotting father-in-law and his bodyguard daughter-in-law.",
    pos: "For readers who finished the Thursday Murder Club books and want more — and for new readers entirely.",
    m: [3,6,7], ch: [0,1,4], tr: [6,1,5], pa: [4,0], en: [2,4] },
  { t: "The Maid", a: "Nita Prose", cat: "Mystery", isbn: "9780735241336", url: "https://www.penguinrandomhouse.ca/books/803557/the-maid-by-nita-prose/9780735241336", cc: PALETTE[18],
    hook: "Molly the hotel maid loves order — until she finds a guest dead in his suite and becomes the prime suspect.",
    pos: "Cozy mystery with a neurodivergent narrator readers fall for. Frame as warm-hearted.",
    m: [3,7,6], ch: [0,1,5], tr: [1,6,2], pa: [4,0], en: [2,1] },
  { t: "Funny Story", a: "Emily Henry", cat: "Romance", isbn: "9780593441282", url: "https://www.penguinrandomhouse.ca/books/704945/funny-story-by-emily-henry/9780593441282", cc: PALETTE[19],
    hook: "Daphne and Miles, dumped by people who ran off together, become roommates. Then more.",
    pos: "Henry's best comp for new readers. Sell the banter and the lake-town vibe.",
    m: [3,7,0], ch: [0,5,4], tr: [6,2,1], pa: [0,4], en: [1,4] },
  { t: "Beach Read", a: "Emily Henry", cat: "Romance", isbn: "9781984806734", url: "https://www.penguinrandomhouse.ca/books/608898/beach-read-by-emily-henry/9781984806734", cc: PALETTE[0],
    hook: "A romance novelist and a literary fiction writer swap genres for a summer.",
    pos: "The book that made romance respectable for skeptical literary readers.",
    m: [3,7,0], ch: [0,5,4], tr: [6,2,1], pa: [0,4], en: [1,4] },
  { t: "Happy Place", a: "Emily Henry", cat: "Romance", isbn: "9780593441190", url: "https://www.penguinrandomhouse.ca/books/704944/happy-place-by-emily-henry/9780593441190", cc: PALETTE[1],
    hook: "Exes pretending to still be engaged for one last friend group trip to Maine. It hurts. It heals.",
    pos: "Henry's most emotional. Sell the friend group as much as the romance.",
    m: [3,0,7], ch: [0,5,1], tr: [6,2,4], pa: [0,4], en: [1,4] },
  { t: "Book Lovers", a: "Emily Henry", cat: "Romance", isbn: "9780593440872", url: "https://www.penguinrandomhouse.ca/books/670293/book-lovers-by-emily-henry/9780593440872", cc: PALETTE[2],
    hook: "A cutthroat literary agent and a brooding editor keep running into each other in a small town.",
    pos: "Meta about the publishing world — booksellers love handselling this one.",
    m: [3,7,4], ch: [0,5,1], tr: [6,2,1], pa: [0,4], en: [1,4] },
  { t: "Project Hail Mary", a: "Andy Weir", cat: "Sci-Fi", isbn: "9780593135228", url: "https://www.penguinrandomhouse.ca/books/611060/project-hail-mary-by-andy-weir/9780593135228", cc: PALETTE[3],
    hook: "An astronaut wakes up alone in deep space with no memory of why. Then he meets... someone.",
    pos: "The gateway sci-fi book for non-sci-fi readers. Don't spoil the second character.",
    m: [5,2,7], ch: [0,5,6], tr: [1,3,6], pa: [4,0], en: [1,4] },
  { t: "Mexican Gothic", a: "Silvia Moreno-Garcia", cat: "Horror", isbn: "9780525620785", url: "https://www.penguinrandomhouse.ca/books/577068/mexican-gothic-by-silvia-moreno-garcia/9780525620785", cc: PALETTE[4],
    hook: "1950s Mexico. A glamorous socialite is summoned to a moldering English manor — and what she finds is worse than rumour.",
    pos: "Gothic horror that crossed into book-club territory. Lead with the cover.",
    m: [1,6,4], ch: [5,6,1], tr: [2,1,6], pa: [4,0], en: [2,6] },
  { t: "Gods of Jade and Shadow", a: "Silvia Moreno-Garcia", cat: "Fantasy", isbn: "9780525620778", url: "https://www.penguinrandomhouse.ca/books/577066/gods-of-jade-and-shadow-by-silvia-moreno-garcia/9780525620778", cc: PALETTE[5],
    hook: "Jazz-age Mexico. A young woman accidentally frees a Mayan death god — and gets dragged into the underworld.",
    pos: "Mythic fantasy with romance bones. Sell the era and the goddess.",
    m: [1,5,4], ch: [5,6,4], tr: [2,1,5], pa: [4,7], en: [4,1] },
  { t: "Bunny", a: "Mona Awad", cat: "Horror", isbn: "9780735235908", url: "https://www.penguinrandomhouse.ca/books/576726/bunny-by-mona-awad/9780735235908", cc: PALETTE[6],
    hook: "An MFA loner gets pulled into a clique of pastel sweethearts who call each other 'Bunny.' Then it gets weird.",
    pos: "Cult favourite. Lean into the strangeness; this isn't for everyone, but it's everything for some.",
    m: [1,6,7], ch: [5,6,4], tr: [0,1,2], pa: [0,4], en: [7,2] },
  { t: "Rouge", a: "Mona Awad", cat: "Horror", isbn: "9780735241237", url: "https://www.penguinrandomhouse.ca/books/670048/rouge-by-mona-awad/9780735241237", cc: PALETTE[7],
    hook: "A skincare-obsessed woman investigates her mother's mysterious death — and the cult-like spa behind it.",
    pos: "Fairy-tale horror about beauty, mirrors, and inheritance. Booktok loved it.",
    m: [1,6,4], ch: [5,6,4], tr: [2,1,0], pa: [0,4], en: [7,2] },
  { t: "Hummingbird Salamander", a: "Jeff VanderMeer", cat: "Sci-Fi", isbn: "9780771094897", url: "https://www.penguinrandomhouse.ca/books/605165/hummingbird-salamander-by-jeff-vandermeer/9780771094897", cc: PALETTE[8],
    hook: "A security analyst receives an envelope from a dead eco-terrorist. Inside: a taxidermied hummingbird.",
    pos: "Eco-thriller with VanderMeer's signature unease. For Annihilation fans and newcomers alike.",
    m: [1,6,2], ch: [5,6,4], tr: [1,3,0], pa: [0,4], en: [3,7] },
  { t: "Eleanor Oliphant Is Completely Fine", a: "Gail Honeyman", cat: "Fiction", isbn: "9780143199113", url: "https://www.penguinrandomhouse.ca/books/540586/eleanor-oliphant-is-completely-fine-by-gail-honeyman/9780143199113", cc: PALETTE[9],
    hook: "Eleanor's life is small, ordered, and lonely — until an act of kindness cracks it open.",
    pos: "The handsell that won't quit. Sell Eleanor's voice and the slow reveal.",
    m: [3,0,7], ch: [0,4,6], tr: [1,6,4], pa: [4,5], en: [1,4] },
];

type Book = RawBook & { moods: string[]; channels: string[]; triggers: string[]; pacing: string[]; endings: string[] };

const books: Book[] = RAW.map(b => ({
  ...b,
  moods: b.m.map(i => MOODS[i]),
  channels: b.ch.map(i => CHANNELS[i]),
  triggers: b.tr.map(i => TRIGGERS[i]),
  pacing: b.pa.map(i => PACING[i]),
  endings: b.en.map(i => ENDINGS[i]),
}));

const coverFor = (isbn: string) => `https://images.randomhouse.com/cover/${isbn}`;

const QUESTIONS = [
  { eyebrow: "Vol. I — The Mood", title: "What kind of reading night is this?", subtitle: "Pick the one that's loudest right now. There are no wrong answers, only honest ones.", options: MOODS, receiptLabel: "MOOD" },
  { eyebrow: "Vol. II — The Pacing", title: "How much time do you have for this one?", subtitle: "Length and tempo matter as much as subject. Be honest about your attention.", options: PACING, receiptLabel: "PACE" },
  { eyebrow: "Vol. III — The Channel", title: "Where do you actually trust your next book to come from?", subtitle: "The algorithm is one option. So is the friend who never steers you wrong.", options: CHANNELS, receiptLabel: "CHAN" },
  { eyebrow: "Vol. IV — The Spark", title: "What gets a book onto your stack?", subtitle: "The thing that makes you stop scrolling, pick it up, and walk to the counter.", options: TRIGGERS, receiptLabel: "SPARK" },
  { eyebrow: "Vol. V — The Ending", title: "How do you want this book to land?", subtitle: "The last paragraph is the bargain. Tell us what kind of bargain you're here for.", options: ENDINGS, receiptLabel: "ENDS" },
];

const THOMAS_FAVORITES = ["James", "Tomorrow, and Tomorrow, and Tomorrow", "Crying in H Mart"];

// Deterministic string hash so the same selections produce the same tie-breaker
// order, but different selections shuffle ties — giving every answer combination
// its own flavour of variety.
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function InkIvory() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [thomasMode, setThomasMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option: string) => {
    const next = [...selections];
    next[step - 1] = option;
    setSelections(next);
    const nextStep = step + 1;
    if (nextStep > QUESTIONS.length) {
      setIsLoading(true);
      window.setTimeout(() => {
        setStep(nextStep);
        setIsLoading(false);
      }, 1800);
    } else {
      setStep(nextStep);
    }
  };

  const getMatchedBooks = () => {
    if (thomasMode) {
      const favs = books.filter(b => THOMAS_FAVORITES.includes(b.t));
      return { books: favs, isClosest: false };
    }
    const [mood, pace, channel, trigger, ending] = selections;
    const seed = selections.join('|');
    const scored = books.map(book => {
      let score = 0;
      if (mood && book.moods.includes(mood)) score++;
      if (pace && book.pacing.includes(pace)) score++;
      if (channel && book.channels.includes(channel)) score++;
      if (trigger && book.triggers.includes(trigger)) score++;
      if (ending && book.endings.includes(ending)) score++;
      return { book, score, tie: hashStr(book.isbn + '|' + seed) };
    });
    scored.sort((a, b) => b.score - a.score || a.tie - b.tie);
    const top = scored.slice(0, 3).map(s => s.book);
    const isClosest = scored[0].score < 3;
    return { books: top, isClosest };
  };

  const { books: matchedBooks, isClosest } = getMatchedBooks();

  const getMatchInfo = (book: Book) => {
    const [mood, pace, channel, trigger, ending] = selections;
    return [
      { label: 'Mood', value: mood, matched: !!mood && book.moods.includes(mood) },
      { label: 'Pace', value: pace, matched: !!pace && book.pacing.includes(pace) },
      { label: 'Channel', value: channel, matched: !!channel && book.channels.includes(channel) },
      { label: 'Spark', value: trigger, matched: !!trigger && book.triggers.includes(trigger) },
      { label: 'Ending', value: ending, matched: !!ending && book.endings.includes(ending) },
    ];
  };

  const formatList = (items: string[]) => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0].toLowerCase();
    if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`;
    return `${items.slice(0, -1).map(i => i.toLowerCase()).join(', ')}, and ${items[items.length - 1].toLowerCase()}`;
  };

  const matchSentence = (info: ReturnType<typeof getMatchInfo>) => {
    const matched = info.filter(i => i.matched).map(i => i.label);
    const missed = info.filter(i => !i.matched).map(i => i.label);
    if (matched.length === info.length) return 'A clean alignment across every input you gave us.';
    if (matched.length === 0) return 'A curatorial wildcard — nothing matched on paper, but the shelf wanted you to see it.';
    const lead = matched.length >= 3 ? 'Matched your' : 'Closest in the catalogue — caught your';
    return `${lead} ${formatList(matched)}; quietly missed your ${formatList(missed)}.`;
  };

  const reset = () => {
    setStep(0);
    setSelections([]);
    setThomasMode(false);
    setIsLoading(false);
  };

  const printReceipt = () => window.print();

  return (
    <div className="ink-ivory-container ink-ivory-theme">
      {isLoading && (
        <div className="penguin-loader-overlay" role="status" aria-label="Consulting the archives">
          <div className="penguin-loader-stack">
            <div className="penguin-loader-ring" aria-hidden="true"></div>
            <img src={penguinLogo} alt="" className="penguin-loader-mark" />
          </div>
          <div className="penguin-loader-caption font-mono text-xs uppercase tracking-[0.4em]">
            Consulting the Archives<span className="penguin-loader-dots" aria-hidden="true"></span>
          </div>
        </div>
      )}
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
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl font-light">
              An archival approach to finding your next unforgettable read. Five questions, a verified library of Penguin Random House Canada titles, and a trio shaped by your particular appetites.
            </p>
            <p className="text-sm text-[var(--text-secondary)] font-mono uppercase tracking-widest mb-12 opacity-70">
              {books.length} titles in the collection · 5-volume inquiry
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
                  <span className="px-3 py-1 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] text-xs">{QUESTIONS[idx].receiptLabel}: {sel}</span>
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
                      ? "No book in the verified catalogue matched three or more of your inputs — showing the closest catalogue matches."
                      : "Curated from a verified PRH Canada library, shaped by your specific inclinations and literary appetites."}
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
              {matchedBooks.map((book, idx) => {
                const info = thomasMode ? null : getMatchInfo(book);
                return (
                <div key={book.t} className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--text-secondary)] transition-colors duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
                    <span className="font-mono text-xs uppercase tracking-widest bg-[var(--bg-color)] border border-[var(--border-color)] px-2 py-1">{book.cat}</span>
                    <span className="font-serif text-[var(--text-secondary)] italic">No. 0{idx + 1}</span>
                  </div>
                  <div className="cover-stage h-80 mx-6 mt-6 mb-4 relative flex items-end justify-center">
                    <div className="cover-fallback absolute inset-0 flex flex-col justify-between p-5 text-[#F5F0E8] border border-[var(--border-color)]" style={{ backgroundColor: book.cc }}>
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">{book.cat}</span>
                      <div>
                        <div className="font-serif text-2xl leading-tight mb-2">{book.t}</div>
                        <div className="font-light text-xs opacity-90">{book.a}</div>
                      </div>
                    </div>
                    <img
                      src={coverFor(book.isbn)}
                      alt={`Cover of ${book.t} by ${book.a}`}
                      loading="lazy"
                      className="cover-img relative z-10 max-h-full max-w-full object-contain"
                      onLoad={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        const fb = img.previousElementSibling as HTMLElement | null;
                        if (fb && fb.classList.contains('cover-fallback')) fb.style.display = 'none';
                        img.classList.add('cover-img-loaded');
                      }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70 backdrop-blur-sm">
                      <a href={book.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#F5F0E8] font-serif text-lg text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-black transition-colors">View Catalogue</a>
                    </div>
                  </div>
                  <div className="px-6 pb-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-3xl mb-2 leading-tight">{book.t}</h3>
                    <p className="text-[var(--text-secondary)] mb-6 tracking-wide font-light">{book.a}</p>
                    <div className="space-y-6 mb-6">
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">The Hook</div>
                        <p className="text-sm font-light leading-relaxed">{book.hook}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">Positioning</div>
                        <p className="text-sm font-light leading-relaxed">{book.pos}</p>
                      </div>
                      {info && (
                        <div>
                          <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2 border-b border-[var(--border-color)] pb-1">Why This Book</div>
                          <p className="text-sm font-light italic leading-relaxed mb-3">{matchSentence(info)}</p>
                          <div className="flex flex-wrap gap-2">
                            {info.map(i => (
                              <span
                                key={i.label}
                                title={i.value ? `${i.label}: ${i.value}` : i.label}
                                className={
                                  i.matched
                                    ? 'px-2 py-0.5 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-[10px] font-mono uppercase tracking-widest'
                                    : 'px-2 py-0.5 border border-dashed border-[var(--border-color)] text-[var(--text-secondary)] opacity-50 text-[10px] font-mono uppercase tracking-widest line-through'
                                }
                              >
                                {i.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border-color)] space-y-3">
                      <a
                        href={book.url}
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
                );
              })}
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
                    {!thomasMode && selections.length === QUESTIONS.length ? (
                      <ul className="font-mono text-xs space-y-1 ml-2">
                        {QUESTIONS.map((q, i) => (
                          <li key={q.receiptLabel}>&gt; {q.receiptLabel}: {selections[i]}</li>
                        ))}
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
                        <li key={b.t} className="leading-tight">
                          <div className="font-bold">{b.t}</div>
                          <div>by {b.a}</div>
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
