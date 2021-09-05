import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

let Station = (props) => {
  let [dataObj, setDataObj] = useState({});

  let { id } = useParams();

  useEffect(() => {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then((e) => {
        // console.log(e.json());
        return e.json();
      })
      .then((data) => {
        let obj = (data.stationBeanList).find((e) => {
          console.log(e);
          console.log(e.id,id);
          return e.id === parseInt(id);
        });
        // console.log(obj);
        setDataObj(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(dataObj);

  return dataObj !== undefined ? (
    <div>
      <div class="row justify-content-center">
        <div class="col-6 p-3 fs-2 danger">
          {`Station Name : ${dataObj.stationName}`}
        </div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-3 p-3 fs-4">{`ID : ${dataObj.id}`}</div>
        <div class="col-5 p-3 fs-4">
          {`availableBikes : ${dataObj.availableBikes}`}
        </div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-3 p-3 fs-4">
          {`Available Docks : ${dataObj.availableDocks}`}
        </div>
        <div class="col-5 p-3 fs-4">
          {" "}
          {`Total Docks : ${dataObj.totalDocks}`}
        </div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-3 p-3 fs-4">{`latitude : ${dataObj.latitude}`}</div>
        <div class="col-5 p-3 fs-4">{`longitude : ${dataObj.longitude}`}</div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-3 p-3 fs-4">{`statusKey : ${dataObj.statusKey}`}</div>
        <div class="col-5 p-3 fs-4">
          {" "}
          {`statusValue : ${dataObj.statusValue}`}
        </div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-3 p-3 fs-4">
          {`testStation : ${dataObj.testStation}`}
        </div>
        <div class="col-5 p-3 fs-4">{`stAddress1 : ${dataObj.stAddress1}`}</div>
      </div>
      <div class="row justify-content-around">
        <div className="col-2"></div>
        <div class="col-6 p-3 fs-4">
          {`lastCommunicationTime : ${dataObj.lastCommunicationTime}`}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  ) : (
    "Loding......"
  );
};

export default Station;
