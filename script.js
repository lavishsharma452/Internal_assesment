// ===============================
// PROJECTS
// ===============================

const projects = [
    {
        title: "Book Reading List",
        description:
            "A simple application for managing and organizing books to read.",
        technologies: "HTML, CSS, JavaScript",
        github: "https://github.com/lavishsharma452/Internal_assesment/tree/936e844e0af2fa19e9295e6eaad13b6033683895/book-reading-list"
    },
    {
        title: "Bug Fixing",
        description:
            "A project focused on identifying, debugging, and fixing programming issues.",
        technologies: "Programming, Debugging",
        github: "https://github.com/lavishsharma452/Internal_assesment/tree/936e844e0af2fa19e9295e6eaad13b6033683895/bug-fixing"
    },
    {
        title: "Messy Python",
        description:
            "A collection of Python practice work focused on improving code structure and programming logic.",
        technologies: "Python",
        github: "https://github.com/lavishsharma452/Internal_assesment/tree/936e844e0af2fa19e9295e6eaad13b6033683895/messy-python"
    },
    {
        title: "Python Program",
        description:
            "A Python programming project created to practice programming concepts and problem solving.",
        technologies: "Python",
        github: "https://github.com/lavishsharma452/Internal_assesment/tree/936e844e0af2fa19e9295e6eaad13b6033683895/Python%20program"
    },
    {
        title: "Quiz Application",
        description:
            "An interactive quiz application that allows users to answer questions and test their knowledge.",
        technologies: "HTML, CSS, JavaScript",
        github: "https://github.com/lavishsharma452/Internal_assesment/tree/936e844e0af2fa19e9295e6eaad13b6033683895/Quiz"
    }
];


// ===============================
// DISPLAY PROJECTS
// ===============================

const projectGrid = document.getElementById("projectGrid");
const projectSearch = document.getElementById("projectSearch");
const emptyMsg = document.getElementById("emptyMsg");

function displayProjects(projectList) {

    if (!projectGrid) return;

    projectGrid.innerHTML = "";

    if (projectList.length === 0) {
        if (emptyMsg) {
            emptyMsg.hidden = false;
        }
        return;
    }

    if (emptyMsg) {
        emptyMsg.hidden = true;
    }

    projectList.forEach(project => {

        const card = document.createElement("article");
        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <p class="project-tech">
                <strong>Technologies:</strong>
                ${project.technologies}
            </p>

            <a
                href="${project.github}"
                class="project-link"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
        `;

        projectGrid.appendChild(card);
    });
}


// ===============================
// PROJECT SEARCH
// ===============================

if (projectSearch) {

    projectSearch.addEventListener("input", function () {

        const searchText = this.value.toLowerCase().trim();

        const filteredProjects = projects.filter(project =>
            project.title.toLowerCase().includes(searchText) ||
            project.description.toLowerCase().includes(searchText) ||
            project.technologies.toLowerCase().includes(searchText)
        );

        displayProjects(filteredProjects);
    });
}


// ===============================
// INITIAL DISPLAY
// ===============================

displayProjects(projects);