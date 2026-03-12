import { useEffect, useRef, useState } from 'react';
import { Streamdown } from 'streamdown';

/**
 * Hope Quotes Webpage
 * Design: Minimalist Serenity
 * 
 * Core Design Principles:
 * - Profound simplicity through strategic negative space
 * - Emotional resonance through typography and breathing room
 * - Contemplative pacing with gentle transitions
 * - Reverent treatment of each quote as a meditation object
 * 
 * Color Palette:
 * - Cream (#F8F6F3) - primary background
 * - Warm Taupe (#D4C5B9) - secondary accents
 * - Deep Sage (#5A6B63) - primary text
 * - Warm Gold (#C9A961) - spiritual warmth and accents
 * 
 * Typography:
 * - Lora (serif) for quotes - elegant, literary, timeless
 * - Inter (sans-serif) for metadata - clean, modern contrast
 */

interface Quote {
  text: string;
  number: number;
}

const quotes: Quote[] = [
  { text: "He crowns trusting hearts with the promise of forever.", number: 1 },
  { text: "Hope's gentle whisper guides weary souls to dawn.", number: 2 },
  { text: "The dawn of grace illuminates paths once shadowed by despair.", number: 3 },
  { text: "In every trial, a hidden strength, a future bright with light.", number: 4 },
  { text: "Trust in the unseen hand that paints the morning sky.", number: 5 },
  { text: "A steadfast spirit finds its anchor in eternal love.", number: 6 },
  { text: "Through darkest nights, a star of hope forever shines.", number: 7 },
  { text: "He weaves a tapestry of peace from threads of quiet faith.", number: 8 },
  { text: "The heart that seeks solace discovers joy beyond compare.", number: 9 },
  { text: "Let patience be your compass, leading to shores of peace.", number: 10 },
  { text: "Embrace the journey, for destiny unfolds with grace.", number: 11 },
  { text: "A symphony of blessings awaits the soul that truly believes.", number: 12 },
  { text: "His boundless mercy cradles every fragile dream.", number: 13 },
  { text: "With every sunrise, a fresh canvas for hope's artistry.", number: 14 },
  { text: "The spirit's resilience blossoms in the garden of belief.", number: 15 },
  { text: "He grants enduring strength to those who walk in faith.", number: 16 },
  { text: "A beacon of comfort shines for all who seek His light.", number: 17 },
  { text: "The promise of renewal whispers on the morning breeze.", number: 18 },
  { text: "Find courage in His presence, a fortress for the soul.", number: 19 },
  { text: "He fills the longing heart with everlasting peace.", number: 20 },
];

export default function Home() {
  const [visibleQuotes, setVisibleQuotes] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for fade-in animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const quoteNumber = parseInt(entry.target.getAttribute('data-quote-number') || '0');
                setVisibleQuotes((prev) => {
                  const newSet = new Set(prev);
                  newSet.add(quoteNumber);
                  return newSet;
                });
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all quote cards
    const quoteCards = document.querySelectorAll('[data-quote-number]');
    quoteCards.forEach((card) => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663367905961/Gz4dQTv7Rd5ACE2iSofryK/hero-background-fChPDQSCgUgdqGncxkRj29.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-6" style={{ color: 'oklch(0.98 0.001 0)' }}>
            Hope Quotes
          </h1>
          <p className="text-lg md:text-xl font-light" style={{ color: 'oklch(0.88 0.01 45)' }}>
            A collection of inspirational quotes to illuminate your path
          </p>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-32">
          {quotes.map((quote, index) => {
            const isVisible = visibleQuotes.has(quote.number);
            const isEvenQuote = index % 2 === 0;

            return (
              <div key={quote.number}>
                {/* Ornamental Divider */}
                {index > 0 && (
                  <div className="ornament-divider mb-20">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663367905961/Gz4dQTv7Rd5ACE2iSofryK/accent-ornament-2ZReSgv7mR4L4xFQQezV6K.webp"
                      alt="divider"
                      className="h-12 opacity-60"
                    />
                  </div>
                )}

                {/* Quote Card */}
                <div
                  data-quote-number={quote.number}
                  className={`transition-all duration-1000 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  } ${isEvenQuote ? 'md:ml-12' : 'md:mr-12'}`}
                >
                  <article
                    className="p-8 md:p-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-102 transform-gpu"
                    style={{
                      backgroundColor: 'var(--card)',
                      backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663367905961/Gz4dQTv7Rd5ACE2iSofryK/quote-card-texture-NZoBUB3ZgeLyQPdx44FXPH.webp)',
                      backgroundSize: '100%',
                      backgroundBlendMode: 'screen',
                      borderLeft: '4px solid var(--accent)',
                    } as React.CSSProperties}
                  >
                    <blockquote className="quote-text mb-6">
                      "{quote.text}"
                    </blockquote>
                    <div className="quote-attribution">
                      Quote {quote.number}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 text-center" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          A collection of inspirational hope quotes for contemplation and reflection
        </p>
      </footer>
    </div>
  );
}
