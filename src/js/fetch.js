export default class Artist {
   artistSelect = this.artistSelect;

   artists = {
        name: this.name,
        count: this.count,
        area: this.area,
        lifeSpan: this.lifeSpan,
        id: this.id
   };

   artistsWorks = []
   

    
    searchArtist() {
        fetch(`https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`)
            .then(data => data.json())
            .then(data => data.artists[0])
            .then(response => {
                console.log(response)
                
                try {
                    this.artists.name = response.name;
                    this.artists.count = response.score;
                    this.artists.area = response.area.name;
                    this.artists.lifeSpan = response.area["life-span"];
                    
                } catch (error) {
                    
                    console.log(error)
                }
                this.artists.id = response.id;
                

                document.querySelectorAll("h2")[0].innerHTML = `O nome completo é ${this.artists.name}`;
                document.querySelectorAll('h2')[1].innerHTML = `A contagem é ${this.artists.count}`;
                document.querySelectorAll("h2")[2].innerHTML = `Ele veio de ${this.artists.area}`;
        
                this.searchArtistWork();
                
                console.log(this.artists);
            })
    }

    searchArtistWork() {
        fetch(`https://musicbrainz.org/ws/2/release-group?fmt=json&artist=${this.artists.id}`)
         .then(data => data.json())
         .then(response => {
            this.artistsWorks.push(response["release-groups"])

            for(let i = 0; i < this.artistsWorks.length;i++) {
                console.log(this.artistsWorks[i])
            }
         })

    }

}
