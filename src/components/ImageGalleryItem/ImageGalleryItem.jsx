import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ arrayObjects, onClick }) {
  return arrayObjects.map(el => (
    <ImageItem className="gallery-item" key={el.id}>
      <Image
        src={el.webformatURL}
        alt=""
        onClick={() => onClick(el.largeImageURL)}
      />
    </ImageItem>
  ));
}

ImageGalleryItem.propTypes = {
  arrayObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
