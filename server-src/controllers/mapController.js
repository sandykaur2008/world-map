'use strict'; 
import * as mapConfig from '../config/map';

export function getMap(req, res) {
  mapConfig.getMarkers(req.email).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
      return res.json({markers: []}); 
    } else {
      return res.json({markers: markers}); 
    }
  });
}

export function postMap(req, res) {
  mapConfig.saveMarkers(req.email, req.body).then((markers) => {
    if (!Array.isArray(markers) || !markers.length) {
      return res.send ('no posting markers'); 
    } else {
      return res.json({markers: markers}); 
    }
  }); 
}