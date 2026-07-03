// Chrislarinet Medley: a small playlist player driven by songlist.json.
// previousSong()/nextSong() are called from the buttons' inline onclick.

let currentSong = 1
let songs = []

function render() {
    const song = songs[currentSong - 1]
    if (!song) return

    const titleAndArtist = document.getElementById("songtext")
    const audio = document.getElementById("audiosource")
    const progress = document.getElementById("progress")

    audio.src = song.src
    progress.innerHTML = currentSong + " out of " + songs.length + " songs"
    titleAndArtist.innerHTML = song.title + " - " + song.artist + "<br>from <i>Christmas Music</i>"
}

function previousSong() {
    if (currentSong > 1) {
        currentSong -= 1
        render()
    }
}

function nextSong() {
    if (currentSong < songs.length) {
        currentSong += 1
        render()
    }
}

fetch("songlist.json")
    .then((res) => res.json())
    .then((data) => {
        songs = data
        render()
    })
    .catch((err) => console.error("Failed to load songlist.json:", err))
