import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    const all = [
      ...store.people.map(p => ({ ...p, theme: "people" })),
      ...store.vehicles.map(v => ({ ...v, theme: "vehicles" })),
      ...store.planets.map(pl => ({ ...pl, theme: "planets" }))
    ];
    setResults(all.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
  };

  const goToDetail = (item) => {
    setQuery("");
    setResults([]);
    navigate(`/single/${item.theme}/${item.uid}`);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Star Wars</span>
          </Link>

          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search characters, vehicles, planets..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: "260px" }}
            />
            {results.length > 0 && (
              <ul className="list-group position-absolute" style={{ zIndex: 10, width: "260px" }}>
                {results.slice(0, 6).map(item => (
                  <li
                    key={`${item.theme}-${item.uid}`}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToDetail(item)}
                  >
                    {item.name} <small className="text-muted">({item.theme})</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dropdown">
          <button className="btn btn-favorites dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Favorites <span className="badge bg-light text-dark">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 && (
              <li><span className="dropdown-item-text text-muted">No favorites yet</span></li>
            )}
            {store.favorites.map(fav => (
              <li key={fav.uid} className="dropdown-item d-flex justify-content-between align-items-center">
                <span>{fav.name}</span>
                <i
                  className="fa fa-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch({ type: 'remove_favorite', payload: { uid: fav.uid, theme: fav.theme } })}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};