'use strict'; 
import * as mapConfig from '../config/map';

export function getMap(req, res) {
  mapConfig.getMarkers(req.user).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
      console.log("no markers:" + markers + process.env.REACT_APP_MAP_TOKEN); 
      return res.json({accessCode: process.env.REACT_APP_MAP_TOKEN}); 
    } else {
      console.log("success:" + markers + process.env.REACT_APP_MAP_TOKEN);
      return res.json({markers: markers, accessCode: process.env.REACT_APP_MAP_TOKEN}); 
    }
  });
}

export function postMap(req, res) {
  console.log("body in controller" + req.body.savedMarkers); 
  mapConfig.saveMarkers(req.user, req.body).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
      console.log("posting no markers:" + markers); 
      return res.send ('no posting markers'); 
    } else {
      console.log("posting success:" + markers);
      return res.json({markers: markers}); 
    }
  }); 
}