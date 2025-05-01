
function SoundCloudEmbed({ embedUrl, description }) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-700 p-2">
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
      ></iframe>
      {description && <p className="mt-2 text-sm italic">{description}</p>}
    </div>
  )
}

export default SoundCloudEmbed
