import axios from 'axios';

class ApiService  {
    constructor() {
        this.token = 'BQD5x56CPz7-YY6MW_gN_1AQTvAKjGyPHUeBwn3v-mefMMpNoZrpmJngaMqrTPysVlXgYpMZgKTIllmXIWPzN-DAC5HgPmrvkyNHY1_ko_Y2udq6I3ArZCTCRGE-jBhOOuujctCzGWHtqS8B';
    }

    async searchTracks (query) {
        return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {headers: {Authorization: 'Bearer ' + this.token}});
    }
}

export default new ApiService()