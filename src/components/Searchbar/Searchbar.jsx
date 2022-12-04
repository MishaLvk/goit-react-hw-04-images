import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleRequestChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (request.trim() === '') {
      Notify.info('введіть пошуковий запит');
      return;
    }
    onSubmit(request);
    setRequest(request);
  };

  return (
    <SearchBar className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <IconSearch />
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          onChange={handleRequestChange}
          value={request}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
