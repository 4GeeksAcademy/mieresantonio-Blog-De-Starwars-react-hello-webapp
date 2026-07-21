import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [activeCategory, setActiveCategory] = useState("people");

  const fetchData = async (endpoint, actionType) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
      const data = await res.json();
      dispatch({ type: actionType, payload: data.results });
    } catch (error) {
      console.log("Error fetching", endpoint, error);
    }
  };

  useEffect(() => {
    fetchData("people", "set_people");
    fetchData("vehicles", "set_vehicles");
    fetchData("planets", "set_planets");
  }, []);

  const categories = [
    { key: "people", label: "Characters" },
    { key: "vehicles", label: "Vehicles" },
    { key: "planets", label: "Planets" }
  ];

  return (
    <div className="d-flex">
      <div className="sidebar p-3">
        <h6 className="sidebar-title">BROWSE DATABANK //</h6>
        <p className="sidebar-subtitle">BROWSE</p>
        <ul className="list-unstyled">
          {categories.map(cat => (
            <li
              key={cat.key}
              className={`sidebar-item ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>

      <div className="container mt-4">
        <h1 className="text-danger">
          {categories.find(c => c.key === activeCategory).label}
        </h1>
        <div className="d-flex flex-wrap gap-3 pb-3">
          {store[activeCategory].map(item => (
            <Card key={item.uid} item={item} type={activeCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};