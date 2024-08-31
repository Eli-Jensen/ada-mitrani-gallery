"use client";

import React, { useEffect, useState } from "react";

interface Image {
  key: string;
  url: string;
}

export default function R2Images({ folder }: { folder: string }) {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`/api/fetch-images?folder=${folder}`);
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, [folder]);

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((image) => (
        <img
          key={image.key}
          src={image.url}
          alt={image.key}
          style={{ width: "200px", margin: "10px" }}
        />
      ))}
    </div>
  );
}
