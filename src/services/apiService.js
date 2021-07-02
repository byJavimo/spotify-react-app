import axios from 'axios';

class ApiService  {
    constructor() {
        // It is needed to refresh the token each hour for teh application to work: https://developer.spotify.com/console/get-search-item/?q=&type=&market=&limit=&offset=&include_external=
        this.token = 'BQCKhbgAsLbSbM1DOJ9QyzZablxH7k7xWKga4MCe2VrCT4tP9BM4GyYa5XMfnz7N1k2q6gq6pCPXcdhG1mCJF6dy1pbyUpoiiAwOSbFYlLfQfoWxktmMM3uBPpWUTcOQTXoVu6Xbtr0pzVBF';
    }

    async searchTracks (query, paginationOffset = 0) {
        const limit = 5;
        return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track,album,playlist,artist&offset=${paginationOffset}&limit=${limit}`, {headers: {Authorization: 'Bearer ' + this.token}});
    }
}

export default new ApiService()