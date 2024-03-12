import axios from "axios";
import { useEffect, useState } from "react";

function DownloadCsv() {
  const [jsonData, setJsonData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://paytm-sv70.onrender.com/api/v1/student"
        );
        setJsonData(response.data.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log("jsonData", jsonData);
  }, []);

  function downloadCSV() {
    // Convert JSON to CSV
    var csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(jsonData[0]).join(",") +
      "\n" +
      jsonData.map((obj) => Object.values(obj).join(",")).join("\n");

    // Create a download link
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);

    // Click the download link
    link.click();
  }

  return (
    <div className="App">
      <button className="download" onClick={downloadCSV}>
        download
      </button>
    </div>
  );
}

export default DownloadCsv;
