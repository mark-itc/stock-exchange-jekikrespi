class searchResult {
  constructor(element) {
    this.element = element;
    this.#build();
  }

  #build() {
    this.div = document.createElement("div");
    Object.assign(this.div, {
      class: "list-group list-group-flush",
      id: "resultList",
    });
    this.div.setAttribute("class", "list-group list-group-flush");

    this.template = document.createElement("template");
    this.template.setAttribute("id", "template");

    this.img = document.createElement("img");
    this.img.setAttribute("class", "imageCompany");
    this.a = document.createElement("a");
    this.a.setAttribute("class", "list-group-item");
    this.h = document.createElement("h6");
    this.aSpan = document.createElement("span");
    this.aSpan.setAttribute("id", "percentage");

    this.divResult = document.createElement("div");
    this.divResult.setAttribute("id", "resultList");

    this.a.appendChild(this.img);
    this.a.appendChild(this.h);
    this.a.appendChild(this.aSpan);
    this.template.content.appendChild(this.a);
    this.div.appendChild(this.template);
    this.div.appendChild(this.divResult);
    this.element.appendChild(this.div);
  }
  async getApi(url) {
    try {
      this.response = await fetch(url);
      this.result = await this.response.json();
      return this.result;
    } catch (err) {
      console.log("err: ", err);
    }
  }
  async getResult(apiResult) {
    this.divResult.innerHTML = "";

    apiResult.forEach(async (element) => {
      this.companyInfo = await this.getCompanyInfo(element.symbol);
      let name = this.highlightText(element.name);
      let symbol = this.highlightText(element.symbol);

      this.cloneTemplate = this.template.content.cloneNode(true);
      this.cloneTemplate.querySelector("h6").innerHTML = `${name}( ${symbol} )`;
      this.cloneTemplate
        .querySelector("a")
        .setAttribute("href", "/company.html?symbol=" + element.symbol);
      this.cloneTemplate
        .querySelector("img")
        .setAttribute("src", this.companyInfo.profile.image);
      this.companyChangesPercentage =
        this.cloneTemplate.querySelector("#percentage");
      if (this.companyInfo.profile.changesPercentage > 0) {
        this.companyChangesPercentage.style.color = "LightGreen";
      } else {
        this.companyChangesPercentage.style.color = "Red";
      }
      this.sign = this.companyInfo.profile.changesPercentage > 0 ? "+" : "";
      this.companyChangesPercentage.innerHTML = `${this.sign}${parseFloat(
        this.companyInfo.profile.changesPercentage
      ).toFixed(2)}%`;
      this.divResult.appendChild(this.cloneTemplate);
    });
  }

  async getCompanyInfo(symbol) {
    this.companyInfo = await this.getApi(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
        symbol
    );
    return this.companyInfo;
  }
  highlightText(text) {
    let inputText = document.getElementById("searchInput").value;
    inputText = inputText.toLowerCase();
    let newText = text.toLowerCase();
    let index = newText.indexOf(inputText);
    if (index >= 0) {
      text =
        text.substring(0, index) +
        "<span class='highlightText'>" +
        text.substring(index, index + inputText.length) +
        "</span>" +
        text.substring(index + inputText.length);
    }
    return text;
  }
}
