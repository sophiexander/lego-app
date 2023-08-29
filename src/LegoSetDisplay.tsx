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

  const [response, setResponse] = useState<LegoSetResponseType | null>(null);
  // const [next, setNext] = useState<string | null>("");

  // let next: string | null = "";

  React.useEffect(() => {
    getLegoSet();
    console.log("LEGOURL", LegoURL);
  }, [LegoURL]);

  async function getLegoSet() {
    try {
      const { data, status } = await axios.get<LegoSetResponseType>(LegoURL, {
        headers: {
          Accept: "application/json",
        },
      });
      // console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);
      setLegoSetArray(data.results);
      console.log("NEXT", data.next);
      setResponse(data);
      // next = data.next;
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
    console.log("click next page:", event.target.id);
    if (response?.next && event.target.id === "next") {
      setLegoURL(response.next);
    } else if (response?.previous && event.target.id === "previous") {
      setLegoURL(response.previous);
    }
  }

  return (
    <div className="uk-background-primary">
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; end: !.uk-background-primary; offset: 0">
        <nav className="uk-navbar-container">
          <div className="uk-container">
            <div uk-navbar>
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                  <button id="previous" onClick={handleClick}>
                    Previous Page
                  </button>
                  <button id="next" onClick={handleClick}>
                    Next Page
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="uk-flex uk-flex-wrap">
        {legoSetArray?.map((item, i) => (
          <LegoSetCard key={i} set={item} />
        ))}
      </div>
    </div>
  );
}
