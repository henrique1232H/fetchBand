import Artist from "../classArtist.js";

export const buttonTable = () => {
    const buttonOpenModal = document.querySelector(".more button");
    const sectionTable = document.querySelectorAll(".moreTable");
    const buttonCloseModal = document.querySelector(".closeModal");
    const artist = new Artist()

    buttonOpenModal.addEventListener("click", () => {
        sectionTable[0].classList.add("hidden");
        sectionTable[1].classList.remove("hidden")
    })

    buttonCloseModal.addEventListener("click", () => {
        sectionTable[1].classList.add("hidden");

        document.querySelector(".sectionForm .more").classList.add("hiddenButNotDisplayNone")
        document.querySelector(".sectionForm .response").classList.add("hiddenButNotDisplayNone")
        
        artist.removeTable();
        artist.removeResponseAndMore();

        
        document.querySelector("input").value = "";
        
    })
}