import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', postUser);

export default router;