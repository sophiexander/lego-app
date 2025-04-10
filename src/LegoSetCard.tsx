import { LegoSet } from "./models/LegoSet";
export interface Props {
  key: number;
  set: LegoSet;
}

export default function LegoSetCard({ set }: Props) {
  return (
    <div className="uk-card uk-card-default uk-margin">
      <div className="uk-card-media-top">
        <img src={set.set_img_url} width="200" alt=""></img>
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title">{set.name}</h3>
        <p>Number of parts: {set.num_parts}</p>
        <p>Set Numbers: {set.set_num}</p>
      </div>
    </div>
  );
}
