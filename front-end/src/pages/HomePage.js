import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import UserContext from "../context/UserContext";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import searchicon from "../assets/images/searchicon.jpg";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rowbooks from "../components/Rowbooks";
import Recombooks from "../components/RecomBook";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Storebooks from "../components/StoreBooks";
import "../css/Rowbooks.css";
import "../css/home.css";

const HomePage = () => {
  let { userstate, sres, initial, user,recom_book } = useContext(UserContext);

  useEffect(() => {
    userstate();
    recom_book();
  }, []);

  var search_value = localStorage.getItem("search_value");

  const data = [
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookdisplaysmall.jpg",
      caption:
        "“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” - George R.R. Martin",
    },
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookcoverssmall2.jpg",
      caption:
        "“Until I feared I would lose it, I never loved to read. One does not love breathing.” - Harper Lee",
    },
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookstackssmall.jpg",
      caption:
        "“Never trust anyone who has not brought a book with them.” - Lemony Snicket",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <div class="bg-black border-2 h-auto text-center w-full">
        <Carousel
          data={data}
          time={10000}
          width="100%"
          captionStyle={captionStyle}
          radius="10px"
          captionPosition="center"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
        />
      </div>

      {/* <h1 class='p-8 text-4 text-center font-bold text-blue-800'> Home page </h1> */}

      <div className="rowbooks">
        {initial ? (
          <>
            {sres[0] ? (
              <>
                {sres.length != 0 ? (
                  <>
                    {sres.length <= 3 ? (
                      <>
                        <h2 className="trending_tit">
                          Showing results For {search_value}
                        </h2>
                        <div
                          className="searchresults"
                          style={{ backgroundColor: "#e6f2ff" }}
                        >
                          {sres.map((item, key) => (
                            <div
                              style={{
                                backgroundColor: "#e6f2ff",
                                padding: "20px",
                              }}
                            >
                              <Card sx={{ maxWidth: 330 }}>
                                <img
                                  src={item.img}
                                  style={{ height: "260px", width: "330px" }}
                                ></img>
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {item.Book_title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {item.Book_Author}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  {user && user.id ? (
                                    <>
                                      <Link to={`/ratings/${item.ISBN}`}>
                                        <Button
                                          variant="contained"
                                          color="success"
                                        >
                                          Rate
                                        </Button>
                                      </Link>
                                    </>
                                  ) : (
                                    <>
                                      <Link to="/login">
                                        <Button
                                          variant="contained"
                                          color="success"
                                        >
                                          Rate
                                        </Button>
                                      </Link>
                                    </>
                                  )}
                                </CardActions>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="trending_box">
                          <h2 className="trending_tit">TRENDING BOOKS</h2>
                          <Rowbooks />
                        </div>
                        <div className="trending_box">
                          <h2 className="trending_tit">Recommendation</h2>
                          {user && user.id ? (
                            <>
                              <Recombooks />
                            </>
                          ) : (
                            <div className="login-recom">
                              <Link to="/login">
                                <Button variant="contained" color="success">
                                   Login for Recommendation
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </>
            ) : (
              <>
                <h2 className="trending_tit">No Results Found</h2>
                <div className="notfound">
                  <img
                    src={searchicon}
                    style={{ height: "260px", width: "330px" }}
                  ></img>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="trending_box">
              <h2 className="trending_tit">TRENDING BOOKS</h2>
              <Rowbooks />
            </div>
            <div className="trending_box">
              <h2 className="trending_tit">Recommendation</h2>
              {user && user.id ? (
                <>
                  <Recombooks />
                </>
              ) : (
                <div className="login-recom">
                  <Link to="/login">
                    <Button variant="contained" color="success">
                     Login for Recommendation
                    </Button>
                  </Link>
                </div>
              )}
              <div className="trending_box">
              <h2 className="trending_tit">Store Books</h2>
              <Storebooks/>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
