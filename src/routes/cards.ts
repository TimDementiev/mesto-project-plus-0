import express from 'express';
import {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = express.Router();

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;