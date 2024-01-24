export default class Artist {
  artistSelect = this.artistSelect;
  tbody = document.querySelector("tbody")

  artists = {
    name: this.name,
    count: this.count,
    area: this.area,
    lifeSpan: this.lifeSpan,
    id: this.id,
  };

  artistsWork = {
    works: [],
    type: [],
    launch: [],
  };

  searchArtist() {
    document.querySelector(".loading").classList.remove("hidden");
    document.querySelector(".response").classList.add("hidden");

    fetch(
      `https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`
    )
      .then((data) => data.json())
      .then((data) => data.artists[0])
      .then((response) => {
        document.querySelector(".loading").classList.add("hidden");
        document.querySelector(".response").classList.remove("hidden");
        document.querySelector(".more").classList.remove("hidden");

        try {
          this.artists.name = response.name;
          this.artists.count = response.score;
          this.artists.area = response.area.name;
          this.artists.lifeSpan = response.area["life-span"];
        } catch (error) {
          console.log(error);
        }
        this.artists.id = response.id;

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
          this.artistsWork.type.push(releaseGroups[i]["primary-type"])
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
    document.querySelector(".response").classList.add("hidden");
    document.querySelector(".more").classList.add("hidden");
  }

  createTable() {
    
    for (let i = 0; i < this.artistsWork.works.length; i++) {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      const type = document.createElement("td");
      const release = document.createElement("td");

      tr.appendChild(name);
      tr.appendChild(type)
      tr.appendChild(release);

      name.innerHTML = this.artistsWork.works[i];
      type.innerHTML = this.artistsWork.type[i];
      release.innerHTML = this.artistsWork.launch[i];

      this.tbody.appendChild(tr);
    }
  }

  removeTable() {

    this.tbody.innerHTML = "";

    this.artistsWork.works = [];
    this.artistsWork.launch = [];
    this.artistsWork.type = [];
  }
}
