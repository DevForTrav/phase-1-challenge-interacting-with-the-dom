
const body = document.getElementsByTagName("body")
const minus = document.getElementById("minus");
const plus = document.getElementById('plus');
const likesUL = document.getElementsByClassName("likes")
const likeBtn = document.getElementById('heart');
const pause = document.getElementById('pause');
const counterElement = document.getElementById(`counter`)
const submitComment = document.getElementById('submit')
const commentsSection = document.getElementById('list')
const resetBtn = document.createElement('BUTTON')

let counter = 0;
let numOfLikes = {};

counterElement.innerText = counter;

plus.addEventListener("click", function() {
    counterElement.innerText = ++counter;
}) 

minus.addEventListener("click", function() {
    counterElement.innerText = --counter;
}) 

likeBtn.addEventListener("click", function(){
    const likesLI = document.createElement("LI")
    if (counter in numOfLikes) {
        let previousLI = document.getElementById(`number-${counter}-LI`)
        previousLI.remove()
        let timesLiked = ++numOfLikes[counter]
        likesLI.innerText = `${counter} has ${timesLiked} likes`
        likesLI.id = `number-${counter}-LI`
    } else {
        numOfLikes[counter] = 1
        likesLI.innerText = `${counter} has ${numOfLikes[counter]} like`
        likesLI.id = `number-${counter}-LI`
    }
    likesUL[0].appendChild(likesLI)
})

function paused () {
    intervalIncrementor = () => {counterElement.innerText = counter}
    pause.innerText = "resume"
    minus.disabled = true;
    plus.disabled = true;
    submitComment.disabled = true
    likeBtn.disabled = true
}
function revertToResume () {
    intervalIncrementor = () => {counterElement.innerText = ++counter}
    pause.innerText = "pause"
    minus.disabled = false;
    plus.disabled = false;
    submitComment.disabled = false
    likeBtn.disabled = false
}


pause.addEventListener("click", function() {
 if (pause.innerText === "pause") {
     paused()
 } else if (pause.innerText === "resume"){
     revertToResume()
 }
})

submitComment.addEventListener("click", function(e) {
    e.preventDefault()
    const commentP = document.createElement("P")
    let userInput = document.getElementById("comment-input");
    commentP.innerHTML = userInput.value;
    commentsSection.appendChild(commentP)
    userInput.value = ""

})

resetBtn.addEventListener("click", function(e) {
    e.preventDefault()
    counter = 0;
    counterElement.innerText = counter;
    revertToResume()

})

resetBtn.innerText = "reset"
document.getElementById("comment-form").appendChild(resetBtn)

let intervalIncrementor = () => {counterElement.innerText = ++counter}


window.setInterval(function() { intervalIncrementor () }, 1000);