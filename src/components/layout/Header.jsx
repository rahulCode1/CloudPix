import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import usePhotosContext from "../../context/photosContext";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { handleLogout, albumSearchText, setAlbumSearchText } =
    usePhotosContext();
  const [isAlbumOpen, setAlbumOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleSearch = () => {
    setAlbumSearchText(searchText);
    navigate("/");
  };

  const closeMenu = () => setAlbumOpen(false);

  const clearSearch = () => {
    if (albumSearchText) {
      setAlbumSearchText("");
    }

    setSearchText("");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4  py-2 md:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <NavLink
              className="text-2xl md:text-3xl font-bold text-cyan-600 tracking-tight shrink-0 no-underline"
              to="/"
              onClick={closeMenu}
            >
              CloudPix
            </NavLink>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-2 relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search albums..."
                className="
            w-full
            rounded-xl
            bg-slate-100
            border
            border-slate-200
            py-3
            pl-4
            pr-24
            text-sm
            outline-none
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-200
          "
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchText && (
                  <button
                    onClick={clearSearch}
                    className="text-slate-500 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                )}

                <button
                  onClick={handleSearch}
                  className="
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              px-3
              py-1.5
              rounded-lg
              transition
            "
                >
                  🔍
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {!showSearch && (
                <button
                  onClick={() => setShowSearch((prevStat) => !prevStat)}
                  className="
              md:hidden
              h-10
              w-10
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-100
              transition
            "
                  type="button"
                >
                  🔍
                </button>
              )}

              <button
                className="
            lg:hidden
            h-10
            w-10
            rounded-xl
            border
            border-slate-200
            bg-white
            hover:bg-slate-100
            transition
          "
                type="button"
                onClick={() => setAlbumOpen((prev) => !prev)}
              >
                {isAlbumOpen ? "✕" : "☰"}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center">
                <ul className="flex items-center gap-3 mb-0">
                  {token && userId && (
                    <li>
                      <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `font-medium no-underline transition ${
                            isActive
                              ? "text-cyan-600"
                              : "text-slate-700 hover:text-cyan-600"
                          }`
                        }
                      >
                        Albums
                      </NavLink>
                    </li>
                  )}

                  {token && userId && (
                    <li>
                      <NavLink
                        to="/add"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `font-medium no-underline transition ${
                            isActive
                              ? "text-cyan-600"
                              : "text-slate-700 hover:text-cyan-600"
                          }`
                        }
                      >
                        Add Album
                      </NavLink>
                    </li>
                  )}

                  {token && userId && (
                    <li>
                      <NavLink
                        to="/image"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `font-medium no-underline transition ${
                            isActive
                              ? "text-cyan-600"
                              : "text-slate-700 hover:text-cyan-600"
                          }`
                        }
                      >
                        Add Image
                      </NavLink>
                    </li>
                  )}

                  {!token && !userId && (
                    <li>
                      <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `font-medium no-underline transition ${
                            isActive
                              ? "text-cyan-600"
                              : "text-slate-700 hover:text-cyan-600"
                          }`
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                  )}

                  {token && userId && (
                    <li>
                      <button
                        onClick={() => {
                          closeMenu();
                          handleLogout(navigate);
                        }}
                        className="
                    border
                    border-red-500
                    text-red-500
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-red-500
                    hover:text-white
                    transition
                  "
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden mt-3 relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search albums..."
                className="
            w-full
            rounded-xl
            bg-slate-100
            border
            border-slate-200
            py-3
            pl-4
            pr-24
            text-sm
            outline-none
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-200
          "
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchText && (
                  <button
                    onClick={clearSearch}
                    className="text-slate-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                )}

                <button
                  onClick={handleSearch}
                  className="
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              px-3
              py-1.5
              rounded-lg
              transition
            "
                >
                  🔍
                </button>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isAlbumOpen && (
            <div className="lg:hidden mt-2 border-t border-slate-200 pt-2">
              <ul className="flex flex-col text-center">
                {token && userId && (
                  <li>
                    <NavLink
                      to="/"
                      end
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2 no-underline transition ${
                          isActive
                            ? "bg-cyan-50 text-cyan-600"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      Albums
                    </NavLink>
                  </li>
                )}

                {token && userId && (
                  <li>
                    <NavLink
                      to="/add"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2 no-underline transition ${
                          isActive
                            ? "bg-cyan-50 text-cyan-600"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      Add Album
                    </NavLink>
                  </li>
                )}

                {token && userId && (
                  <li>
                    <NavLink
                      to="/image"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2 no-underline transition ${
                          isActive
                            ? "bg-cyan-50 text-cyan-600"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      Add Image
                    </NavLink>
                  </li>
                )}

                {!token && !userId && (
                  <li>
                    <NavLink
                      to="/login"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2 no-underline transition ${
                          isActive
                            ? "bg-cyan-50 text-cyan-600"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {token && userId && (
                  <li>
                    <button
                      onClick={() => {
                        closeMenu();
                        handleLogout(navigate);
                      }}
                      className="
                  w-full
                  mt-2
                  border
                  border-red-500
                  text-red-500
                  py-2
                  rounded-xl
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
