import { readFileSync, writeFile } from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { nextTick } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toursPath = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(readFileSync(toursPath, 'utf-8'));

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Bad request',
    });
  }
  next();
};

const checkId = (req, res, next, val) => {
  if (tours.length < val) {
    return res.status(500).json({
      status: 'failed',
      Alert: 'Invalid Id',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    tours,
  });
};

const getTour = (req, res) => {
  const { id } = req.params;
  const paramId = id * 1;
  const tour = tours.find((el) => el.id === paramId);

  res.status(200).json({
    status: 'success',
    tour,
  });
};

const postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  writeFile(toursPath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export { deleteTour, postTour, getAllTours, getTour, checkId, checkBody };
