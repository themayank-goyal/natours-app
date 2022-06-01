import {
  deleteTour,
  postTour,
  getAllTours,
  getTour,
  checkId,
  checkBody,
} from './../controllers/tourController.mjs';

import express from 'express';
import app from '../app.mjs';

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, postTour);
router.route('/:id').get(getTour).delete(deleteTour);

export default router;
