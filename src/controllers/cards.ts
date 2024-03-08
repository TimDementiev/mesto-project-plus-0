import { NextFunction, Request, Response } from 'express';
import Errors from '../errors/errors';
import Card from '../models/card';
import { AuthRequest } from '../middlewares/authorization';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .select('-__v')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const postCard = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const {
    name,
    link,
    likes,
    createdAt,
  } = req.body;
  Card.create({
    name,
    link,
    owner: userId,
    likes,
    createdAt,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw Errors.notFound();
      }
      res.send({
        message: 'Карточка удалена',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(Errors.notFound());
      } else {
        next(err);
      }
    });
};

export const putLike = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw Errors.notFound();
      }
      res.send({
        message: 'Лайк поставлен',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const deleteLike = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw Errors.notFound();
      }
      res.send({
        message: 'Лайк удален',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};