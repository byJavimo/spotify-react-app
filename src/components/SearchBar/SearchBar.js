import React from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import './SearchBar.scss';



const SearchBar = () => {
    const [item, setItem] = React.useState('')

    const handleChange = (event) => {
        console.log('Handle change', event.target.value);
        setItem(event.target.value);
    }

    const searchItem = () => {
        console.log('Search item', item);
        setItem('');
    }

    return (
        <form className='search-bar' noValidate autoComplete="off">
            <TextField id="outlined-basic" className="search-input" label="Search track" variant="outlined" value={item} onChange={handleChange}/>
            <Button onClick={searchItem}
                    startIcon={<SearchIcon />}
                    className='search-button'
                    variant="contained"
                    color="primary">
                         Search 
            </Button>
        </form>
    
    )
}

export default SearchBar;