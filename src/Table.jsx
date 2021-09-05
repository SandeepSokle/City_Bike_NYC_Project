import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Table.css";

let Table = (props) => {
  let [totalStations, setTotalStations] = useState(0);
  let [totalBikes, setTotalBikes] = useState(0);
  let [totalNumberOfPages, setTotalNmberOfPages] = useState(0);
  let [newData, setNewData] = useState([]);
  let [currPage, setCurrPage] = useState(1);
  let [dataToShow, setDataToShow] = useState([]);
  let [pageNumberToShow, setPageNumberToShow] = useState([]);
  let [tableData, setTableData] = useState([]);
  let [readyToShow,setReadyToShow] = useState(false);
  let numberOfPages = 0;
  let refid = useRef(null);;

  useEffect(() => {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then((e) => {
        // console.log(e.json());
        return e.json();
      })
      .then((data) => {

        console.log(data.stationBeanList);

        setTableData(data.stationBeanList);
        setNewData(data.stationBeanList);
        setReadyToShow(true);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let tempData = [];
    let TStation = 0;
    let TBikes = 0;

    if (props.filter === "In Service") {
      tempData = tableData.map((e) => {
        if (e.statusValue === "In Service") {
          TStation += 1;
          TBikes += e.availableBikes;
          e.sr = TStation;
        return e;
        }
        return undefined
      });
    } else if (props.filter === "Not In Service") {
      tempData = tableData.map((e) => {
        if (e.statusValue === "Not In Service") {
          TStation += 1;
          TBikes += e.availableBikes;
        e.sr = TStation;
        return e;
        }
        return undefined
      });
    } else if (props.filter === "avail") {
      tempData = tableData.map((e) => {
        if (e.availableBikes > 0) {
          TStation += 1;
          TBikes += e.availableBikes;
        e.sr = TStation;
        return e;
        }
        return undefined
      });
    } else if (props.filter === "NotAvail") {
      tempData = tableData.map((e) => {
        if (e.availableBikes <= 0) {
          TStation += 1;
          TBikes += e.availableBikes;
        e.sr = TStation;
        return e;
        }
        return undefined
      });
    } else {
      tempData = tableData.map((e) => {
        TStation += 1;
        TBikes += e.availableBikes;
        e.sr = TStation;
        return e;
      });
    }

    tempData = tempData.filter((e) => {
      return typeof e != "undefined";
    });

    setNewData(tempData);
    setTotalBikes(TBikes);
    setTotalStations(TStation);
    setCurrPage(1);
    let pages = parseInt(TStation / 8);
    numberOfPages = TStation % 8 === 0 ? pages : pages + 1;
    setTotalNmberOfPages(numberOfPages);
  }, [props.filter,tableData]);

  useEffect(() => {
    let sti = parseInt((currPage - 1) * 8);
    let endi = Math.min(parseInt(currPage * 8), totalStations);
    let tempDataToShow = [];
    refid.current.focus();

    for (let i = sti; i < endi; i++) {
      //   console.log(newData[i]);
      tempDataToShow.push(newData[i]);
    }

    let tempPageNumberToShow = [];
    if (currPage === 1) {
      let i = 0;
      let j = currPage;
      while (i < 3 && j <= totalNumberOfPages) {
        tempPageNumberToShow.push(j);
        i++;
        j++;
      }
    } else if (currPage === totalNumberOfPages) {
      let i = 0;
      let j = currPage - 2 ;
      while (i < 3 && j > 0) {
        tempPageNumberToShow.push(j);
        i++;
        j++;
      }
    } else {
      let i = 0;
      let j = currPage - 1;
      while (i < 3 && j <= totalNumberOfPages) {
        tempPageNumberToShow.push(j);
        i++;
        j++;
      }
    }

    if(tempDataToShow[0] !== undefined)
    setReadyToShow(true);
    setDataToShow(tempDataToShow);
    setPageNumberToShow(tempPageNumberToShow);
  }, [currPage, props.filter, tableData,newData,totalNumberOfPages,totalStations]);

  return (
    <div className="col-10">
      <span className="fs-3 p">{`Total Number Of Stations : ${totalStations}`}</span>
        <br></br>
        <span className="fs-3 p">{`Total Number Of Bikes : ${totalBikes}`}</span>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">#Id</th>
            <th scope="col">Station Name</th>
            <th scope="col">Available Bikes</th>
            <th scope="col">Status Value</th>
          </tr>
        </thead>
        <tbody>
          {readyToShow ? dataToShow.map((e) => {
            return (
              <tr>
                <td>{e.sr}</td>
                <td>{e.id}</td>
                <td>{e.stationName}</td>
                <td>{e.availableBikes}</td>
                <td>{e.statusValue}</td>
                <td>
                  <Link to={`/station/${e.id}`}>More</Link>
                </td>
                
              </tr>
            );
          }) : ""}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class={`page-item`}
            onClick={() => {
              if (currPage !== 1) {
                setCurrPage(currPage - 1);
              }
            }}
          >
            <span class="page-link">Previous</span>
          </li>

          {pageNumberToShow.map((e) => {
            return (
              <li
                class="page-item"
                onClick={() => {
                  setCurrPage(e);
                }}
              >
                <span class={`${e === currPage ? "select" : ""} page-link fs-4`}>
                  {e}
                </span>
              </li>
            );
          })}

          <li
            class="page-item"
            onClick={() => {
              if (currPage < totalNumberOfPages) {
                setCurrPage(currPage + 1);
              }
            }}
          >
            <span class="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;
