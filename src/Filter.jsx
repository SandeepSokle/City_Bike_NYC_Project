import { useState } from "react";
import "./CSS/Filter.css";
let Filter = (props) => {
  let [select, setSelect] = useState("all");

  return (
    <div className="col-2 filter_container">
      <ul class="list-group">
        <li
          class={`${select === "all" ? "select" : ""} list-group-item`}
          onClick={() => {
            props.setFilter("all");
            setSelect("all");
          }}
        >
          All Stations
        </li>
        <li
          class={`${select === "in" ? "select" : ""} list-group-item`}
          onClick={() => {
            props.setFilter("In Service");
            setSelect("in");
          }}
        >
          In Service
        </li>
        <li
          class={`${select === "noin" ? "select" : ""} list-group-item`}
          onClick={() => {
            props.setFilter("Not In Service");
            setSelect("noin");
          }}
        >
          Not In Service
        </li>
        <li
          class={`${select === "avail" ? "select" : ""} list-group-item`}
          onClick={() => {
            props.setFilter("avail");
            setSelect("avail");
          }}
        >
          Bikes Available
        </li>
        <li
          class={`${select === "notavail" ? "select" : ""} list-group-item`}
          onClick={() => {
            props.setFilter("NotAvail");
            setSelect("notavail");
          }}
        >
          Bikes Not Available
        </li>
      </ul>
    </div>
  );
};

export default Filter;
