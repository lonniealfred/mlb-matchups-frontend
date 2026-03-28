"use client";

import { useState } from "react";
import Matchups from "@/components/Matchups";
import TopHitters from "@/components/TopHitters";
import Trends from "@/components/Trends";
import PitchingLeaderboard from "@/components/PitchingLeaderboard";
import LastUpdated from "@/components/LastUpdated";

export default function HomePage() {
  console.log("REAL HomePage rendered");

  const [activeTab, setActiveTab] = useState("matchups");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Today’s MLB Matchups
        </h1>
        <p className="text-gray-400 mt-1">
          Live lineups, pitching duels, hitter insights, and stadium analytics
        </p>

        <div className="flex justify-center mt-3">
          <LastUpdated />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab("matchups")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "matchups"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Matchups
        </button>

        <button
          onClick={() => setActiveTab("pitching")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "pitching"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Pitching
        </button>

        <button
          onClick={() => setActiveTab("top-hitters")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "top-hitters"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Top Hitters
        </button>

        <button
          onClick={() => setActiveTab("trends")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "trends"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Trends
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "matchups" && (
          <div className="mt-4">
            {console.log("Rendering <Matchups />")}
            <Matchups />
          </div>
        )}

        {activeTab === "pitching" && (
          <div className="mt-4">
            <PitchingLeaderboard />
          </div>
        )}

        {activeTab === "top-hitters" && (
          <div className="mt-4">
            <TopHitters />
          </div>
        )}

        {activeTab === "trends" && (
          <div className="mt-4">
            <Trends />
          </div>
        )}
      </div>
    </div>
  );
}
