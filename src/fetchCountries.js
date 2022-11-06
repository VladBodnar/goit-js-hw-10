export class FetchCountries {
  getCountries(searchQuery) {
    const url = `https://restcountries.com/v3/name/${searchQuery}`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
