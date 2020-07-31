const memorialRoute = require('express').Router();
const { verifyToken } = require('../middleware/AuthUser');
const parser = require('../helpers/cloudinary');
const memorialController = require('../controllers/memorialController');
const galleryController = require('../controllers/galleryController');

const authUrl = '/api/v1/auth/';

memorialRoute.post(
  `${authUrl}create-memorial`,
  verifyToken,
  parser().single('image'),
  memorialController.createMemorial,
);

memorialRoute.get(
  `${authUrl}memorials`,
  verifyToken,
  memorialController.getMemorials,
);
memorialRoute.get(
  `${authUrl}memorial/:id`,
  verifyToken,
  memorialController.getMemorial,
);
memorialRoute.get(
  `${authUrl}user-memorials`,
  verifyToken,
  memorialController.getUserMemorials,
);

memorialRoute.put(
  `${authUrl}update-memorial/:id`,
  verifyToken,
  parser().single('image'),
  memorialController.updateMemorial,
);

memorialRoute.delete(
  `${authUrl}delete-memorial/:id`,
  verifyToken,
  memorialController.deleteMemorial,
);

// update photos of a memorial
memorialRoute.put(`${authUrl}update-photos/:id`,
  parser().any('photos'),
  galleryController.updatePhotos);

// update tribute of a memorial
memorialRoute.put(`${authUrl}update-tributes/:id`,
  memorialController.updateTribute);

module.exports = memorialRoute;
