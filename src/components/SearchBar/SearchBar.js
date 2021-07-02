import {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

import ApiService from "../../services/apiService.js";

import './SearchBar.scss';

const useStyles = makeStyles((theme) => ({
    pagination: {
      '& > *': {
        justifyContent: 'center',
        margin: theme.spacing(2)
      },
    },
  }));

const SearchBar = () => {
    const classes = useStyles();
    const [item, setItem] = useState('');
    const [tracks, setTracks] = useState({});
    const [trackItems, setTrackItems] = useState([])

    const handleChange = (event) => {
        setItem(event.target.value);
    }

    const getArtistsName = (artists) => {
        return artists.map( artist => artist.name).toString()
    }

    const getPages = (tracks) => {
        return (tracks.total/tracks.limit).toFixed();
    }

    const searchItem = async () => {
        if (item) {
            try {
                const response = await ApiService.searchTracks(item);
                if (!response || !response.data.tracks || response.data.tracks.items.length === 0) {
                    alert('No se han encontrado resultados para esta búsqueda');
                } else {
                    setTracks(response.data.tracks);
                    console.log(response.data.tracks);
                    setTrackItems(response.data.tracks.items);
                    setItem('');
                }
            } catch(error) {
                console.error(error);
                alert('No se ha podido realizar la búsqueda');
            }
        } else {
            alert('Introduce algún valor en barra de búsqueda');
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
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
                </Grid>
                {
                    trackItems.length > 0 ? 
                    
                    <GridList cellHeight={640} item>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    </GridListTile>
                        {trackItems.map((item) => (
                            <GridListTile key={item.id}>
                                <img src={item.album.images[0].url} alt={item.name} />
                                <GridListTileBar
                                        title={item.name}
                                        subtitle={<span>by: {getArtistsName(item.artists)}</span>}
                                        actionIcon={
                                            <IconButton aria-label={`info about ${item.name}`}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                }
                                />
                            </GridListTile>
                            ))}
                    </GridList>
                    : ''
                }

            </Grid>
            <div className="pagination-bar">
                {getPages(tracks) > 0 ?
                    <Pagination className={classes.pagination} count={getPages(tracks)} color="primary" size="large" />
      
                    :''
                }
            </div>
        </>
    )
}

export default SearchBar;