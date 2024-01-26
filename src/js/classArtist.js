export default class Artist {
  tbody = document.querySelector("tbody");
  loading = document.querySelector(".loading");
  response = document.querySelector(".response");
  more = document.querySelector(".more");
  menu = document.querySelector(".sectionShowArtists");
  ul = document.querySelector("ul");

  artistSelect = this.artistSelect;

  artistsInTheMenu = {
    artists: [],
    artistChoosed: this.artistChoosed
  };

  artists = {
    name: this.name,
    count: this.count,
    area: this.area,
    lifeSpan: this.lifeSpan,
    id: this.id,
    type: this.type,
  };

  artistsWork = {
    works: [],
    firstType: [],
    secondayType: [],
    launch: [],
  };

  menuArtist() {
    this.loading.classList.remove("hidden");
    this.response.classList.add("hiddenButNotDisplayNone");

    fetch(
      `https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`
    )
      .then((data) => data.json())
      .then((data) => data.artists)
      .then((data) => {
        this.removeLoading();


        if(data.length === 0) {
          this.removeMessages()
          document.querySelector(".err").classList.remove("hidden")
          document.querySelector(".err").innerHTML = "Esse artista não existe";
          return;
        }

        this.menu.classList.remove("hidden");

        let value = -1        

        data.forEach((e) => {
          this.artistsInTheMenu.artists.push(e);
        });



        this.artistsInTheMenu.artists.forEach(object => {
          
          value++

          const li = document.createElement("li");
          const button = document.createElement("button");


          button.value = value;

          button.addEventListener("click", () => {
            this.artistsInTheMenu.artistChoosed = object.id;

            const number = Number(button.value)

            this.searchArtist(number)
            this.menu.classList.add("hidden");
          })


          // Colocar os nomes dos artistas, o tipo e o que ele faz nos botões

          button.innerHTML = `${object.name} / ${object.type} / ${object.disambiguation}`
          
          if(typeof object.type === "undefined") {
            button.innerHTML = `${object.name} / ${object.disambiguation}`
          }
          
          if(typeof object.disambiguation === "undefined") {
            button.innerHTML = `${object.name} / ${object.type}`
          }
          
        
          if(typeof object.type === "undefined" && typeof object.disambiguation === "undefined") {
            button.innerHTML = `${object.name}`
          }
          
          

          li.appendChild(button)
          this.ul.appendChild(li)
          
        })

      });
  }

  searchArtist(id) {
    this.loading.classList.remove("hidden");
    this.response.classList.add("hiddenButNotDisplayNone");

    fetch(
      `https://musicbrainz.org/ws/2/artist?fmt=json&query=${this.artistSelect}`
    )
      .then((data) => data.json())
      .then((response) => response.artists[id])
      .then(response => {

        this.removeLoading();

        try {
          this.artists.name = response.name;
          this.artists.count = response.score;
          this.artists.lifeSpan = response["life-span"];
          this.artists.type = response.type;
        } catch (error) {
          console.log(error);
        }

        try {
          this.artists.area = response.area.name;
          this.artists.id = response.id;
        } catch (err) {
          document.querySelectorAll("h2")[0].innerHTML =
            "Não temos informações desse artista, por favor procure outro";
            document.querySelectorAll("h2")[1].innerHTML = ""
            document.querySelectorAll("h2")[2].innerHTML = ""
            this.more.classList.add("hiddenButNotDisplayNone")
            this.removeTable()
            return
        }

        this.showMessages();
        this.searchArtistWork();
        this.removeTable();
      })
  }

  searchArtistWork() {
    fetch(
      `https://musicbrainz.org/ws/2/release-group?fmt=json&artist=${this.artists.id}`
    )
      .then((data) => data.json())
      .then((response) => {
        const releaseGroups = response["release-groups"];
        console.log(releaseGroups)

        releaseGroups.forEach((e) => {
          this.artistsWork.works.push(e.title);
          this.artistsWork.launch.push(e["first-release-date"]);
          this.artistsWork.firstType.push(e["primary-type"]);
          this.artistsWork.secondayType.push(e["secondary-types"][0]);
        });

        this.createTable();
      });
  }

  showMessages() {
    
    document.querySelectorAll("h2")[0].innerHTML = `O nome completo é ${this.artists.name}`;
    document.querySelectorAll("h2")[1].innerHTML = `A contagem é ${this.artists.count}`;
    document.querySelectorAll("h2")[2].innerHTML = `Ele veio de ${this.artists.area}`;

    this.artists.type === "Person"
      ? (document.querySelectorAll("h1")[1].innerHTML = `Trabalhos feitos por ${this.artists.name}`)
      : (document.querySelectorAll("h1")[1].innerHTML = `Trabalhos feitos pela banda ${this.artists.name}`);
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

      this.artistsWork.launch[i] === ""
        ? (release.innerHTML = "N/A*")
        : (release.innerHTML = this.artistsWork.launch[i]);

      typeof this.artistsWork.secondayType[i] === "undefined"
        ? (type.innerHTML = this.artistsWork.firstType[i])
        : (type.innerHTML = `${this.artistsWork.secondayType[i]}`);

      if (typeof this.artistsWork.firstType[i] === "object") {
        type.innerHTML = "N/A*";
      }

      this.tbody.appendChild(tr);
    }
  }

  removeResponseAndMore() {
    this.response.classList.add("hiddenButNotDisplayNone");
    this.more.classList.add("hiddenButNotDisplayNone");
  }

  removeLoading() {
    this.loading.classList.add("hidden");
    this.response.classList.remove("hiddenButNotDisplayNone");
    this.more.classList.remove("hiddenButNotDisplayNone");
  }

  removeMessages() {
    document.querySelectorAll("h2")[0].innerHTML = ``;
    document.querySelectorAll("h2")[1].innerHTML = ``;
    document.querySelectorAll("h2")[2].innerHTML = ``;

    this.more.classList.add("hiddenButNotDisplayNone")
  }

  removeTable() {
    this.tbody.innerHTML = "";
    this.ul.innerHTML = "";
    this.artistsInTheMenu.artistChoosed = "";


    this.artistsInTheMenu.artists = [];
    this.artistsWork.works = [];
    this.artistsWork.launch = [];
    this.artistsWork.firstType = [];
    this.artistsWork.secondayType = [];
  }
}
