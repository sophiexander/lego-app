import React, { useState } from "react";
import axios from "axios";
import { LegoSet, LegoSetResponseType } from "./models/LegoSet";
import LegoSetCard from "./LegoSetCard";
export interface Props {}

// React.useEffect(() => {});
const legoSetNumbers = ["10312-1"];
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function LegoSetDisplay({}: Props) {
  const [legoSetArray, setLegoSetArray] = useState<LegoSet[] | undefined>();

  React.useEffect(() => {
    getLegoSet();
  }, []);

  async function getLegoSet() {
    try {
      const { data, status } = await axios.get<LegoSetResponseType>(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);
      setLegoSetArray(data.results);
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

  return (
    <div className="uk-flex uk-flex-wrap">
      {legoSetArray?.map((item, i) => (
        <LegoSetCard key={i} set={item} />
      ))}
    </div>
  );
}
