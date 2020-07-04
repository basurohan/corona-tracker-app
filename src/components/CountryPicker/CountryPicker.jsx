import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api/index';

const CountryPicker = ( { handleCountryChange } ) => {

    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        const fetchCountryList = async () => {
            setCountryList(await fetchCountries());
        }
        fetchCountryList();
    }, [setCountryList]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {countryList.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                ))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;