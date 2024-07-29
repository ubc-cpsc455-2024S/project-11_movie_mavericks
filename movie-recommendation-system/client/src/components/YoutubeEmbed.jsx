import React from "react";

const YoutubeEmbed = ({ videoID, title }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${videoID}`}
      title={title}
      allowFullScreen
    />
  </div>
);

export default YoutubeEmbed;
