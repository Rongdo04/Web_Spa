import React from "react";
import { PublicLayout } from "../layout";
import {
  AboutHero,
  AboutStory,
  AboutValues,
  AboutTeam,
  AboutStats,
  AboutAwards,
} from "./components";

const About = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutStats />
        <AboutTeam />
        <AboutAwards />
      </div>
    </PublicLayout>
  );
};

export default About;
