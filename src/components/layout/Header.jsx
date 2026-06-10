import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import usePhotosContext from "../../context/photosContext";

const Header = () => {
  const { handleLogout } = usePhotosContext();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom py-3">
      <div className="container">
        {/* Logo */}
        <NavLink
          className="navbar-brand fw-bold fs-3 text-primary"
          to="/albums"

          onClick={closeMenu}
        >
          CloudPix
        </NavLink>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <span className="fs-3"> X</span>
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>

        {/* Navigation */}
        <div
          className={`navbar-collapse ${
            isOpen ? "d-block" : "d-none"
          } d-lg-block`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
            {token && userId && (
              <li className="nav-item text-center">
                <NavLink
                  to="/albums"
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-medium ${
                      isActive ? "text-primary" : "text-dark"
                    }`
                  }
                >
                  Albums
                </NavLink>
              </li>
            )}

            {token && userId && (
              <li className="nav-item text-center">
                <NavLink
                  to="/albums/add"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-medium ${
                      isActive ? "text-primary" : "text-dark"
                    }`
                  }
                >
                  Add Album
                </NavLink>
              </li>
            )}

            {token && userId && (
              <li className="nav-item text-center">
                <NavLink
                  to="/image"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-medium ${
                      isActive ? "text-primary" : "text-dark"
                    }`
                  }
                >
                  Add Image
                </NavLink>
              </li>
            )}

            {!token && !userId && (
              <li className="nav-item text-center">
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-medium ${
                      isActive ? "text-primary" : "text-dark"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {token && userId && (
              <li className="nav-item">
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout(navigate);
                  }}
                  className="w-100 btn btn-outline-danger ms-lg-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
