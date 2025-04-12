import React, { useState } from "react";
import { LegoSet, LegoSetResponseType } from "./models/LegoSet";
import LegoSetCard from "./LegoSetCard";
import getLegoSets from "./rebrickable/client";
export interface Props {}

const legoSetNumbers = ["10312-1"];
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function LegoSetDisplay({}: Props) {
  const [LegoURL, setLegoURL] = useState(
    `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&min_year=2000&theme_id=158`
  );
  const [legoSetArray, setLegoSetArray] = useState<LegoSet[] | undefined>();

  const [response, setResponse] = useState<LegoSetResponseType | null>(null);
  // const [next, setNext] = useState<string | null>("");

  React.useEffect(() => {
    async function fetch() {
      const responce = await getLegoSets({ url: LegoURL });
      setLegoSetArray(responce.results);
      setResponse(responce);
    }
    fetch();
  }, [LegoURL]);

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
              <div className="uk-navbar-right uk-margin-right">Hi</div>
            </div>
          </div>
        </nav>
      </div>

      <div className="uk-flex uk-flex-wrap uk-flex-center">
        {legoSetArray?.map((item, i) => (
          <LegoSetCard key={i} set={item} />
        ))}
      </div>
    </div>
  );
}
