





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Search.css"
let Search = () => {
  let [totalStations, setTotalStations] = useState(0);
  let [totalBikes, setTotalBikes] = useState(0);
  let [totalNumberOfPages, setTotalNmberOfPages] = useState(0);
  let [newData, setNewData] = useState([]);
  let [currPage, setCurrPage] = useState(1);
  let [dataToShow, setDataToShow] = useState([]);
  let [pageNumberToShow, setPageNumberToShow] = useState([]);
  let [tableData, setTableData] = useState([]);
  let [readyToShow, setReadyToShow] = useState(false);
  let [inputData,setInputData] = useState("");
  let numberOfPages = 0;

  useEffect(() => {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then((e) => {
        // console.log(e.json());
        return e.json();
      })
      .then((data) => {
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

    tempData = tableData.map((e) => {
      if (e.stationName.indexOf(inputData) !== -1) {
        TStation += 1;
        TBikes += e.availableBikes;
        e.sr = TStation;
        return e;
      }
      return "undefined";
    });

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
  }, [tableData, inputData]);


  console.log(newData);
  useEffect(() => {
    let sti = parseInt((currPage - 1) * 8);
    let endi = Math.min(parseInt(currPage * 8), totalStations);
    let tempDataToShow = [];
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
      let j = currPage - 2;
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

    if (tempDataToShow[0] !== undefined) setReadyToShow(true);
    setDataToShow(tempDataToShow);
    setPageNumberToShow(tempPageNumberToShow);
  }, [currPage, tableData, newData,inputData,totalNumberOfPages,totalStations]);



  return (
    <div className = "p-4">
      <div class="input-group col-4 mb-4">
        <button
          class="col-3 fs-5 btnBtn "
          type="button"
          id="button-addon2"
        >
          Search Here
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange = {(e)=>{
          setInputData(e.target.value);
          }}
        />
      </div>

      <div className="col-12">
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
            {readyToShow
              ? dataToShow.map((e) => {
                  return (
                    <tr className = "fs-6">
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
                })
              : ""}
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
              <span class="page-link"> Previous</span>
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
    </div>
  );
};

export default Search;
