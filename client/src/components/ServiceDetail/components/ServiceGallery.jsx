import React, { useState } from "react";
import { Badge } from "../../ui";

const ServiceGallery = ({ images = [], name, tags = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default image if no images provided
  const defaultImage =
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop";
  const displayImages = images.length > 0 ? images : [defaultImage];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative">
        <img
          src={displayImages[selectedImage]}
          alt={name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
        {tags.length > 0 && (
          <div className="absolute top-4 right-4 flex gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-white/90">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-lg transition-all ${
                selectedImage === index
                  ? "ring-2 ring-emerald-500 ring-offset-2"
                  : "hover:opacity-80"
              }`}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="w-full h-20 object-cover"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-emerald-500/20"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;
