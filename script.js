/* Easy place to add, edit, or remove project cards later.
   Just change this list. The page will update automatically. */
   const projects = [
    {
      title: "Python Programs Collection",
      description: "A collection of beginner Python programs.",
      github: "https://github.com/lavishsharma452/internal_assesment/tree/main/Python%20program"
    },
    {
      title: "Messy Python Code Improvement",
      description: "Practice project for improving messy Python code.",
      github: "https://github.com/lavishsharma452/internal_assesment/tree/main/messy-python"
    },
    {
      title: "Bug Fixing Using Cursor AI",
      description: "A learning project about finding and fixing Python bugs.",
      github: "https://github.com/lavishsharma452/internal_assesment/tree/main/bug-fixing"
    },
    {
      title: "Interactive Quiz Application",
      description: "A simple quiz app built to practice JavaScript.",
      github: "https://lavishsharma452.github.io/internal_assesment/Quiz/"
    },
    {
      title: "Book Reading List Application",
      description: "A small app for keeping a list of books.",
      github: "https://github.com/lavishsharma452/internal_assesment/tree/main/book-reading-list"
    }
  ];
const projectGrid = document.getElementById("projectGrid");
const projectSearch = document.getElementById("projectSearch");
const emptyMsg = document.getElementById("emptyMsg");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.title = project.title.toLowerCase();
  card.dataset.description = project.description.toLowerCase();

  card.innerHTML = `
    <span class="placeholder">GitHub link: PLACEHOLDER</span>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.github}" target="_blank" rel="noopener noreferrer">
      Open GitHub (PLACEHOLDER)
    </a>
  `;

  return card;
}

function showProjects(list) {
  projectGrid.innerHTML = "";
  emptyMsg.hidden = true;

  list.forEach(function (project) {
    projectGrid.appendChild(createProjectCard(project));
  });
}

function searchProjects() {
  const text = projectSearch.value.toLowerCase().trim();
  const cards = projectGrid.querySelectorAll(".project-card");
  let matchCount = 0;

  cards.forEach(function (card) {
    const title = card.dataset.title;
    const description = card.dataset.description;
    const isMatch = title.includes(text) || description.includes(text);

    card.hidden = !isMatch;
    if (isMatch) {
      matchCount = matchCount + 1;
    }
  });

  emptyMsg.hidden = matchCount !== 0;
}

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* Start with saved theme, or light mode */
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

themeBtn.addEventListener("click", function () {
  const isDark = !document.documentElement.classList.contains("dark");
  setTheme(isDark);
});

showProjects(projects);

projectSearch.addEventListener("input", searchProjects);

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});
