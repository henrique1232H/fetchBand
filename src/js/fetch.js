export default class Artist {
  tbody = document.querySelector("tbody");
  loading = document.querySelector(".loading");
  response = document.querySelector(".response");
  more = document.querySelector(".more");

  artistSelect = this.artistSelect;

  artists = {
    name: this.name,
    count: this.count,
    area: this.area,
    lifeSpan: this.lifeSpan,
    id: this.id,
  };

  artistsWork = {
    works: [],
    firstType: [],
    secondayType: [],
    launch: [],
  };

  searchArtist() {
    this.loading.classList.remove("hidden");
    this.response.classList.add("hidden");

    fetch(
      `https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`
    )
      .then((data) => data.json())
      .then((data) => data.artists[0])
      .then((response) => {

        this.loading.classList.add("hidden");
        this.response.classList.remove("hidden");
        this.more.classList.remove("hidden");

        try {
          this.artists.name = response.name;
          this.artists.count = response.score;
          this.artists.lifeSpan = response.area["life-span"];
        } catch (error) {

          console.log(error);
        }
        
        try {
          this.artists.area = response.area.name;
          this.artists.id = response.id;

        } catch(err) {
          document.querySelectorAll("h2")[0].innerHTML = "Esse artista não existe, digite outra"
          this.more.classList.add("hidden");
          return;
        }

        this.showMessages();
        this.searchArtistWork();
        this.removeTable();
      });
  }

  searchArtistWork() {
    fetch(
      `https://musicbrainz.org/ws/2/release-group?fmt=json&artist=${this.artists.id}`
    )
      .then((data) => data.json())
      .then((response) => {
        const releaseGroups = response["release-groups"];
        
        for (let i = 0; i < releaseGroups.length; i++) {
          this.artistsWork.works.push(releaseGroups[i].title);
          this.artistsWork.launch.push(releaseGroups[i]["first-release-date"]);
          this.artistsWork.firstType.push(releaseGroups[i]["primary-type"])
          this.artistsWork.secondayType.push(releaseGroups[i]["secondary-types"][0])
          
        }

        this.createTable();
      });
  }

  showMessages() {
    document.querySelectorAll("h2")[0].innerHTML = `O nome completo é ${this.artists.name}`;
    document.querySelectorAll("h2")[1].innerHTML = `A contagem é ${this.artists.count}`;
    document.querySelectorAll("h2")[2].innerHTML = `Ele veio de ${this.artists.area}`;
  }

  removeResponseAndMore() {
    this.response.classList.add("hidden");
    this.more.classList.add("hidden");
  }

  createTable() {
    
    for (let i = 0; i < this.artistsWork.works.length; i++) {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      const type = document.createElement("td");
      const release = document.createElement("td");

      tr.appendChild(name);
      tr.appendChild(type);
      tr.appendChild(release);

      name.innerHTML = this.artistsWork.works[i];

      if(this.artistsWork.launch[i] === "") {
        release.innerHTML = "N/A";
      }else {
        release.innerHTML = this.artistsWork.launch[i];
      }


      if(typeof this.artistsWork.secondayType[i] === "undefined") {
        type.innerHTML = this.artistsWork.firstType[i];
      } else {
        type.innerHTML = `${this.artistsWork.firstType[i]} / ${this.artistsWork.secondayType[i]}`
      }


      this.tbody.appendChild(tr);
    }
  }

  removeTable() {
    this.tbody.innerHTML = "";
    this.artistsWork.works = [];
    this.artistsWork.launch = [];
    this.artistsWork.firstType = [];
    this.artistsWork.secondayType = []
  }
}
