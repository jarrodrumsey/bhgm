import React from 'react';

export const TwitchStream = (props : {channel: string, width: number, height: number, className?: string}) => {
  const srcUrl = `https://player.twitch.tv/?channel=${props.channel}&parent=localhost`;

  return (
    <div className="stream-container">

    </div>
  );
};

export default TwitchStream;
