export const ReelPopupModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay">
      <div className="reel-popup AddReelsBody">
        <button
          onClick={onClose}
          className="bi bi-x-circle-fill CloseReelPopup"
          style={{ fontSize: '25px', position: 'absolute', 
            top: '10px', right: '10px', background: 
            'none', border: 'none', cursor: 'pointer',
            color: 'var(--TxtColor)', zIndex: 1000 
        }}
          aria-label="Close"
        >
        </button>
        {children}
      </div>
    </div>
  );
};




export const PhotoVideoPopupModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay">
      <div className="Post-popup AddPostBody">
        <button
          onClick={onClose}
          className="bi bi-x-circle-fill CloseReelPopup"
          style={{ fontSize: '25px', position: 'absolute', 
            top: '10px', right: '10px', background: 
            'none', border: 'none', cursor: 'pointer',
            color: 'var(--TxtColor)', zIndex: 1000 
        }}
          aria-label="Close"
        >
        </button>
        {children}
      </div>
    </div>
  );
};








export const PhotoPopupModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay" onClick={onClose}>
      <div className="Photo-popup AddPostBody"
      onClick={e => e.stopPropagation()} // Prevent overlay click from closing
      >
        {children}
      </div>
    </div>
  );
};









export const VideoPopupModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay" onClick={onClose}>
      <div
        className="Video-popup AddPostBody"
        onClick={e => e.stopPropagation()} // Prevent overlay click from closing
      >

        {children}
      </div>
    </div>
  );
};







export const FollowingModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay" onClick={onClose}>
      <div
        className="Video-popup AddPostBody"
        onClick={e => e.stopPropagation()} // Prevent overlay click from closing
      >

        {children}
      </div>
    </div>
  );
};




export const FollowersModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="reel-popup-overlay" onClick={onClose}>
      <div
        className="Video-popup AddPostBody"
        onClick={e => e.stopPropagation()} // Prevent overlay click from closing
      >

        {children}
      </div>
    </div>
  );
};