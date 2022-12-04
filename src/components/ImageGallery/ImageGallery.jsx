import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ children }) {
  return <Gallery className="gallery">{children}</Gallery>;
}

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};
