import { useEffect, useState } from "react";

export default function QuoteComponent() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BACKEND_URL}/api/quote`);
      const data = await response.json();

      setQuote({
        quote: data.quote || "",
        author: data.author || ""
      });
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-box">
      {loading ? (
        <p className="quote-text">Loading...</p>
      ) : (
        <>
          <p className="quote-text">“{quote.quote}”</p>
          <p className="quote-author">— {quote.author}</p>
        </>
      )}
    </div>
  );
}
