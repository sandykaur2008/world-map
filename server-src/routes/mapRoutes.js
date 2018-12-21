'use strict'; 
import express from 'express';
import * as mapControl from '../controllers/mapController'; 
const mapRouter = express.Router(); 

export function mrouter() {
  mapRouter.route('/')
    .get(mapControl.getMap)
    .post(mapControl.postMap); 
  return mapRouter; 
} 