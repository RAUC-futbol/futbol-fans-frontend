const HighlightVideo = ({ highlight }) => {
    const { strEvent, strVideo, strThumb } = highlight;
  
    return (
      <div className="highlight-video-container">
        <h3>{strEvent}</h3>
        <a href={strVideo} target="_blank" rel="noopener noreferrer">
          <img src={strThumb} alt={strEvent} className="thumbnail" />
        </a>
      </div>
    );
  };
  
  export default HighlightVideo;
