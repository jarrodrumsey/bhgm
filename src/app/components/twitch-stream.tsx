import React from 'react';

export const TwitchStream = (props : {channel: string, width: number, height: number, className?: string}) => {
  const srcUrl = `https://player.twitch.tv/?channel=${props.channel}&parent=localhost`;

  return (
    <div className="stream-container">
      <iframe
        src={srcUrl}
        height={props.height}
        width={props.width}
        allowFullScreen={true}
        className={`${props.className ?? ''} absolute top-0 left-0 bottom-0 right-0 w-full h-full`}
      ></iframe>
      <style jsx>{`
        .stream-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            aspect-ratio: 16/9;
        }
      `}</style>
    </div>
  );
};

export default TwitchStream;
