





import Filter from "./Filter";
import Table from "./Table";

import { useState } from "react";
import "./CSS/Home.css"
let Home = (props) => {

  let [filter,setFilter] = useState("all");

  return (
    <div className="home-Container col-12">
      <Filter setFilter = {setFilter}/>
      <Table filter = {filter} />
    </div>
  );
};

export default Home;
