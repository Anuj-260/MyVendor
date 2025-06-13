import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vendors");
        return res.json();
      })
      .then((data) => {
        setVendors(data.vendors);
        setError(false);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
        setError(true);
      });
  }, []);

  if (error) return <h2>Error loading vendors</h2>;
  if (vendors.length === 0) return <h2>Loading vendors...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Vendor App</h1>
      <p className="para">Select a vendor:</p>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.slug}>
            <Link to={`/${vendor.slug}`} style={{ color: "blue" }}>
              {vendor.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
