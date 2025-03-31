import React from "react";
import styles from "./QueryDropDown.module.css";

const sampleQueries = [
  {
    text: "Top 5 space missions by astronaut count",
    example: `
      SELECT mission_name, COUNT(astronaut_id) AS astronaut_count
      FROM spaceMissions
      JOIN mission_crew USING(mission_id)
      GROUP BY mission_name
      HAVING COUNT(astronaut_id) > 3
      ORDER BY astronaut_count DESC
      LIMIT 5;
    `,
  },
  {
    text: "Average market cap by continent",
    example: `
      SELECT continent, AVG(market_cap) AS avg_market_cap
      FROM cryptocurrencies
      JOIN countries USING(country_code)
      GROUP BY continent
      HAVING AVG(market_cap) > 5000000000;
    `,
  },
  {
    text: "Top 10 highest-rated movies",
    example: `
      SELECT title, genre, director, rating
      FROM movies
      JOIN movie_ratings USING(movie_id)
      JOIN directors USING(director_id)
      WHERE rating > 8
      ORDER BY rating DESC
      LIMIT 10;
    `,
  },
  {
    text: "Total prize money by region in tournaments",
    example: `
      SELECT region, SUM(prize_money) AS total_prize
      FROM gamingTournaments
      WHERE start_date > '2022-01-01'
      GROUP BY region
      HAVING SUM(prize_money) > 1000000;
    `,
  },
  {
    text: "Historical events with 3+ countries involved",
    example: `
      SELECT event_name, event_date, COUNT(DISTINCT country) AS countries_involved
      FROM historicalEvents
      JOIN event_participants USING(event_id)
      GROUP BY event_name, event_date
      HAVING COUNT(DISTINCT country) > 3;
    `,
  },
];

const QueryDropDown = ({ updateQuery }) => {
  const handleQuerySelection = (selectedQueryExample) => {
    updateQuery(selectedQueryExample);
  };

  return (
    <div className={styles.queryDropdownContainer}>
      <select onChange={(e) => handleQuerySelection(e.target.value)}>
        <option value="">Load Sample...</option>
        {sampleQueries.map((query, index) => (
          <option key={index} value={query.example}>
            {query.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QueryDropDown;
