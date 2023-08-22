import React, { useState } from "react";
import axios from "axios";
import { LegoSet } from "./models/LegoSet";
export interface Props {}

// React.useEffect(() => {});

const API_KEY = import.meta.env.VITE_APP_API_KEY;
console.log(API_KEY);
export default function LegoSetImage({}: Props) {
  const [singleLegoSet, setLegoSet] = useState<LegoSet | undefined>();
  React.useEffect(() => {
    getLegoSet();
  });

  async function getLegoSet() {
    try {
      const { data, status } = await axios.get<LegoSet>(
        `https://rebrickable.com/api/v3/lego/sets/${"10312-1"}?key=${API_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);
      setLegoSet(data);
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
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <img
          src={singleLegoSet?.set_img_url}
          width="1800"
          height="1200"
          alt=""
        ></img>
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title">{singleLegoSet?.name}</h3>
        <p>Number of parts: {singleLegoSet?.num_parts}</p>
      </div>
    </div>
  );
}
