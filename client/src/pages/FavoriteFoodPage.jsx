import React from "react";

export default function FavoriteFood() {
  const dishes = [
    {
      id: 1,
      name: "Pho Bo",
      subtitle: "Pho 10 Ly Quoc Su",
      desc: "Rich beef broth and tender noodles.",
      price: 5.5,
      img: "/images/pho.png"
    },
    {
      id: 2,
      name: "Banh Mi",
      subtitle: "Banh Mi Huynh Hoa",
      desc: "Crispy bread and flavorful fillings.",
      price: 2.8,
      img: "/images/banhmi.png"
    },
    {
      id: 3,
      name: "Com Tam",
      subtitle: "Com Tam Cali",
      desc: "Delicious grilled pork with broken rice.",
      price: 4.2,
      img: "/images/comtam.png"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-orange-50 flex flex-col items-center py-10">
      {/* Header */}
      <div className="w-3/4 bg-orange-400 text-white text-center py-4 rounded-t-xl text-2xl font-bold shadow">
        Favorite Dishes
      </div>

      {/* Content Card */}
      <div className="w-3/4 bg-white rounded-b-xl shadow-xl p-8 space-y-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="flex items-center justify-between bg-orange-50 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img 
                src={dish.img} 
                alt={dish.name} 
                className="w-14 h-14 object-cover rounded-lg shadow" 
              />
              <div>
                <h3 className="font-bold text-lg">{dish.name}</h3>
                <p className="text-sm text-gray-600 -mt-1">{dish.subtitle}</p>
                <p className="text-sm text-gray-500">{dish.desc}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-orange-600 font-bold">${dish.price.toFixed(2)}</span>
              <button className="px-4 py-1 bg-orange-300 text-white rounded-md hover:bg-orange-400 transition">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
