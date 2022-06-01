import express from 'express';
import {
  deleteUser,
  updateUser,
  createUser,
  getAllUsers,
  getUser
} from '../controllers/userController.mjs';

export const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
