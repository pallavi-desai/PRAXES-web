import React, { Component } from "react";
import Axios from "axios";
import Select from "react-select";
import "../CSS/Cars.css";
import "../CSS/Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      cars:[],
      filteredCars:[]
    };
  }

  async componentDidMount() {
    Axios.get(
      "https://praxesdemo-default-rtdb.firebaseio.com/brands.json"
    ).then((res) => {
      const brands = res.data;
      const options = brands.filter(Boolean).map((d) => ({
        value: d,
        label: d,
      }));
      this.setState({ options });
    });

    Axios.get(
        "https://praxesdemo-default-rtdb.firebaseio.com/cars.json"
      ).then((res) => {
        const c = res.data;
        const cars = c.filter(Boolean).map((d) => ({
            brand: d.brand,
            model: d.model,
          }));
        this.setState({ cars });
        this.setState({
            filteredCars:cars
        })
      });
  }

  handleChange(e) {
    if(e.length>0){
        let filterValue = e.map(x => x.value);
        let filteredCars = this.state.cars.filter(function (el) {
            for(var i=0;i<filterValue.length;i++){
                if(filterValue[i]===el.brand){
                    return true;
                }
            }
          });
        this.setState({ filteredCars });
        console.log("testing...");
    } else{
        this.setState({ filteredCars: this.state.cars });
    }
    
  }

  render() {
    return (
        <div className="mainDiv">
          <h2 className="title">Choose brand</h2>
          <div className="searchDiv">
            <Select
              options={this.state.options}
              onChange={this.handleChange.bind(this)}
              isMulti
            />
          </div>
          <div className="tableDiv">
          <table className="cars">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Car model</th>
                </tr>
              </thead>
              <tbody>
              {
                  this.state.filteredCars.map((tup, index) => {
                    return (
                        <tr>
                            <td>{index+1}</td>
                            <td>{tup.model}</td>
                        </tr>
                    );
                })
              }
              </tbody>
          </table>
          </div>
        </div>
    );
  }
}

export default Search;
