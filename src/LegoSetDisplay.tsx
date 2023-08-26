import React, { MouseEventHandler, useState } from "react";
import axios from "axios";
import { LegoSet, LegoSetResponseType } from "./models/LegoSet";
import LegoSetCard from "./LegoSetCard";
export interface Props {}

// React.useEffect(() => {});
const legoSetNumbers = ["10312-1"];
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function LegoSetDisplay({}: Props) {
  const [LegoURL, setLegoURL] = useState(
    `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&min_year=2000&ordering=theme_id`
  );
  const [legoSetArray, setLegoSetArray] = useState<LegoSet[] | undefined>();

  let next: string | null = "";

  React.useEffect(() => {
    getLegoSet();
  }, [LegoURL]);

  async function getLegoSet() {
    try {
      const { data, status } = await axios.get<LegoSetResponseType>(LegoURL, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);
      setLegoSetArray(data.results);
      next = data.next;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        throw Error(error.message);
      } else {
        console.log("unexpected error: ", error);
        throw Error("An unexpected error occurred");
      }
    }
  }

  function handleClick(event: any) {
    console.log("click next page");
    if (next) {
      setLegoURL(next);
    }
  }

  return (
    <div className="uk-flex uk-flex-wrap">
      <button onClick={handleClick}>Next Page</button>
      {legoSetArray?.map((item, i) => (
        <LegoSetCard key={i} set={item} />
      ))}
    </div>
  );
}
