let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let loader = document.getElementById("loader");

async function getApi(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (err) {
    console.log("err: ", err);
  }
}

async function searchCompany() {
  let inputText = searchInput.value;
  let url =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
    inputText +
    "&limit=10&exchange=NASDAQ";
  let apiResult = await getApi(url);
  searchResult(apiResult);
}

async function searchResult(apiResult) {
  let getResultList = document.getElementById("getResultList");
  let template = document.getElementById("template");
  getResultList.innerHTML = "";
  apiResult.forEach((element) => {
    let cloneTemplate = template.content.cloneNode(true);
    cloneTemplate.querySelector("h6").innerHTML =
      element.name + " (" + element.symbol + ")";
    cloneTemplate
      .querySelector("a")
      .setAttribute("href", "/company.html?symbol=" + element.symbol);
    getResultList.appendChild(cloneTemplate);
  });
}

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  loader.style.display = "block";
  searchCompany();
  loader.style.display = "none";
});

searchInput.addEventListener("input", (e) => {
  if (searchInput.value != "") {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
});