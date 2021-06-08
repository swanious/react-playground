import React, { useState, useCallback } from 'react';
import NewsList from 'components/News/NewsList';
import Categories from 'components/News/Categories';

function NewsSample() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </>
  );
}

export default NewsSample;
