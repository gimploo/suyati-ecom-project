import { Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "../Axios";
import "../css/Rowbooks.css";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Pagination from "@mui/material/Pagination";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function StoreBooks() {
  let { user,itemadd } = useContext(UserContext);
  const [storebooks, setStorebooks] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openerr, setOpenErr] = useState(false);
  const [loaditem,setLoadItem]=useState(false);
  const addcartapi="api/addcart/"

  useEffect(() => {
    Store();
  }, []);
  useEffect(() => {
    Store();
  }, [page]);



   
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
  };
  const Store = () => {
    axios.get(`api/list?page=${page}`).then((res) => {
      if (res && res.status == 200) {
        setStorebooks(res.data.results);
      }
    });
  };

  const loadmore = (event, value) => {
    setPage(value);
  };
  const addcart=(bookid)=>{
    setLoadItem(true)
    let user=localStorage.getItem('user_id')
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ userid:user,Bookid:bookid});
      axios.post(addcartapi,body,config).then((res)=>{
        setLoadItem(false);
        setOpen(true);
        itemadd();
      }).catch((err)=>{
        setLoadItem(false)
        setOpenErr(true)
      })
  }
  return (
    <div className="storebooks">
      <div className="posters">
        {storebooks && storebooks[0] ? (
          <>
            {storebooks.map((obj) => (
              <div className="trending_books">
      
                <img
                  src={`http://${obj.image_url.replace('/media/http%3A/','')}`}
                  alt=""
                  className="img_books"
                ></img>
                <h>{obj.Book_title}</h>
                <h>{obj.Book_Author}</h>
                <div className="trending_icons">
                  {user && user.id ? (
                    <>
                      <Link to={`/ratings/${obj.ISBN}`}>
                        <Button variant="contained" color="success">
                          Rate
                        </Button>
                      </Link>
                      <Button onClick={() => addcart(obj.id)}  disableRipple style={{backgroundColor:"white"}}>
                      <AddShoppingCartIcon className="carticon" />
                      </Button>
                      
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="contained" color="success">
                          Rate
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <div className="store-icons">
        <Pagination
          count={100}
          page={page}
          onChange={loadmore}
          color="primary"
        />
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Book Added to Cart
          </Alert>
      </Snackbar>
      {openerr?<>
        <Snackbar open={openerr} autoHideDuration={6000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
           Oops Something Went Wrong try later!
          </Alert>
      </Snackbar>
      </>:null}
      <Snackbar open={loaditem}  >
          <Alert  severity="warning" sx={{ width: '100%' }}>
           Adding to cart...
          </Alert>
      </Snackbar>
    </div>
  );
}

export default StoreBooks;
