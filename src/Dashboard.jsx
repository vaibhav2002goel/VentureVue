import React from "react";
import { DashboardNav } from "./DashboardNav";
import { useState, useEffect } from "react";
import { UserData } from "./Data/ChartsData";
import LineChart from "./Charts/LineChart";
import LandingClock from "./components/LandingClock";
import Footer from "./components/Footer";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch or set UserData here
    setUserData(UserData);
  }, []);

  if (!userData) {
    // Render loading state or return null
    return null;
  }
  alert("Successfully Logged In.");
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardNav />

      <div className="mt-0 mb-7 p-10 bg-gray-800">
        <LandingClock />
      </div>
      <div className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          Current Trend
        </h2>
        {userData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <LineChart
              chartData={{
                labels: userData.map((data) => data.industry),
                datasets: [
                  {
                    label: "Industry Average",
                    data: userData.map((data) => data.average),
                    backgroundColor: [
                      "green",
                      "blue",
                      "red",
                      "yellow",
                      "orange",
                      "purple",
                      "pink",
                      "brown",
                      "gray",
                      "black",
                      "white",
                    ],
                    borderColor: "white",
                    borderWidth: 1,
                    datacolor: "white",
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
