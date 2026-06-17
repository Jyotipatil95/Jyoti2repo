import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useState } from "react";
// export default function SearchNav() {
//   return (
//     <nav className="d-flex justify-content-center align-items-center bg-warning w-100 py-3 rounded-top custom-rounded-bl">
//   <div className="position-relative w-50 ">
//     {/* Search Input */}
//     <input
//       type="text"
//       placeholder="Search..."
//       className="form-control ps-5 rounded-pill fw-semibold text-dark"
//     />

//     {/* Search Icon */}
//     <svg
//       className="position-absolute top-50 start-0 translate-middle-y ms-3 text-danger"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       width="24"
//       height="24"
//       fill="currentColor"
//     >
//       <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
//     </svg>
//   </div>
  
// </nav>
//   );
// }

export default function SearchNav() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  //API expects a JSON payload (POST request) 
  const handleSearch = async () => {
  try {
    const res = await fetch(
      "https://dn5wcoauce.execute-api.us-east-2.amazonaws.com/dev/v1/search/flights",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "p80CN1qJdn7hKbNdT0P99lCJdJVmwOV9wft615Tj"
        },
        body: JSON.stringify({
          country: query,
          date: "2026-05-01",
          nights: 5
        })
      }
    );
    const data = await res.json();
    console.log(data);
    setResults(data);
  } catch (error) {
    console.error("API call failed:", error);
  }
};

  return (
    <div>
      <nav className="d-flex justify-content-start px-5 align-items-center bg-warning w-100 py-3 custom-rounded-tl">
        <div className="position-relative w-50">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control ps-5 rounded-pill fw-semibold text-dark"
          />

          {/* Search Icon */}
          <svg
            onClick={handleSearch}
            role="button"
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-danger"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
          </svg>
        </div>
      </nav>

      {/* Results */}
      <div className="container mt-4">
        {results.length > 0 && (
      <div className="row">
          {results.map((item, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
          ))}
      </div>
    )}
      </div>
    </div>
  );
}
