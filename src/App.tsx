import { useMemo, useState } from "react";

type View = "landing" | "discover" | "detail" | "shelf" | "log";

type Fragrance = {
  name: string;
  house: string;
  year: string;
  concentration: string;
  family: string;
  image: string;
  top: string;
  mid: string;
  base: string;
  wornToday?: boolean;
};

const fragrances: Fragrance[] = [
  {
    name: "Bois d'Ambre",
    house: "Maison Orphée",
    year: "2022",
    concentration: "Eau de parfum",
    family: "Amber / Woody",
    image:
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?auto=format&fit=crop&w=1000&q=88",
    top: "Bergamot, saffron",
    mid: "Cedar, orris",
    base: "Amber, labdanum",
    wornToday: true,
  },
  {
    name: "Nuit No. 04",
    house: "Atelier Vesper",
    year: "2020",
    concentration: "Extrait de parfum",
    family: "Floral / Smoky",
    image:
      "https://images.unsplash.com/photo-1617661338085-d1ec6a89a6d8?auto=format&fit=crop&w=1000&q=88",
    top: "Pink pepper, aldehydes",
    mid: "Iris, rose, incense",
    base: "Musk, birch tar",
  },
  {
    name: "Santal Brûlé",
    house: "Parfums d'Arles",
    year: "2024",
    concentration: "Eau de parfum",
    family: "Woody / Spiced",
    image:
      "https://images.unsplash.com/photo-1627823569857-4d8581dc62b2?auto=format&fit=crop&w=1000&q=88",
    top: "Cardamom, ginger",
    mid: "Sandalwood, saffron",
    base: "Guaiac wood, vanilla",
    wornToday: true,
  },
  {
    name: "Velours Noir",
    house: "Obscura",
    year: "2019",
    concentration: "Parfum",
    family: "Leather / Floral",
    image:
      "https://images.unsplash.com/photo-1761329842950-f3551938e4da?auto=format&fit=crop&w=1000&q=88",
    top: "Damask rose, clove",
    mid: "Suede, patchouli",
    base: "Oud, benzoin",
  },
  {
    name: "Après Minuit",
    house: "Maison Orphée",
    year: "2023",
    concentration: "Eau de parfum",
    family: "Citrus / Aromatic",
    image:
      "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?auto=format&fit=crop&w=1000&q=88",
    top: "Bergamot, petitgrain",
    mid: "Black tea, lavender",
    base: "Vetiver, white musk",
  },
  {
    name: "Tabac Clair",
    house: "Studio Sillage",
    year: "2021",
    concentration: "Extrait de parfum",
    family: "Amber / Tobacco",
    image:
      "https://images.unsplash.com/photo-1661625079424-dc3870671f24?auto=format&fit=crop&w=1000&q=88",
    top: "Hay, coriander",
    mid: "Blond tobacco, honey",
    base: "Tonka, oak",
  },
];

const wearLog = [
  { date: "28 May · 08:15", fragrance: fragrances[0] },
  { date: "27 May · 18:40", fragrance: fragrances[2] },
  { date: "25 May · 09:10", fragrance: fragrances[4] },
  { date: "23 May · 19:30", fragrance: fragrances[1] },
  { date: "20 May · 07:55", fragrance: fragrances[5] },
  { date: "17 May · 20:05", fragrance: fragrances[3] },
];

function Wordmark({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`wordmark ${light ? "wordmark--light" : ""}`}
      onClick={onClick}
      aria-label="Sillage, return home"
    >
      SILLAGE
    </button>
  );
}

function AppHeader({
  active,
  onNavigate,
}: {
  active?: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <header className="discover-nav">
      <Wordmark onClick={() => onNavigate("landing")} />
      <nav aria-label="Primary navigation">
        <button
          className={active === "discover" ? "active" : ""}
          onClick={() => onNavigate("discover")}
        >
          Discover
        </button>
        <button
          className={active === "shelf" ? "active" : ""}
          onClick={() => onNavigate("shelf")}
        >
          Shelf
        </button>
        <button
          className={active === "log" ? "active" : ""}
          onClick={() => onNavigate("log")}
        >
          Wear log
        </button>
      </nav>
      <button className="bag" onClick={() => onNavigate("shelf")}>
        Saved <span>12</span>
      </button>
    </header>
  );
}

function ProductImage({
  fragrance,
  index,
  label,
}: {
  fragrance: Fragrance;
  index?: number;
  label?: string;
}) {
  return (
    <div className="fragrance-image">
      {label ? (
        <span className="worn-label">{label}</span>
      ) : (
        <span>{String((index ?? 0) + 1).padStart(2, "0")}</span>
      )}
      <img
        src={fragrance.image}
        alt={`${fragrance.name} fragrance bottle`}
      />
    </div>
  );
}

function FragranceGrid({
  items,
  shelf = false,
  onSelect,
}: {
  items: Fragrance[];
  shelf?: boolean;
  onSelect: (fragrance: Fragrance) => void;
}) {
  return (
    <section className="fragrance-grid" aria-live="polite">
      {items.map((fragrance, index) => (
        <article
          className="fragrance-card"
          key={fragrance.name}
          onClick={() => onSelect(fragrance)}
        >
          <button
            className="product-button"
            aria-label={`View ${fragrance.name}`}
          >
            <ProductImage
              fragrance={fragrance}
              index={index}
              label={shelf && fragrance.wornToday ? "Worn today" : undefined}
            />
            <div className="fragrance-copy">
              <p>{fragrance.house}</p>
              <h2>{fragrance.name}</h2>
              <span>{fragrance.family}</span>
            </div>
          </button>
        </article>
      ))}
    </section>
  );
}

function Landing({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="landing">
      <section className="hero" aria-labelledby="hero-title">
        <header className="hero-nav">
          <Wordmark light onClick={() => window.scrollTo({ top: 0 })} />
          <nav aria-label="Primary navigation">
            <button onClick={() => onNavigate("discover")}>Discover</button>
            <button onClick={() => onNavigate("shelf")}>Shelf</button>
            <button onClick={() => onNavigate("log")}>Wear log</button>
          </nav>
          <span className="issue">Paris · 2025</span>
        </header>
        <div className="hero-art" aria-hidden="true">
          <img src={fragrances[2].image} alt="" />
        </div>
        <p className="hero-kicker">An olfactory journal</p>
        <h1 id="hero-title">
          <span>The art of</span>
          <span>the scent</span>
        </h1>
        <button
          className="scroll-cue"
          onClick={() =>
            document
              .getElementById("journal")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Explore the journal"
        >
          <span />
        </button>
      </section>

      <section className="editorial" id="journal" aria-label="Journal notes">
        <article className="editorial-image">
          <img
            src={fragrances[1].image}
            alt="Amber fragrance bottle in warm light"
          />
          <p>In the studio · Grasse, France</p>
        </article>
        <blockquote>
          “Perfume is the most intense form of memory.”
          <cite>— Jean Paul Guerlain</cite>
        </blockquote>
        <article className="editorial-stat">
          <p className="eyebrow">The lasting impression</p>
          <strong>72</strong>
          <p>
            Hours of quiet evolution, from first brightness to the final trace
            on skin.
          </p>
          <button onClick={() => onNavigate("discover")}>
            Explore the collection <span aria-hidden="true">→</span>
          </button>
        </article>
      </section>
    </main>
  );
}

function Discover({
  onNavigate,
  onSelect,
}: {
  onNavigate: (view: View) => void;
  onSelect: (fragrance: Fragrance) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return fragrances;
    return fragrances.filter((fragrance) =>
      [
        fragrance.name,
        fragrance.house,
        fragrance.family,
        fragrance.top,
        fragrance.mid,
        fragrance.base,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  return (
    <main className="discover-page">
      <AppHeader active="discover" onNavigate={onNavigate} />
      <section className="discover-intro">
        <p className="eyebrow">The fragrance index</p>
        <h1>Discover</h1>
        <p className="intro-copy">
          A considered library of scents, chosen for character, craft and the
          memories they leave behind.
        </p>
      </section>
      <div className="search-wrap">
        <label htmlFor="fragrance-search">Search the collection</label>
        <div className="search-field">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id="fragrance-search"
            type="search"
            placeholder="Search by scent, house or note"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span>{String(filtered.length).padStart(2, "0")} scents</span>
        </div>
      </div>
      {filtered.length ? (
        <FragranceGrid items={filtered} onSelect={onSelect} />
      ) : (
        <p className="empty-state">
          No scents found. Try a house, ingredient or another name.
        </p>
      )}
    </main>
  );
}

function BottleDetail({
  fragrance,
  onNavigate,
}: {
  fragrance: Fragrance;
  onNavigate: (view: View) => void;
}) {
  const [onShelf, setOnShelf] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <main className="discover-page detail-page">
      <AppHeader onNavigate={onNavigate} />
      <button className="detail-back" onClick={() => onNavigate("discover")}>
        ← Back to discover
      </button>
      <section className="bottle-detail">
        <div className="detail-visual">
          <img src={fragrance.image} alt={`${fragrance.name} bottle`} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{fragrance.house}</p>
          <h1>{fragrance.name}</h1>
          <dl className="detail-meta">
            <div>
              <dt>Year</dt>
              <dd>{fragrance.year}</dd>
            </div>
            <div>
              <dt>Concentration</dt>
              <dd>{fragrance.concentration}</dd>
            </div>
          </dl>
          <div className="note-columns">
            <div>
              <p>Top</p>
              <span>{fragrance.top}</span>
            </div>
            <div>
              <p>Mid</p>
              <span>{fragrance.mid}</span>
            </div>
            <div>
              <p>Base</p>
              <span>{fragrance.base}</span>
            </div>
          </div>
          <button
            className="amber-button"
            onClick={() => setOnShelf((current) => !current)}
          >
            {onShelf ? "Added to shelf" : "Add to shelf"}
          </button>
        </div>
      </section>
      <section className="detail-journal">
        <div className="worn-count">
          <p className="eyebrow">Worn</p>
          <strong>18</strong>
          <span>times this year</span>
        </div>
        <div className="rating">
          <p className="eyebrow">Your rating</p>
          <div className="stars" aria-label={`Rated ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} out of 5`}
              >
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path
                    className={star <= rating ? "filled" : ""}
                    d="m16 3.5 3.7 7.7 8.5 1.2-6.1 5.9 1.4 8.4-7.5-4-7.5 4 1.4-8.4-6.1-5.9 8.5-1.2Z"
                  />
                </svg>
              </button>
            ))}
          </div>
          <span>{rating ? `${rating} of 5` : "Select a rating"}</span>
        </div>
      </section>
    </main>
  );
}

function Shelf({
  onNavigate,
  onSelect,
}: {
  onNavigate: (view: View) => void;
  onSelect: (fragrance: Fragrance) => void;
}) {
  return (
    <main className="discover-page">
      <AppHeader active="shelf" onNavigate={onNavigate} />
      <section className="collection-heading">
        <p className="eyebrow">Your collection</p>
        <h1>
          <span>12</span> bottles
        </h1>
        <p>Scents kept close, and the memories gathered with them.</p>
      </section>
      <FragranceGrid items={fragrances} shelf onSelect={onSelect} />
    </main>
  );
}

function WearLog({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="discover-page">
      <AppHeader active="log" onNavigate={onNavigate} />
      <section className="log-heading">
        <p className="eyebrow">A record in scent</p>
        <h1>Wear log</h1>
        <p>May 2025 · 6 wears</p>
      </section>
      <section className="timeline" aria-label="Fragrance wear history">
        {wearLog.map(({ date, fragrance }) => (
          <button className="timeline-row" key={date}>
            <time>{date}</time>
            <span>{fragrance.name}</span>
            <strong>
              {fragrance.family.split(" / ").map((family) => (
                <em key={family}>{family}</em>
              ))}
            </strong>
          </button>
        ))}
      </section>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [selected, setSelected] = useState(fragrances[0]);

  const navigate = (nextView: View) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectFragrance = (fragrance: Fragrance) => {
    setSelected(fragrance);
    navigate("detail");
  };

  if (view === "landing") return <Landing onNavigate={navigate} />;
  if (view === "detail")
    return <BottleDetail fragrance={selected} onNavigate={navigate} />;
  if (view === "shelf")
    return (
      <Shelf onNavigate={navigate} onSelect={selectFragrance} />
    );
  if (view === "log") return <WearLog onNavigate={navigate} />;
  return (
    <Discover onNavigate={navigate} onSelect={selectFragrance} />
  );
}
