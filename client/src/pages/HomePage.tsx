import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import VendorHamburger from "../components/Hamburger";
import { RootState, AppDispatch } from "../redux/store";
import { fetchVendorsRequest } from "../redux/slices/vendorsSlice";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const vendors = useSelector((state: RootState) => state.vendors.list);
  const status = useSelector((state: RootState) => state.vendors.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVendorsRequest());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <h2>Loading vendors...</h2>;
  }

  if (status === "failed") {
    return <h2>Error loading vendors</h2>;
  }

  if (status === "succeeded" && vendors.length === 0) {
    return <h2>No vendors found</h2>;
  }
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fc8019",
        minHeight: "100vh",
      }}
    >
      <VendorHamburger />
      <h1 className="vendor-head">Welcome to the Vendor App</h1>
      <p className="para">Select a vendor:</p>
      <ul className="vendor-card">
        {vendors.map((vendor) => (
          <li key={vendor.slug}>
            <Link
              to={`/${vendor.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="vendor-img-container">
                <img
                  src={
                    vendor.logo ||
                    "https://placehold.co/200x150?text=vendor+123"
                  }
                  alt={vendor.name}
                  className="vendor-img"
                />
                <div>
                  <h3
                    style={{
                      margin: 0,
                      padding: "10px",
                      fontSize: "18px",
                      background: "white",
                    }}
                  >
                    {vendor.name}
                  </h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HomePage;
