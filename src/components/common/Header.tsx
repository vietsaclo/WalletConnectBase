import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span role="link" className="navbar-brand">
          K-Cats
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={'/home'} className="nav-link" aria-current="page">
                Mint Cat NFT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/inventory'} className="nav-link">
                My Inventory
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <w3m-network-button />&nbsp;
            <w3m-button />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
