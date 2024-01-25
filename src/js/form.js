import Artist from "./classArtist.js";

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
        
        document.querySelector(".sectionForm .more").classList.remove("hiddenButNotDisplayNone")
        document.querySelector(".sectionForm .response").classList.remove("hiddenButNotDisplayNone")
        artist.artistSelect = input.value;
        artist.menuArtist()        
    })

    input.addEventListener("focus", () => {
        document.querySelector(".err").classList.add("hidden")
    })
}