'use strict'; 
import * as mapConfig from '../config/map';

export function getMap(req, res) {
  mapConfig.getMarkers(req.user).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
<<<<<<< HEAD
      return res.json({accessCode: process.env.REACT_APP_MAP_TOKEN}); 
    } else {
      return res.json({markers: markers, accessCode: process.env.REACT_APP_MAP_TOKEN}); 
=======
      return res.json({markers: []}); 
    } else {
      return res.json({markers: markers}); 
>>>>>>> routing
    }
  });
}

export function postMap(req, res) {
  mapConfig.saveMarkers(req.user, req.body).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
      return res.send ('no posting markers'); 
    } else {
      return res.json({markers: markers}); 
    }
  }); 
}