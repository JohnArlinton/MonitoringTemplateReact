import React, { useState } from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'

import { Provider } from 'react-redux'
import generatorStore from '../redux/store'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const store = generatorStore()


function MainContainer() {

  const [openDrawer, setOpenDrawer] = useState(false);
  
  const drawerWidth = 260

  const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: theme.spacing(11) +2,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    main: {
      height: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}>
        <Provider store={store}>
          <Router>
            <Navbar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} drawerWidth={drawerWidth}/>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/dashboard" component={Dashboard}/>
            </Switch>
          </Router>
        </Provider>
      </div>
    </div>
  );
}

export default MainContainer;
