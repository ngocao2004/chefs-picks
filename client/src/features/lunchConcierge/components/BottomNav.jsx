import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faLocationDot,
  faMap,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const BottomNav = ({ activeTab = "map", onTabChange }) => {
  const handleTabClick = (tab) => {
    if (typeof onTabChange === "function") {
      onTabChange(tab);
    }
  };

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 px-6 py-3"
      style={{
        borderRadius: "999px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 16px 40px rgba(74, 59, 50, 0.18)",
      }}
    >
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EFE6] text-[#4A3B32]"
        aria-label="Utensils"
        onClick={() => handleTabClick("utensils")}
      >
        <FontAwesomeIcon icon={faUtensils} />
      </button>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EFE6] text-[#4A3B32]"
        aria-label="Cube"
        onClick={() => handleTabClick("cube")}
      >
        <FontAwesomeIcon icon={faCube} />
      </button>
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{
          backgroundColor: "#E68A2E",
          boxShadow: "0 12px 22px rgba(230, 138, 46, 0.35)",
        }}
        aria-label="Map"
        onClick={() => handleTabClick("map")}
      >
        <FontAwesomeIcon icon={faMap} />
      </button>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EFE6] text-[#4A3B32]"
        aria-label="Pin"
        onClick={() => handleTabClick("pin")}
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
    </nav>
  );
};

export default BottomNav;
