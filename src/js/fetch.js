export default class Artist {
   artistSelect = this.artistSelect;

   artists = {
        name: this.name,
        count: this.count,
        area: this.area,
        lifeSpan: this.lifeSpan,
        id: this.id
   }
   

    
    searchArtist() {
        fetch(`https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`)
            .then(data => data.json())
            .then(data => data.artists)
            .then(html => {
                
                this.artists.name = html[0].name;
                this.artists.count = html[0].score;
                this.artists.area = html[0].area.name;
                this.artists.lifeSpan = html[0].area["life-span"];
                this.artists.id = html[0].id;

                console.log(this.artists)
            })
    }

}