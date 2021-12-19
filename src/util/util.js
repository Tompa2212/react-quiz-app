const formatData = (countries) => {
  countries = countries.filter((country) => {
    if (
      "flags" in country &&
      "name" in country &&
      "capital" in country &&
      "population" in country
    ) {
      return country;
    }
  });

  countries = countries.map((country) => {
    const obj = {};
    obj.name = country.name.common;
    obj.flag = country.flags.png;
    obj.capital = country.capital[0];
    obj.population = country.population;

    return obj;
  });

  return countries;
};

const random_numbers = (num_of_numbers, range) => {
  const numbers = [];
  while (numbers.length < num_of_numbers) {
    const num = Math.floor(Math.random() * range);
    if (numbers.indexOf(num) === -1) numbers.push(num);
  }

  return numbers;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const random_items = (array, num_of_items, property, correct) => {
  const arr = [correct];

  for (let i = 0; i < num_of_items - 1; i++) {
    const rand_index = Math.floor(Math.random() * array.length);
    arr.push(array[rand_index][property]);
  }

  shuffleArray(arr);

  return arr;
};

export { formatData, random_numbers, random_items };
