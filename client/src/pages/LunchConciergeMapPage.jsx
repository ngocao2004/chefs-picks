import { useState } from "react";
import Header from "../components/layout/Header";
import { restaurants } from "../features/lunchConcierge/data/restaurants";
import LunchMap from "../features/lunchConcierge/components/LunchMap";
import useLunchMapController from "../features/lunchConcierge/hooks/useLunchMapController";
import PopularSpotsList from "../features/lunchConcierge/components/PopularSpotsList";

const LunchConciergeMapPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedId, setSelectedId, setMap, flyToRestaurant } =
    useLunchMapController();

  const handleCardClick = (restaurant, index) => {
    setActiveIndex(index);
    setSelectedId(restaurant.id);
    flyToRestaurant(restaurant);
  };

  const handleMarkerClick = (id) => {
    const index = restaurants.findIndex((restaurant) => restaurant.id === id);
    if (index === -1) return;
    setActiveIndex(index);
    setSelectedId(id);
    flyToRestaurant(restaurants[index]);
  };

  const activeId = selectedId ?? restaurants[activeIndex]?.id;

  return (
    <div className="min-h-screen text-[#4A3B32]" style={{ backgroundColor: "#F3EFE6" }}>
      <Header />
      <div className="px-4 py-10 md:px-10">
        <header className="mx-auto mb-8 max-w-5xl text-center">
          <h1 className="text-2xl font-semibold tracking-[0.35em] text-[#4A3B32] md:text-3xl">
            SHIKIAI AI CONCIERGE
          </h1>
        </header>

        <main className="mx-auto max-w-5xl">
          <div
            className="grid gap-6 p-6 md:grid-cols-[3fr_2fr]"
            style={{
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 20px 45px rgba(74, 59, 50, 0.12)",
            }}
          >
            <section className="flex flex-col gap-4">
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderRadius: "18px",
                  backgroundColor: "#F8F1E7",
                  boxShadow: "0 12px 24px rgba(74, 59, 50, 0.08)",
                }}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9A7F6E]">
                  Search
                </span>
                <input
                  type="text"
                  placeholder="Find lunch near you..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#B7A79A]"
                />
              </div>
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 18px 32px rgba(74, 59, 50, 0.18)",
                }}
              >
                <LunchMap
                  restaurants={restaurants}
                  activeId={activeId}
                  onMapReady={setMap}
                  onMarkerClick={handleMarkerClick}
                />
              </div>
            </section>

            <PopularSpotsList
              restaurants={restaurants}
              activeId={activeId}
              onSelect={(restaurant) =>
                handleCardClick(
                  restaurant,
                  restaurants.findIndex((item) => item.id === restaurant.id)
                )
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LunchConciergeMapPage;
