





import Filter from "./Filter";
import Table from "./Table";

import { useState,useEffect } from "react";
import "./CSS/Home.css"
let Home = (props) => {

  let [filter,setFilter] = useState("all");

  // useEffect(() => {
  //   fetch("/data")
  //     .then((e) => {
  //       // console.log(e.json());
  //       return e.json();
  //     }).then((data)=>{
  //       props.setData(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="home-Container col-12">
      <Filter setFilter = {setFilter}/>
      <Table filter = {filter} />
    </div>
  );
};

export default Home;
