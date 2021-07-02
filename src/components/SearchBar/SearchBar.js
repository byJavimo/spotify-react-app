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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ApiService from "../../services/apiService.js";

import './SearchBar.scss';

const useStyles = makeStyles((theme) => ({
    pagination: {
      '& > *': {
        justifyContent: 'center',
        margin: theme.spacing(2)
      }
    },
  }));

const SearchBar = () => {
    const classes = useStyles();
    const [item, setItem] = useState('');
    const [tracks, setTracks] = useState({});
    const [playlists, setPlaylists] = useState({});
    const [albums, setAlbums] = useState({});
    const [artists, setArtists] = useState({});
    const [page, setPage] = useState(1);

    const handleChange = (event) => {
        setItem(event.target.value);
    }

    const handlePagination = (event, value) => {
        const pageLimit = 5;
        searchItems(pageLimit * value);
        setPage(value);
    }

    const renderTypeBlock = (id, type) => {
        if (type?.items?.length > 0) {
            return (
                <GridList cellHeight={320} cols={3}>
                        {type?.items?.map((item) => (
                            
                            <GridListTile key={item.id} cols={1}>
                                {
                                    id === 'tracks' ? 
                                    <>
                                       <img src={item.album?.images[0].url} alt={item.name} />
                                        <GridListTileBar
                                                title={item.name}
                                                subtitle={<span>by: {getArtistsName(item.artists)}</span>}
                                                actionIcon={
                                                <IconButton aria-label={`info about ${item.name}`}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                        }
                                        />
                                    </>
                                    : ''
                                }
                                {
                                    id === 'artists' ? 
                                    <>
                                       <img src={item.images[0].url} alt={item.name} />
                                        <GridListTileBar
                                                title={item.name}
                                                actionIcon={
                                                <IconButton aria-label={`info about ${item.name}`}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                        }
                                        />
                                    </>
                                    : ''
                                }
                                {
                                    id === 'albums' ? 
                                    <>
                                       <img src={item?.images[0].url} alt={item.name} />
                                        <GridListTileBar
                                                title={item.name}
                                                actionIcon={
                                                <IconButton aria-label={`info about ${item.name}`}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                        }
                                        />
                                    </>
                                    : ''
                                }
                                {
                                    id === 'playlists' ? 
                                    <>
                                       <img src={item?.images[0].url} alt={item.name} />
                                        <GridListTileBar
                                                title={item.name}
                                                subtitle={<span>by: {item.description}</span>}
                                                actionIcon={
                                                <IconButton aria-label={`info about ${item.name}`}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                        }
                                        />
                                    </>
                                    : ''
                                }
                             
                            </GridListTile>
                            ))}
                    </GridList>
            )
        }
    }

    const hasResults = (data) => {
        return data.items?.length > 0
    }

    const getArtistsName = (artists) => {
        return artists?.map( artist => artist.name).toString()
    }

    const getPages = (tracks) => {
        return (tracks.total/tracks.limit).toFixed();
    }

    const searchItems = async (paginationOffSet) => {
        if (item) {
            try {
                const response = await ApiService.searchTracks(item, paginationOffSet);
                if (!response) {
                        alert('No se han encontrado resultados para esta búsqueda');
                } else {
                    setTracks(response.data.tracks);
                    setPlaylists(response.data.playlists);
                    setAlbums(response.data.albums);
                    setArtists(response.data.artists);
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
                        <Button onClick={() => searchItems()}
                                startIcon={<SearchIcon />}
                                className='search-button'
                                variant="contained"
                                color="primary">
                                    Search 
                        </Button>
                    </form>
                </Grid>
                {
                    !hasResults(tracks) ? '' :
                        <>
                            <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="tracks"
                                    id="tracks"
                                >
                                    Tracks
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Renderizar bloque de canciones */}
                                    {renderTypeBlock('tracks',tracks)}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                }
                {
                    !hasResults(artists) ? '' :
                    <>
                    <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="artists"
                                    id="artists"
                                >
                                    Artists
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Renderizar bloque de artistas */}
                                    {renderTypeBlock('artists',artists)}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                }
                {
                    !hasResults(albums) ? '' :
                    <>
                    <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="albums"
                                    id="albums"
                                >
                                    Albums
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Renderizar bloque de albums */}
                                    {renderTypeBlock('albums',albums)}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                }
                {
                    !hasResults(playlists) ? '' :
                    <>
                    <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="playlists"
                                    id="playlists"
                                >
                                    Playlists
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Renderizar bloque de artistas */}
                                    {renderTypeBlock('playlists',playlists)}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </>
                }
            </Grid>
            <div className="pagination-bar">
                {getPages(tracks) > 0 ?
                    <Pagination className={classes.pagination} count={getPages(tracks)} page={page} onChange={handlePagination} showFirstButton showLastButton color="primary" size="large" />
      
                    :''
                }
            </div>
        </>
    )
}

export default SearchBar;