import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
  } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { saveProductIds, getSavedProductIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_PRODUCT } from '../utils/mutations';

const SearchProducts = () => {

    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved ItemId values
    const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());
  
    const [saveProduct] = useMutation(SAVE_PRODUCT);

    // return ();
}



export default SearchProducts;