let currentSong = 1
let songs=[]
const songslength = 2
/* 
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    let count = 0
    projects.forEach(project => {
      const isVisible =
        project.title.toLowerCase().includes(value) ||
        project.type.toLowerCase().includes(value) ||
        project.details.toLowerCase().includes(value) 
      if (isVisible){
        count += 1
      }
      project.element.classList.toggle("hide", !isVisible)
     /*  if (isVisible) {
        if (project.title.toLowerCase().includes(value)) {
            project.title.replace(value,'<mark>'+value+'</mark>')
        } else if (project.details.toLowerCase().includes(value)){
            project.details.replace(value,'<mark>'+value+'</mark>')
        }
      }
      else{
        project.element.desc.innerHTML = project.title + '<br>uploaded at <i>' +  project.details + '</i>'
      } 
    })
    if (count == 0) {
        const ele = document.getElementById("noresults")
        ele.classList.remove('hide')
        ele.classList.add('show')
        ele.style.marginTop = "30px"
    }
    else{
        const ele = document.getElementById("noresults")
        ele.classList.remove('show')
        ele.classList.add('hide')
        ele.style.marginTop = none
    }

}) */

fetch('songlist.json')
  .then(res => res.json())
  .then(data => {
    songs = data.map(song => {
      const ele = document.getElementById("songwrapper")
      const titleandartist = document.getElementById("songtext")
      const src = document.getElementById("audiosource")
      const progress = document.getElementById("progress")
      if (song.order === currentSong){
        src.src = song.src
        progress.innerHTML = currentSong +" out of "+ songslength + " songs"
        titleandartist.innerHTML = song.title +" - "+ song.artist+"<br>from <i>Christmas Music</i>"
      }

      return { title: song.title, artist: song.artist, order: song.order, src:song.src, element: ele }
    })
  })

function previousSong(){
  if (currentSong > 1)
    currentSong -= 1
    const ele = document.getElementById("songwrapper")
    const titleandartist = document.getElementById("songtext")    
    const src = document.getElementById("audiosource")
    const progress = document.getElementById("progress")
    song = songs[currentSong-1]
    src.src = song.src
    progress.innerHTML = currentSong +" out of "+ songslength + " songs"
    titleandartist.innerHTML = song.title +" - "+ song.artist+"<br>from <i>Christmas Music</i>"
}

function nextSong(){
  if (currentSong < songslength)
    currentSong += 1
    const ele = document.getElementById("songwrapper")
    const titleandartist = document.getElementById("songtext")    
    const src = document.getElementById("audiosource")
    const progress = document.getElementById("progress")
    song = songs[currentSong-1]
    src.src = song.src
    progress.innerHTML = currentSong +" out of "+ songslength + " songs"
    titleandartist.innerHTML = song.title +" - "+ song.artist+"<br>from <i>Christmas Music</i>"
}