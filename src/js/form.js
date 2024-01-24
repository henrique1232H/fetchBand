import Artist from "./fetch.js";

export const form = () => {
    const form = document.querySelector("form");
    const input = form.querySelector("input");
    const artist = new Artist();

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        if(input.value === "") {
            document.querySelector(".err").classList.remove("hidden")
            return
        }
        
        artist.artistSelect = input.value;
        artist.searchArtist()        
    })

    input.addEventListener("focus", () => {
        document.querySelector(".err").classList.add("hidden")
    })
}