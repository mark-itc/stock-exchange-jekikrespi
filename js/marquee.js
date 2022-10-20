class Marquee {
  constructor(marqueeDiv) {
    this.marqueeDiv = marqueeDiv;
  }
  async priceApi(url) {
    try {
      let response = await fetch(url);
      let result = await response.json();
      return result;
    } catch (err) {
      console.log("err: ", err);
    }
  }
  async load() {
    this.result = await this.priceApi(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq/"
    );

    this.result.forEach((element) => {
      console.log(element.name);
      console.log(element.price);
      this.marqueeDiv.innerHTML += element.name;
      this.marqueeDiv.innerHTML += "  ";
      this.marqueeDiv.innerHTML += element.price;
      this.marqueeDiv.innerHTML += "  ";
    });
  }
}
