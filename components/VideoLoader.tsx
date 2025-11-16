import React from 'react';

interface VideoLoaderProps {
  status: string;
}

const VideoLoader: React.FC<VideoLoaderProps> = ({ status }) => {
  const messages = [
    "Composing the opening scene...",
    "Adjusting the lighting...",
    "Directing the digital actors...",
    "Rendering cinematic frames...",
    "Adding special effects...",
    "Finalizing the color grade...",
    "This is taking longer than usual, but great art takes time!"
  ];
  const [creativeMessage, setCreativeMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setCreativeMessage(messages[index]);
    }, 6000); // Change message every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-100 font-semibold text-sm">{status}</p>
      <p className="mt-2 text-purple-400 text-xs animate-pulse">{creativeMessage}</p>
    </div>
  );
};

export default VideoLoader;
