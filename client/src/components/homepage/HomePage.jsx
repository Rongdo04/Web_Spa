import React, { useState, useEffect } from "react";
import { LoadingSkeleton, ResponsiveGrid } from "../ui";
import { PublicLayout } from "../layout";
import {
  HeroSection,
  FeaturedServicesSection,
  ProcessStepsSection,
  TestimonialsSection,
  ContactInfoSection,
  FeaturesSection,
  FinalCTASection,
} from "./sections";
import { contactAPI } from "../../services";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState(null);
  const [error, setError] = useState(null);

  // Load contact information
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await contactAPI.getContactInfo();
        setContactInfo(response.data);
      } catch (err) {
        console.error("Error loading contact info:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadContactInfo();
  }, []);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-white">
          {/* Hero Skeleton */}
          <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <LoadingSkeleton variant="title" className="mb-6 w-3/4" />
                  <LoadingSkeleton variant="title" className="mb-6 w-1/2" />
                  <LoadingSkeleton variant="text" lines={3} className="mb-8" />
                  <div className="flex gap-4">
                    <LoadingSkeleton variant="button" className="w-32" />
                    <LoadingSkeleton variant="button" className="w-32" />
                  </div>
                </div>
                <div>
                  <LoadingSkeleton
                    variant="image"
                    className="w-full h-96 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Services Skeleton */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <LoadingSkeleton
                  variant="title"
                  className="mx-auto mb-4 w-1/3"
                />
                <LoadingSkeleton variant="text" className="mx-auto w-1/2" />
              </div>
              <ResponsiveGrid.Card>
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingSkeleton.Card key={index} />
                ))}
              </ResponsiveGrid.Card>
            </div>
          </section>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <HeroSection contactInfo={contactInfo} />
        <FeaturedServicesSection />
        <ProcessStepsSection />
        <TestimonialsSection />
        <ContactInfoSection contactInfo={contactInfo} />
        <FeaturesSection />
        <FinalCTASection contactInfo={contactInfo} />
      </div>
    </PublicLayout>
  );
};

export default HomePage;
