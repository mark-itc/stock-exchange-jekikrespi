let urlQueryString = window.location.search;
let companySymbol = new URLSearchParams(urlQueryString).get("symbol");

// console.log(companySymbol);
// console.log(urlQueryString);

async function getApi(url) {
  try {
    loader.style.display = "block";
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (err) {
    console.log("err: ", err);
  }
}
async function companyProfile() {
  let result = await getApi(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
      companySymbol
  );
  //   console.log(result);
  let companyName = result.profile.companyName;
  let companyImage = result.profile.image;
  let companyDescription = result.profile.description;
  let companyWebsite = result.profile.website;
  let companyDetials = result.profile.price;
  let companyChanges = result.profile.changesPercentage;

  let cardTitle = document.getElementById("companyName");
  cardTitle.innerHTML = companyName;
  let cardText = document.getElementById("companyDescription");
  cardText.innerHTML = companyDescription;
  let smallText = document.getElementById("companyLink");
  smallText.innerHTML = companyWebsite;
  let image = document.getElementById("cardImage");
  image.src = companyImage;
  let cardSubText = document.getElementById("companyDetials");
  cardSubText.innerHTML = companyDetials;
  let subText = document.getElementById("companyChanges");
  subText.innerHTML = companyChanges;
  if (companyChanges > 0) {
    subText.style.color = "green";
  } else {
    subText.style.color = "red";
  }
}

companyProfile();

async function companyHistory() {
  let history = await getApi(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" +
      companySymbol +
      "?serietype=line"
  );
  return history.historical;
}

async function chartCompany() {
  const stockHistory = await companyHistory();
  //   console.log(stockHistory);
  const date = [];
  const close = [];
  stockHistory.forEach((element) => {
    date.push(element.date);
    close.push(element.close);
  });
  //   console.log(date, close);
  let ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "stock price history",
          data: close,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  loader.style.display = "none";
}
chartCompany();
