export default function startGame() {
    const buttonStartGame = document.querySelector(".start button");

    buttonStartGame.addEventListener("click", () => {
        document.querySelector(".start").classList.add("hidden");
        document.querySelector(".sectionForm").classList.remove("hidden")
        
    })
}