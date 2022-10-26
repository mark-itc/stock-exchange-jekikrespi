class Marquee {
  constructor(marqueeDiv) {
    this.marqueeDiv = marqueeDiv;
  }

  async load() {
    this.result = await this.priceApi(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/NASDAQ"
    );

    this.result.forEach((company) => {
      this.price = `$${parseFloat(company.price).toFixed(2)}`;
      this.priceSpan = document.createElement("span");
      this.priceSpan.style.color = "Green";
      this.priceSpan.innerHTML = this.price;
      this.symbolSpan = document.createElement("span");
      this.symbolSpan.innerHTML = company.symbol;
      this.companyDiv = document.createElement("span");
      this.companyDiv.classList.add("company-div");
      this.companyDiv.appendChild(this.symbolSpan);
      this.companyDiv.appendChild(this.priceSpan);
      this.marqueeDiv.appendChild(this.companyDiv);
    });
  }

  async priceApi(url) {
    try {
      this.response = await fetch(url);
      this.result = await this.response.json();
      return this.result;
    } catch (err) {
      console.log("err: ", err);
    }
  }
}
