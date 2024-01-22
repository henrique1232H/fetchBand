import Artist from "./fetch.js";

export const form = () => {
    const form = document.querySelector("form");
    const input = form.querySelector("input");
    const artist = new Artist()

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        
        artist.artistSelect = input.value;

        artist.searchArtist();

        console.log(artist.artists);

        document.querySelectorAll("h1")[1].innerHTML = `O nome completo é ${artist.artists.name}`;
        document.querySelector('h2').innerHTML = `A contagem é ${artist.artists.count}`;
        document.querySelector("h3").innerHTML = `Ele veio de ${artist.artists.area}`;

        
        
    })
}