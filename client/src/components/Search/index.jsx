import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { saveItemIds, getSavedItemIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_ITEM } from '../utils/mutations';

const SearchItems = () => {

    const [searchedItems, setSearchedItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved ItemId values
    const [savedItemIds, setSavedItemIds] = useState(getSavedItemIds());
  
    const [saveItem] = useMutation(SAVE_ITEM);
}

return ();

export default SearchItems;