import React from "react";
import FlightSearchForm from "../components/FlightSearchForm.tsx";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome to SkyExplorer</h1>
        <p className="text-lg text-gray-600">Find and book flights instantly.</p>
      </div>
      <FlightSearchForm />
    </div>
  );
};

export default Home;
