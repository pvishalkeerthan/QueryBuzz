import spaceMissions from "./spaceMissions";
import cryptocurrencies from "./cryptocurrencies";
import moviesSeries from "./moviesSeries";
import gamingTournaments from "./gamingTournaments";
import historicalEvents from "./historicalEvents";

const datasetMap = {
  space: spaceMissions,
  mission: spaceMissions,
  crypto: cryptocurrencies,
  bitcoin: cryptocurrencies,
  movie: moviesSeries,
  series: moviesSeries,
  game: gamingTournaments,
  tournament: gamingTournaments,
  history: historicalEvents,
  event: historicalEvents,
};

const mockDatabase = (query) => {
  const lowerQuery = query.toLowerCase();
  
  for (let keyword in datasetMap) {
    if (lowerQuery.includes(keyword)) {
      return datasetMap[keyword];
    }
  }

  return [{ message: "No matching dataset found" }];
};

export default mockDatabase;
