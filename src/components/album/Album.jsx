import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import {
  fetchAlbumAsync,
  editAlbumDescriptionAsync,
} from "../../pages/album/albumSlice";
import Modal from "../model/Model";
import UpdateAlbumForm from "./UpdateAlbumForm";
import usePhotosContext from "../../context/photosContext";

const Album = () => {
  const initialAlbum = {
    albumId: "",
    name: "",
    description: "",
  };

  const { user, setUser, albumSearchText } = usePhotosContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [album, setAlbum] = useState(initialAlbum);

  const token = localStorage.getItem("token");

  const { albums, status } = useSelector((state) => state.album);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let filterdAlbums = albums.filter(
    (album) =>
      album.name.toLowerCase().includes(albumSearchText.toLowerCase()) ||
      album.description?.toLowerCase().includes(albumSearchText.toLowerCase()),
  );

  useEffect(() => {
    const validateUserLogin = async () => {
      if (!token) {
        return navigate("/login");
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/loggedUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(response.data?.user);
        localStorage.setItem("userId", response.data?.user.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      validateUserLogin();
    }
  }, [token, navigate, setUser]);

  useEffect(() => {
    const fetchAlbums = () => {
      dispatch(fetchAlbumAsync());
    };

    fetchAlbums();
  }, [dispatch]);

  const handleOnChangeDescription = (e) => {
    setAlbum((prevStat) => ({ ...prevStat, [e.target.name]: e.target.value }));
  };

  const handleModalToggle = (album) => {
    setAlbum(album);
    setIsModalOpen(true);
  };

  const handleUpdateDescription = async () => {
    try {
      await dispatch(editAlbumDescriptionAsync(album)).unwrap();
      setAlbum(initialAlbum);

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container py-4">
      {isModalOpen && (
        <Modal
          title={"Update description"}
          btnText={"Save"}
          isDisabled={status === "Loading"}
          onSave={handleUpdateDescription}
          type="button"
          onclose={() => setIsModalOpen((prevStat) => !prevStat)}
        >
          <UpdateAlbumForm
            album={album}
            handleOnChangeDescription={handleOnChangeDescription}
          />
        </Modal>
      )}

      <div className="container py-5">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="fw-bold mb-3 mb-md-0">
            <i className="bi bi-images me-2 text-primary"></i>
            All Albums ({albums.length})
          </h2>

          <Link to="add" className="btn btn-primary shadow-sm">
            <i className="bi bi-plus-circle me-2"></i>
            Create Album
          </Link>
        </div>
        <div>
          <h2> Welcome {user.name}</h2>
        </div>

        {/* ALBUM GRID */}
        <div className="row g-4 py-4">
          {status === "Loading" ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : filterdAlbums && filterdAlbums.length !== 0 ? (
            filterdAlbums.map((album) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={album.id}>
                <div
                  className="card border-0 shadow-sm h-100 overflow-hidden"
                  style={{
                    borderRadius: "18px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link
                    to={album.id}
                    className="text-decoration-none text-dark"
                  >
                    {/* Cover Image */}
                    <div className="position-relative">
                      <img
                        src={
                          album.coverImage ||
                          "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg"
                        }
                        alt="Album Cover"
                        className="card-img-top"
                        style={{
                          height: "240px",
                          objectFit: "cover",
                        }}
                      />

                      {/* Album Count Badge (Optional) */}
                      <span
                        className="badge bg-dark position-absolute"
                        style={{
                          top: "12px",
                          left: "12px",
                          borderRadius: "20px",
                        }}
                      >
                        {album.name}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column px-4">
                      <p
                        className="text-muted text-center small mb-1"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: "40px",
                        }}
                      >
                        {album.description || "No description available"}
                      </p>

                      <div className="mt-auto text-center">
                        <span className="badge text-bg-light border px-3">
                          👤 {album?.ownerId?.name}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Edit Button */}
                  {user.email === album?.ownerId?.email && (
                    <button
                      className="btn btn-light shadow-sm position-absolute d-flex justify-content-center align-items-center"
                      style={{
                        top: "5px",
                        right: "5px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        zIndex: 10,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                      }}
                      onClick={() => handleModalToggle(album)}
                    >
                      <FiEdit2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <i
                className="bi bi-folder-x text-muted"
                style={{ fontSize: "50px" }}
              ></i>
              <p className="mt-3 text-muted">No albums found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Album;
