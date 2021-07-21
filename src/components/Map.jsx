import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { setNewCoordinates } from '../redux/mapDucks'
import { socket } from "../socketIO"


const Map = (props) => {

  const [map, setmap] = useState(null);

  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({
    containProgressCircular: {
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 160,
      width: 160,
      marginBottom: '1em',
      color: '#fff'
    },
    svgCircular: {
      transform: 'rotate(270deg)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0
    },
    circleUnderlay:{
      stroke: 'rgba(158, 158, 158, 0.4)',
      zIndex: 1
    },
    circleOverlay:{
      stroke: 'currentColor',
      zIndex: 2,
      transition: 'all 0.6s ease-in-out'
    },
    progressCircleInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }));

  const classes = useStyles();

  const state = useSelector(store => store)

  useEffect(() => {
    console.log('Created')
    console.log(socket)
    
    socket.on("NEW_COORDINATES", (data) => {
      dispatch(setNewCoordinates(data))
      console.log(data);
    });
  }, [])

  useEffect(() =>{
    console.log('updated')
    if (map) {
      map.flyTo(state.map.center);
    }
  })
  
  return (
    <MapContainer style={{height:"85vh", width:"100%"}} center={state.map.center} zoom={18} whenCreated={setmap} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={state.map.marker}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;