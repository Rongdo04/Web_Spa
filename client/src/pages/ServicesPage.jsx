import React from "react";
import { PublicLayout } from "../components/layout";
import { ServicesList } from "../components/services";

const ServicesPage = () => {
  return (
    <PublicLayout>
      <ServicesList />
    </PublicLayout>
  );
};

export default ServicesPage;
