import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from 'components/Loader/Loader';
import { Wrapper } from './App.styled';

import { getImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';

export const App = () => {
  const [request, setRequest] = useState('');
  const [arrayObjects, setArrayObjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [activeButton, setActiveButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (request !== '') {
      async function select() {
        try {
          setIsLoadingImage(true);
          const images = await getImages({ request, page, controller });
          if (images.hits.length === 0) {
            Notify.info('забражень не знайдено');
            setActiveButton(false);
            return;
          }
          setArrayObjects(prev => [...prev, ...images.hits]);

          setActiveButton(true);
        } catch (eror) {
          Notify.info('зображень немає');
          setActiveButton(false);
        } finally {
          setIsLoadingImage(false);
        }
      }

      select();
      return () => {
        controller.abort();
      };
    }
  }, [request, page]);

  const handleFormSubmit = value => {
    if (request !== value) {
      setRequest(value);
      setPage(1);
      setArrayObjects([]);
      setActiveButton(false);
    } else {
      Notify.info('ви переглядаєте ' + value);
    }
  };

  const selectedImg = imageUrl => {
    setSelectedImage(imageUrl);
    setModal(true);
  };

  const toggleModal = () => {
    setModal(false);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />

      {arrayObjects.length !== 0 && (
        <ImageGallery>
          <ImageGalleryItem arrayObjects={arrayObjects} onClick={selectedImg} />
        </ImageGallery>
      )}

      <Loader isLoadingImage={isLoadingImage} />
      {activeButton && <LoadMoreButton onClick={loadMore} />}

      {modal && (
        <Modal selectedImage={selectedImage} closeModal={toggleModal} />
      )}
    </Wrapper>
  );
};
