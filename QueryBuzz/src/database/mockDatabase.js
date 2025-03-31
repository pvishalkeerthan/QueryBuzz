import spaceMissions from "./spaceMissions";
import cryptocurrencies from "./cryptocurrencies";
import moviesSeries from "./moviesSeries";
import gamingTournaments from "./gamingTournaments";
import historicalEvents from "./historicalEvents";

const mockDatabase = (query) => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes("space") || lowerQuery.includes("mission")) {
    return spaceMissions;
  } else if (lowerQuery.includes("crypto") || lowerQuery.includes("bitcoin")) {
    return cryptocurrencies;
  } else if (lowerQuery.includes("movie") || lowerQuery.includes("series")) {
    return moviesSeries;
  } else if (lowerQuery.includes("game") || lowerQuery.includes("tournament")) {
    return gamingTournaments;
  } else if (lowerQuery.includes("history") || lowerQuery.includes("event")) {
    return historicalEvents;
  }
  return [{ message: "No matching dataset found" }];
};

export default mockDatabase;
