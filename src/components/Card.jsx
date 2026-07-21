import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.theme === type);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'remove_favorite', payload: { uid: item.uid, theme: type } });
    } else {
      dispatch({ type: 'add_favorite', payload: { ...item, theme: type } });
    }
  };

  return (
    <div className="card" style={{ minWidth: "16rem", maxWidth: "16rem" }}>
      <img
        src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${item.uid}.jpg?raw=true`}
        className="card-img-top"
        style={{ height: "220px", objectFit: "cover", objectPosition: "top" }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/1a1a1a/ffffff?text=No+Image"; }}
        alt={item.name}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/single/${type}/${item.uid}`}>
            <button className="btn btn-outline-primary">Learn more!</button>
          </Link>
          <button className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`} onClick={toggleFavorite}>
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};