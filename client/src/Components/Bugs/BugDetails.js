import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  useTheme,
  Paper,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Avatar
} from "@material-ui/core";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import AssignmentIcon from '@material-ui/icons/BugReport';

import clsx from "clsx";
import PropTypes from "prop-types";
import {useBugDetailsStyles} from '../../CSS/muiStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import SwipeableViews from 'react-swipeable-views';
// import ProjectMembers from './ProjectMembers';
// import OpenBugs from './OpenBugs';
// import AssignedBugs from './AssignedBugs';
// import ResolveBugs from './ResolveBugs';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: "20px",
//   },
//   menu: {
//     marginTop: "80px",
//   },
//   menuItem: {
//     textDecoration: "none",
//     color: "black",
//   },
//   headerPaper: {
//     // padding: '0.8em 1.5em',
//     marginBottom: "1em",
//     // display: 'flex',
//     alignItems: "center",
//   },
//   second: {
//     // padding: '0.8em 1.5em',
//     marginTop: "2em",
//     // display: 'flex',
//     // alignItems: 'center',
//   },
// }));

// const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`full-width-tabpanel-${index}`}
//         aria-labelledby={`full-width-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box p={3}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }

//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };

// const a11yProps = (index) => {
//     return {
//         id: `full-width-tab-${index}`,
//         'aria-controls': `full-width-tabpanel-${index}`,
//     };
// }

const BugDetails = () => {
  const { id, bid } = useParams();
  const user = useSelector((state) => state.authReducer);
  // const [project, setProject] = useState();
  const [bug, setBug] = useState([]);
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useBugDetailsStyles();
  const [value, setValue] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  // const [loading, setLoading] = useState(false);
  const theme = useTheme();

  // console.log(bid);

  // const handleChange = (event, newValue) => {
  //     setValue(newValue);
  // };

  // const handleChangeIndex = (index) => {
  //     setValue(index);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen(false);
  };

  const handleText = (e) => {
    setMessage(e.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    setOpen(false);
    console.log(message);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}/bugs/${bid}/comments`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
      data: {
        author: user._id,
        text: message,
      },
    })
      .then((res) => {
        if (!res.data.error) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/projects/${id}/bugs/${bid}`,
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
    })
      .then((res) => {
        // setProject(res.data.data);
        console.log(res.data.data);
        setBug(res.data.data);
        // setMembers(res.data.data.members)
        setLoading(true);
      })
      .catch((err) => {
        // console.log(err.response.state)
        toast.error(err.response.statusText);
      });
  }, [bug]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div>
        {/* <Container className={classes.rootPaper}>
          <Grid container>
          <Typography variant="h5" className={classes.titlebar}>
            <AssignmentIcon className={classes.titleicon} fontSize="large"/>&nbsp;Bug Details
          </Typography>
          <Button variant="outlined" href={`/project/${id}`} color="primary" className={classes.exitProjectButton}>
            <ExitToAppIcon className={classes.exitIcon} /> &nbsp;Back
          </Button>
          </Grid>
        </Container> */}
        <Container className={classes.rootPaper}>
          <Grid container>
          {/* <Button variant="outlined" href={`/project/${id}`} color="primary" className={classes.exitProjectButton}>
            <ExitToAppIcon className={classes.exitIcon} /> &nbsp;Back
          </Button> */}
            {/* <Paper className={classes.headerPaper} > */}
            {/* <Grid item xs={12} lg={12}> */}
              <Grid container>
                {/* <Grid item xs={12} sm={10} md={10} lg={10}> */}
                    <Typography variant="h4" className={classes.titlebar}>
                    <AssignmentIcon className={classes.titleicon} fontSize="large"/>&nbsp;{bug.title}
                    </Typography>
                    
                    <Button variant="outlined" href={`/project/${id}`} color="primary" className={classes.exitProjectButton}>
                    <ExitToAppIcon className={classes.exitIcon} /> &nbsp;Back
                  </Button>
                  {/* <Typography variant="h4">Bug Title : {bug.title}</Typography> */}
                {/* </Grid> */}
                
              </Grid>
              
            {/* </Grid> */}
            
            <Grid item xs={12} lg={12}>
              <Grid item xs={12} sm={10} md={10} lg={10}>
                  <Typography Typography variant="p" >Priority : {bug.priority}</Typography>
                  <br />
                  <Typography variant="p" >
                    Description : {bug.description}
                  </Typography>
                {/* <Typography variant="h6">Priority : {bug.priority}</Typography>
                <Typography variant="h6">
                  Description : {bug.description}
                </Typography> */}
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          </Container>
        <Container className={classes.rootPaper}>

          {/* <Grid container > */}
            {/* <Grid item xs={12} lg={12}> */}
              <div>
              <Typography variant="h5" className={classes.detailsbar}>
                <ForumOutlinedIcon fontSize="large"/>&nbsp;Notes
              </Typography>
                {/* <Typography
                  variant="h5"

                  //   className={classes.flexHeader}
                >
                  <ForumOutlinedIcon
                    fontSize="large"
                    style={{ marginRight: "0.2em" }}
                  />
                  Notes
                </Typography> */}
              </div>
            {/* </Grid> */}
          {/* </Grid> */}

          <Grid container >
            {/* <Grid item xs={12} lg={12}> */}
              <div>
                <Button
                  // startIcon={<CommentOutlinedIcon />}
                  className={classes.createProjectButton}
                  onClick={handleClickOpen}
                >
                  <CommentOutlinedIcon />&nbsp;Leave A Note
                </Button>
                <Dialog open={open} onClose={handleClose2}>
                  <DialogTitle>Leave a Note</DialogTitle>
                  <DialogContent>
                    {/* <FormControl className={clsx(classes.formControl,classes.inputField)}> */}
                    {/* <InputLabel id="demo-mutiple-chip-label">
                      Leave A Note
                    </InputLabel> */}
                    <TextField
                      multiline
                      rows={2}
                      rowsMax={4}
                      name="body"
                      placeholder="Type a note..."
                      required
                      fullWidth
                      type="text"
                      label="Note"
                      variant="outlined"
                      onChange={handleText}
                      value={message}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleComment}>Add</Button>
                  </DialogActions>
                </Dialog>
              </div>
            {/* </Grid> */}
          </Grid>

          <Grid container className={classes.second}>
            <Grid item xs={12} lg={12}>
              {/* <div>
                <Divider />
                {sortedNotes.length === 0 && (
                  <Typography variant='h6' color="secondary">
                  {text}
                </Typography>
                )}
              </div> */}
              <div >
                <Divider />
                {bug.comments.length === 0 && (
                  <Typography variant='h6' color="secondary">
                    No Notes Added Yet
                </Typography>
                )}
                {bug.comments.map((n) => (
                  <div key={n.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    
                    <div>
                      <Avatar>
                        {n.author.name.slice(0, 1)}
                      </Avatar>
                    </div>
                    <div className={classes.noteStyle}>
                      <Typography  variant="caption" className={classes.noteDetails}>
                        {n.author.name}
                      </Typography>
                      <Typography className={classes.noteDetails} variant="caption">
                        <em> • at {n.createdAt.slice(0,10)}</em>
                      </Typography>
                      {/* {n.updatedAt !== n.createdAt && ( */}
                        <Typography className={classes.noteDetails} variant="caption">
                          {" "}
                          • time <em>{n.createdAt.slice(11,16)} </em>
                        </Typography>
                      {/* )} */}
                      <Typography
                        
                        variant="subtitle1"
                        className={classes.noteBody}
                      >
                        {n.text}
                      </Typography>
                    </div>
                      </Box>
                    
                    <Divider />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
        </div>
      ) : <div className={classes.fullPage}>
          <CircularProgress className={classes.loader} disableShrink size={40} /> 
        </div>
      }
    </>
  );
};

export default BugDetails;
