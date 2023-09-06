const projectCardTemplate = document.querySelector("[data-project-template]");
const projectCardContainer = document.querySelector("[data-field-container]")
const searchInput = document.querySelector("[data-search]")

let projects=[]

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
      } */
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

})

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    projects = data.map(project => {
      const card = projectCardTemplate.content.cloneNode(true).children[0]
      const icon = card.querySelector("[data-icon]")
      const desc = card.querySelector("[data-description]")
      const box = card.querySelector("[data-field-info]");
      const link = card.querySelector("[data-link]")
      const button = card.querySelector("[data-button]")
      if (project.type == "music"){
        icon.src="assets/music-2-xxl.png"
        icon.className = "fieldicon"
      } else {
        icon.src="assets/scratch_logo_icon_249671.png"
        icon.className = "fieldicon2"
      } 

      if (project.featured) {
        card.classList.add('featuredfieldinfo')
        button.className = "spcprojectlink"
      }

      desc.innerHTML = project.title + '<br>uploaded at <i>' +  project.details + '</i>'
      link.href = project.source
      projectCardContainer.append(card)
      return { title: project.title, type: project.type, details: project.details, element: card }
    })
  })