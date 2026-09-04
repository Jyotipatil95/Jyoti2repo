import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function SearchNav() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        "https://m005t6x6wj.execute-api.us-east-2.amazonaws.com/dev/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            search_data: {
              start: "2026-12-01",
              end: "2026-12-05",
              pole: "fDEwNzkxLVJlc3RlbA==",
              composition: [{ adults: 2, children: 0, ages: [] }],
              currency: "USD",
              language: "en",
              page: "1",
              limit: "100"
            }
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      const parsedBody = JSON.parse(data.body);

      setResults(parsedBody.data.products || []);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching search:", error);
    }
  };

  return (
    <div>
      <nav className="d-flex justify-content-start px-5 align-items-center bg-warning w-100 py-3 custom-rounded-tl">
        <div className="position-relative w-50">
          <input
            type="text"
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control ps-5 rounded-pill fw-semibold text-dark"
          />
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

      {/* Scrollable Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {results.length > 0 ? (
            <div className="list-group">
              {results.map((item, idx) => (
                <div key={idx} className="list-group-item">
                  <h5>{item.name}</h5>
                  <p>{item.description || "No description available"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No results found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
