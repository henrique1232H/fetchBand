import Artist from "./Artist.js"

export const buttonExitModal = () => {
    const artist = new Artist()

    document.querySelector(".sectionShowArtists span button").addEventListener("click" , () => {
        document.querySelector(".sectionShowArtists").classList.add("hidden")
        artist.removeTable();
        artist.removeMessages()
        document.querySelector("input").value = ""
    })
}