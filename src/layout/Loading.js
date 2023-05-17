import React, { useState, useEffect } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <section className="loading-overlay">
          <section className="spinner"></section>
        </section>
      ) : null}
    </>
  );
}

export default Loading;