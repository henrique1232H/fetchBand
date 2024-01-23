export default class Artist {
   artistSelect = this.artistSelect;

   artists = {
        name: this.name,
        count: this.count,
        area: this.area,
        lifeSpan: this.lifeSpan,
        id: this.id
   };

   artistsWork = {
        works: [],
        launch: []
   }
       
    searchArtist() {
        document.querySelector(".loading").classList.remove("hidden");
        document.querySelector(".response").classList.add("hidden");

        fetch(`https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`)
            .then(data => data.json())
            .then(data => data.artists[0])
            .then(response => {           
                     
                try {
                    this.artists.name = response.name;
                    this.artists.count = response.score;
                    this.artists.area = response.area.name;
                    this.artists.lifeSpan = response.area["life-span"];
                    
                } catch (error) {
                    console.log(error)
                }

                this.artists.id = response.id;
                
                document.querySelector(".loading").classList.add("hidden");
                document.querySelector(".response").classList.remove("hidden");
                document.querySelector(".more").classList.remove("hidden");

                this.showMessages()
                this.searchArtistWork();
                
                console.log(this.artists);
            })
    }

    searchArtistWork() {
        fetch(`https://musicbrainz.org/ws/2/release-group?fmt=json&artist=${this.artists.id}`)
         .then(data => data.json())
         .then(response => {
            const releaseGroups = response["release-groups"];
            console.log(releaseGroups)

            for(let i = 0; i < releaseGroups.length;i++) {
                this.artistsWork.works.push(releaseGroups[i].title);
                this.artistsWork.launch.push(releaseGroups[i]["first-release-date"])
            }

            this.createTable()
         })

    }

    showMessages() {
        document.querySelectorAll("h2")[0].innerHTML = `O nome completo é ${this.artists.name}`;
        document.querySelectorAll('h2')[1].innerHTML = `A contagem é ${this.artists.count}`;
        document.querySelectorAll("h2")[2].innerHTML = `Ele veio de ${this.artists.area}`;
    }


    createTable() {
        console.log(this.artistsWork.launch)
        console.log(this.artistsWork.works)
    }
}
