const app = document.querySelector('#covid');
const urlAPI = 'https://covid19.mathdro.id/api/';


function useStats(url) {
  const [stats, setStats] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      console.log('fetching API');
      const data = await fetch(url).then(res => res.json()).
      catch(err => {setError(err);
      });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);
  return {
    stats,
    loading,
    error };



}
function Stats(input) {
  //console.log(input);
  //Need to figure this out, More direct input of variable url from <Stats> than Object, accidentally figured this out
  const { stats, loading, error } = useStats(input.url);
  console.log('log', stats, loading, error);
  if (loading) return React.createElement("p", null, "Looking for Stats...");
  if (stats.error) return React.createElement("p", null, "Aw Man!No Stats!");
  return (
    React.createElement("div", { className: "box" },
    React.createElement("div", { className: "statBox" },
    React.createElement("h3", null, "Confirmed:"),
    React.createElement("span", null, stats.confirmed.value)),

    React.createElement("div", { className: "statBox" },
    React.createElement("h3", null, "Deaths:"),
    React.createElement("span", null, stats.deaths.value)),

    React.createElement("div", { className: "statBox" },
    React.createElement("h3", null, "Recovered:"),
    React.createElement("span", null, stats.recovered.value))));



}

function CountrySelect() {

  const { stats: countries, loading, error } = useStats("https://covid19.mathdro.id/api/countries");
  const [selectedCountry, setSelectedCountry] = React.useState('US');

  if (loading) return React.createElement("p", null, "Looking for data...");
  if (error) return React.createElement("p", null, "Aw Man! No Data!");
  return (
    React.createElement("div", null,
    React.createElement("div", { className: "countrySelect" },
    React.createElement("h3", null, "COVID-19 Cases for Country:", React.createElement("br", null), " ", selectedCountry),


    React.createElement("select", { onChange: e => {setSelectedCountry(e.target.value);} },
    Object.entries(countries.countries).map(([country, code]) => (console.log({ selectedCountry }), React.createElement("option", { selected: selectedCountry === countries.countries[code], key: code, value: countries.countries[code] }, country))))),


    React.createElement(Stats, { url: `https://covid19.mathdro.id/api/countries/${selectedCountry}` })));



}
function Footer() {
  return (
    React.createElement("div", { className: "footer" },
    React.createElement("h3", null, "Serving data from John Hopkins University CSSE as a JSON API"),
    React.createElement("p", null, "Thanks to ", React.createElement("a", { href: "https://github.com/mathdroid/covid-19-api" }, "mathdroid"), " for creating the API!")));

}
function ContainerAPI() {

  return (
    React.createElement("div", null,
    React.createElement("h1", null, " COVID-19 Cases Worldwide"),
    React.createElement(Stats, { url: "https://covid19.mathdro.id/api/" }),
    React.createElement(CountrySelect, null),
    React.createElement(Footer, null)));



}


ReactDOM.render(React.createElement(ContainerAPI, null), app);