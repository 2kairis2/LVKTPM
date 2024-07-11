function Image({ src, alt, className }) {
  return (
    <img src={"http://localhost:8080" + src} alt={alt} className={className} />
  );
}

export default Image;
