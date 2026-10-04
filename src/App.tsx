import { useEffect, useState } from "react";
import { loadFragrances, type Fragrance } from "./lib/db";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1616949755610-8a92ec5c7a91?w=800&q=90&sat=-25&con=15",
  "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=800&q=90&sat=-25&con=15",
];

function App() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadFragrances().then((rows) => {
      setFragrances(rows);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app">
      <nav className={`nav ${scrolled ? "nav--solid" : ""}`}>
        <a href="/" className="nav__mark">SILLAGE</a>
        <div className="nav__links">
          <a href="#discover" className="active">Discover</a>
          <a href="#shelf">Shelf</a>
          <a href="#journal">Journal</a>
        </div>
        <div className="nav__meta">Paris · 2025</div>
      </nav>

      <section className="hero">
        <div className="hero__copy">
          <div className="hero__kicker">An olfactory journal</div>
          <h1>
            The art of<br />
            <em>the scent.</em>
          </h1>
          <p className="hero__lead">
            A quiet record of the fragrances that mark our days.
            Catalog what you wear. Remember what it meant.
          </p>
        </div>
        <div className="hero__image">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=90&sat=-30&con=15"
            alt="Fragrance"
          />
        </div>
        <span className="hero__scroll" />
      </section>

      <main id="discover" className="page">
        <div className="section-head">
          <h2>Discover</h2>
          <span className="kicker">{fragrances.length} in the archive</span>
        </div>

        {loading ? (
          <div className="state"><p>Opening the archive…</p></div>
        ) : fragrances.length === 0 ? (
          <div className="state"><p>The archive is empty.</p></div>
        ) : (
          <div className="grid">
            {fragrances.map((f, i) => (
              <button key={f.id} className="card">
                <div className="card__image">
                  <img
                    src={f.imageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                    alt={f.name}
                  />
                </div>
                <div className="card__house">{f.house}</div>
                <div className="card__name">{f.name}</div>
                <div className="card__notes">
                  {[...f.notesTop, ...f.notesMid, ...f.notesBase].slice(0, 3).join(" · ")}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;