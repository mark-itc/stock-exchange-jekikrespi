async function priceApi(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (err) {
    console.log("err: ", err);
  }
}
async function companyPrice() {
  let result = await priceApi(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq/"
  );

  result.forEach((element) => {
    console.log(element.name);
    console.log(element.price);
    const marquee = document.getElementById("marqueeText");
    marquee.innerHTML += element.name;
    marquee.innerHTML += "  ";
    marquee.innerHTML += element.price;
    marquee.innerHTML += "  ";
  });
}
companyPrice();
