import axios from "axios";
import { LegoSetResponseType } from "../models/LegoSet";

type ClientProps = {
  url: string;
};

export default async function getLegoSets({
  url,
}: ClientProps): Promise<LegoSetResponseType> {
  console.log("maing request with url:", url);
  try {
    const { data } = await axios.get<LegoSetResponseType>(url, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
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
