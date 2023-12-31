import { useEffect, useState } from 'react';

const New = () => {
  const [imageFilenames, setImageFilenames] = useState([
"craft.png", "soap.png", "whale.jpeg", "basket.png", "sun.png", "vase.png"
  ]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const populateLatestFinds = () => {
    const newImageFilenames = [...imageFilenames];
    shuffleArray(newImageFilenames);
    setImageFilenames(newImageFilenames);
  }

  useEffect(() => {
    populateLatestFinds();
    const intervalId = setInterval(populateLatestFinds, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
<div className="container mt-5">
  <h2 className="text-center">Latest Finds</h2>
  <div id="latest-finds-carousel" className="carousel slide d-flex align-items-center" data-ride="carousel">
    <div className="carousel-inner d-flex space-around row">
      <div className="carousel-item active d-flex justify-content-center">
        <img src={`/images/${imageFilenames[0]}`} alt={`Latest Find 0`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
      <div className="carousel-item d-flex justify-content-center">
        <img src={`/images/${imageFilenames[1]}`} alt={`Latest Find 1`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
      <div className="carousel-item d-flex justify-content-center">
        <img src={`/images/${imageFilenames[2]}`} alt={`Latest Find 2`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
      <div className="carousel-item d-flex justify-content-center">
        <img src={`/images/${imageFilenames[3]}`} alt={`Latest Find 3`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
      <div className="carousel-item active d-flex justify-content-center">
        <img src={`/images/${imageFilenames[4]}`} alt={`Latest Find 4`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
      <div className="carousel-item active d-flex justify-content-center">
        <img src={`/images/${imageFilenames[5]}`} alt={`Latest Find 5`} className="img-fluid m-2" style={{ maxHeight: '120px' }} />
      </div>
    </div>
  </div>
</div>
  );
}

export default New;