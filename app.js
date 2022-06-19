const fetchCountry = async () => {
  const url = `https://restcountries.com/v3.1/all`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data[0]);
  const countrySelect = document.querySelector(".country");
  await data.forEach((country) => {
    countrySelect.innerHTML += `<option class="country-name">${country.name.common}</option>`;

      const sec = document.querySelector(".sec");
      sec.querySelector("select").onchange = function () {
        selectedCountry(this.value);
      };
  });
};

const selectedCountry = async (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
        renderError(`Something went wrong: ${response.status}`);
        throw new Error();

    }

    const data = await response.json();
    renderCountry(data[0]);
  } catch(error){}
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = `<h1 class="text-danger">${err}</h1>
     <img src="./img/404.png" alt="" />`;
};

const renderCountry = (country) => {
    const countriesDiv = document.querySelector(".countries");
    const{
       name:{common},
       capital,
       region,
       flags:{svg},
       currencies,
       languages,
    } = country;

    countriesDiv.innerHTML = ` <div class="card shadow-lg" style="width: 18rem;">
    <img src="${svg}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
      <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
        languages
      )}</li>
      <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
        Object.values(currencies)[0].name
      }, ${Object.values(currencies)[0].symbol} </li>
    </ul>
  </div>`;
}

fetchCountry();
