import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import UserContext from "../context/UserContext";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
function Ratings(props) {
  const { rating } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  var isbns = [];
  const ratingapi = "http://127.0.0.1:8000/api/submitrating/";
  const isbn = `${props.match.params.id}`;
  const [value, setValue] = useState(0);
  if (rating && rating[0]) {
    var x = rating.length;
    for (var i = 0; i < x; i++) {
      isbns.push(rating[i].book_isbn);
    }
   
  }
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; 
  }
  setOpen(false);
}

  const [book, setBook] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/book/${isbn}/`)
      .then((res) => {
        if (res.data && res) {
          setBook(res.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const submitrating = (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("user_id");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ userid: userid, isbn: isbn, rating: value });
    axios.post(ratingapi, body, config)
      .then((res) => {
        handleClick()
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="root" style={{ minHeight: "100vh" }}>
      <div className="rated_outerbox1">
        <div className="container">
          <div className="book_img">
            <img
              src={book.img}
              style={{ height: "150px", width: "150px" }}
            ></img>
            <div className="book_details">
              <div className="book_horiz">
                <h2 className="book_tit">Book title - </h2>
                <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                  {book.title}
                </p>
              </div>
              <div className="book_horiz">
                <h2 className="book_tit">Book author - </h2>
                <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                  {book.author}
                </p>
              </div>
              <div className="book_horiz">
                <h2 className="book_tit">Ratings - </h2>
                {isbns.includes(isbn) ? (
                  <>
                    {isbns.map((obj) => (
                      <>
                        {obj == isbn ? (
                          <>
                            {rating.map((item) => (
                              <>
                                {item.book_isbn == obj ? (
                                  <>
                                    <Rating
                                      name="read-only"
                                      value={item.rating / 2}
                                      disabled
                                    />
                                  </>
                                ) : null}
                              </>
                            ))}
                          </>
                        ) : null}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                      <Rating
                        name="customized-10"
                        value={value}
                        max={10}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </p>
                  </>
                )}
              </div>
              {isbns.includes(isbn) ? (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginTop: "20px" }}
                  >
                    Alredy Rated
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={submitrating}
                    style={{ marginTop: "20px" }}
                  >
                    Submit
                  </Button>
                </>
              )}
            {open?
            <>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Rating Submited!
            </Alert>
          </Snackbar>
        </>:null}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ratings;
