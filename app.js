const fetchCountry = async () => {
  const url = `https://restcountries.com/v3.1/all`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data[0]);
  const countrySelect = document.querySelector(".country");
  await data.forEach((country) => {
    countrySelect.innerHTML += `<option class="country-name">${country.name.common}</option>`;
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

  } catch(error){}
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = `<h1 class="text-danger">${err}</h1>
     <img src="./img/404.png" alt="" />`;
};



fetchCountry();
