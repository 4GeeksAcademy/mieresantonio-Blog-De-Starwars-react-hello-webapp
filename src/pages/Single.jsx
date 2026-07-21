import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Single = () => {
  const { theTheme, theId } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${theTheme}/${theId}`)
      .then(res => res.json())
      .then(data => setDetail(data.result.properties))
      .catch(err => console.log(err));
  }, [theId, theTheme]);

  if (!detail) return <div className="container mt-4"><h3>Loading...</h3></div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${theTheme}/${theId}.jpg?raw=true`}
            className="img-fluid rounded"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/1a1a1a/ffffff?text=No+Image"; }}
            alt={detail.name}
          />
        </div>
        <div className="col-md-8">
          <h1>{detail.name}</h1>
          <ul className="list-group">
            {Object.entries(detail)
              .filter(([key]) => !["created", "edited", "url"].includes(key))
              .map(([key, value]) => (
                  typeof value === "string" && (
                    <li className="list-group-item" key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};