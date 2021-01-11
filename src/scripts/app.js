const mobileBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const shortenLinkInput = document.querySelector("#shorten-link");
const shortenLink = document.querySelector("form");
const shortenLinkLabel = document.querySelector(".shorten-link-label");
let message = document.querySelector(".message");
let linkQuery = "";

mobileBtn.addEventListener("click", () => {
  mobileMenu.innerHTML = `
    <div class="mobile-links">
        <ul>
            <li><a href="">Features</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Resources</a></li>
            <li><a href="">Login</a></li>
            <button type="button">Sign Up</button>
        </ul>
    </div>
    `;
  mobileMenu.classList.toggle("show-mobile-menu");
});

const getStarted = () => {
  alert("You have got started");
};

shortenLink.addEventListener("submit", (e) => {
  e.preventDefault();
  linkQuery = e.target.querySelector("#shorten-link").value;
  fetchShortLink();

  message.style.color = "white";
  shortenLinkInput.style.border = "none";
  shortenLinkLabel.style.color = "white";
  console.clear();
});

const fetchShortLink = async () => {
  let toArray = [];
  message.innerText = "Please wait while our bots shorten your link...";

  try {
    const api = `https://api.shrtco.de/v2/shorten?url=${linkQuery}`;
    const response = await fetch(api);
    const data = await response.json();

    toArray.push(data);
    displayShortLinks(toArray);

    message.innerText = "";
  } catch (err) {
    message.innerText = "Please add a link";
    message.style.color = "red";
    shortenLinkInput.style.border = "2px solid red";
    shortenLinkLabel.style.color = "red";
    console.clear();
  }
};

const displayShortLinks = (results) => {
  const shortenLinkContainer = document.querySelector("#shorten-results");
  const shortenLinks = document.createElement("div");
  shortenLinks.className = "shorten-link-results";
  shortenLinks.innerHTML = `
        <p>${results[0].result.original_link}</p>
        <div class="copy-link">
            <input id="short-link" value="${results[0].result.short_link}"></input>
            <button class="copy-button">Copy</button>
        </div>
    `;
  shortenLinkContainer.appendChild(shortenLinks);

  const copyToClipboard = () => {
    let shortLink = document.querySelector("#short-link");
    shortLink.select();
    document.execCommand("copy");
    document.querySelector(".copy-button").innerText = "Copied!";
  };
  document.querySelector(".copy-button").addEventListener("click", copyToClipboard);
};
