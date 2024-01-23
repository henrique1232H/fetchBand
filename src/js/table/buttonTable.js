export const buttonTable = () => {
    const buttonOpenModal = document.querySelector(".more button");
    const sectionTable = document.querySelector(".moreTable");
    const buttonCloseModal = document.querySelector(".closeModal");

    buttonOpenModal.addEventListener("click", () => {
        sectionTable.classList.remove("hidden")
    })

    buttonCloseModal.addEventListener("click", () => {
        sectionTable.classList.add("hidden")
    })
}