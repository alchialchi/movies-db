import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" aria-label="Close trailer modal" onClick={onClose}>×</button>
      <ReactPlayer
        className="video-player"
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls={true}
        playing={true}
        data-testid="youtube-player"
        width="90%"
        height="90%"
      />
    </div>
  </div>
);

export default YoutubePlayer;