import { AiOutlineCloseCircle } from "react-icons/ai";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1055,
      }}
      onClick={onClose}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "90%",
          maxWidth: "500px",
          borderRadius: "16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body text-center p-4 p-md-5">
          <AiOutlineCloseCircle
            size={80}
            className="text-danger mb-3"
          />

          <h3 className="fw-bold text-danger mb-3">
            Error
          </h3>

          <p className="text-muted mb-4">
            {message}
          </p>

          <button
            className="btn btn-danger px-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;