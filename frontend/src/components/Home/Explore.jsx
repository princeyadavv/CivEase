import React, { useEffect, useState } from "react";

const Explore = () => {
  // const reports = [

  // ];
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/explore");
        if (!response.ok) {
          const result = await response.json();
          reports = [...result];
          console.log(result);
          // console.error("Error response:", result[0].location);
        } else {
          const data = await response.json();
          const detailedData = await Promise.all(data.issue);
          console.log("reprt", detailedData);
          // Update state with detailed Pokémon data
          setReports(detailedData);
          // console.log("Success response:", data.img);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(data)

  // Sample Data (Replace with API data if needed)

  return (
    <div className="container mx-auto px-6 py-30">
      <h2 className="text-2xl font-bold mb-6">Reported Issues Feed</h2>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((reports,key) => (
          <div
            key={reports.id}
            className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md border"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {reports.description}, {reports.status}
              </h3>
              <p className="text-gray-500">{reports.location}</p>
              <p className="text-gray-400 text-sm">{reports.coordinates}</p>
              <button className="mt-3 px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-100">
                Support
              </button>
            </div>
            <img
              src={`http://localhost:5000/${reports.img}`}
              alt={reports.img}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
