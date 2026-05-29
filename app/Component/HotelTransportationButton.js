export default function HotelTransportationButton() {
  return (
    <button 
      type="button"
      role="tab"
      aria-selected="true"
      aria-controls="simple-tabpanel-1"
      id="simple-tab-1"
      className="packages-btn"
    >
      <img
        alt="Packages"
        src="/images/Hotel.png"
        width="35"
        height="35"
        className="packages-icon"
      />
      <span  className="packages-label">Hotel+Transportation</span>
    </button>
  );
}