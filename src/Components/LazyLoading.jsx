import React, { useRef, useState, useEffect } from "react";

const PLACEHOLDER =
  "https://placehold.co/400x400/0f3b2c/white?text=Loading";

const ERROR_IMAGE =
  "https://placehold.co/400x400/0f3b2c/white?text=Image";

export default function LazyImage({ src, alt, className }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const finalSrc = error
    ? ERROR_IMAGE
    : loaded
    ? src || ERROR_IMAGE
    : PLACEHOLDER;

  return (
    <img
      ref={imgRef}
      src={finalSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}