import React, { Component } from "react";
import axios from "axios";
import { apiBaseLink, apikey, trendingMoviesApiBaseLink } from "../Constants";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favourites: [],
    };
    // this.apiKey = ;
  }

  async componentDidMount() {
    let res = await axios.get(
      `${trendingMoviesApiBaseLink}?api_key=${apikey}&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }

  async changeMovies() {
    let res = await axios.get(
      `${trendingMoviesApiBaseLink}?api_key=${apikey}&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }

  handleRight = () => {
    this.setState(
      {
        parr: [...this.state.parr, this.state.parr.length + 1],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.state.parr.pop();
      this.setState(
        {
          parr: [...this.state.parr],
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleClick = (value) => {
    this.setState(
      {
        currPage: value,
      },
      this.changeMovies
    );
  };

  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      oldData.push(movie);
    }

    localStorage.setItem("movies-app", JSON.stringify(oldData));
    this.handleFavouritesState();
  };

  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((m) => m.id);
    this.setState({
      favourites: [...temp],
    });
  };

  render() {
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h1 className="text-center">
              <strong>TRENDING</strong>
            </h1>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`${apiBaseLink}${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                    className="card-img-top movies-img"
                  />
                  <h1 className="card-title movies-title">
                    {movieObj.original_title}
                    {movieObj.original_name}
                  </h1>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover === movieObj.id && (
                      <a
                        className="btn btn-primary movies-button"
                        onClick={() => this.handleFavourites(movieObj)}
                      >
                        {this.state.favourites.includes(movieObj.id) ? (
                          <h5>Remove From Favourites</h5>
                        ) : (
                          <h5>Add To Favourites</h5>
                        )}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((val) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => this.handleClick(val)}
                      >
                        {val}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link" href="#" onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
