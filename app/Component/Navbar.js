import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      
      {/* <a className="navbar-brand">MyStore</a> */}

      <div className="ms-auto" style={{ width: "300px" }}>
        <SearchBox />
      </div>
      

    </nav>
  );
}