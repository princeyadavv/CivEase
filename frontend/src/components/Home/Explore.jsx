import React, { useEffect, useState } from "react";

const Explore = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/explore");
        if (!response.ok) {
          const result = await response.json();
          console.log(result);
        } else {
          const data = await response.json();
          const detailedData = await Promise.all(data.issue);
          console.log("Report Data:", detailedData);
          setReports(detailedData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Reported Issues Feed
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex flex-col bg-gray-100 p-5 rounded-xl shadow-lg   hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">
                {report.description}
              </h3>
              <p className="text-gray-600 mt-1 font-medium">
                Status:{" "}
                <span
                  className={
                    report.status === "RESOLVED"
                      ? "text-green-600"
                      : "text-[#F14A00]"
                  }
                >
                  {report.status}
                </span>
              </p>

              <p className="text-gray-500 mt-2">{report.location}</p>
              <p className="text-gray-400 text-sm">{report.coordinates}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 border rounded-md text-[#3B6790] hover:bg-[#3B6790]  hover:text-white transition-colors">
                Support
              </button>
              <img
                src={`http://localhost:5000/${report.img}`}
                alt="Report Image"
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
