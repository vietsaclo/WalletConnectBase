import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <span role="link" className="navbar-brand">
          <img src="/assets/images/logo-kcats.png" alt="logo" className="w-100" />
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="https://catai-home.pepemetaai.co/" target="_blank" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <NavLink to={'/home'} className="nav-link" aria-current="page">
                Mint
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/inventory'} className="nav-link">
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="https://catai-mindmap.pepemetaai.co/" target="_blank" className="nav-link">
                MindMap
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                DAO
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-4">
            <div className="me-3"><w3m-network-button /></div>
            <div className=""><w3m-button /></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
