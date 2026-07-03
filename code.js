// Homepage: render project cards from data.json and filter them by search.

const projectTemplate = document.querySelector("[data-project-template]")
const projectContainer = document.querySelector("[data-field-container]")
const searchInput = document.querySelector("[data-search]")
const noResults = document.getElementById("noresults")

let projects = []

function applyFilter(query) {
    const value = query.toLowerCase()
    let visibleCount = 0

    projects.forEach((project) => {
        const isVisible =
            project.title.toLowerCase().includes(value) ||
            project.type.toLowerCase().includes(value) ||
            project.details.toLowerCase().includes(value)
        if (isVisible) visibleCount += 1
        project.element.classList.toggle("hide", !isVisible)
    })

    const empty = visibleCount === 0
    noResults.classList.toggle("show", empty)
    noResults.classList.toggle("hide", !empty)
    noResults.style.marginTop = empty ? "30px" : ""
}

searchInput.addEventListener("input", (e) => applyFilter(e.target.value))

fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
        projects = data.map((project) => {
            const card = projectTemplate.content.cloneNode(true).children[0]
            const icon = card.querySelector("[data-icon]")
            const desc = card.querySelector("[data-description]")
            const link = card.querySelector("[data-link]")
            const button = card.querySelector("[data-button]")

            if (project.type === "music") {
                icon.src = "assets/music-2-xxl.png"
                icon.className = "fieldicon"
            } else {
                icon.src = "assets/scratch_logo_icon_249671.png"
                icon.className = "fieldicon2"
            }
            icon.alt = ""

            if (project.featured) {
                card.classList.add("featuredfieldinfo")
                button.className = "spcprojectlink"
            }

            desc.innerHTML = project.title + "<br>uploaded at <i>" + project.details + "</i>"
            link.href = project.source
            projectContainer.append(card)

            return {
                title: project.title,
                type: project.type,
                details: project.details,
                element: card,
            }
        })
    })
    .catch((err) => console.error("Failed to load data.json:", err))
