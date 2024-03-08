import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Errors from '../errors/errors';
import { AuthRequest } from '../middlewares/authorization';

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .select('-__v')
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .select('-__v')
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(Errors.notFound());
      } else {
        next(err);
      }
    });
};

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({
        name,
        about,
        avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const patchUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const _id = req.user?._id;
  const { name, about, avatar } = req.body;
  User.findOneAndUpdate(
    { _id },
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .select('-__v')
    .then((user) => {
      if (!user) {
        throw Errors.notFound();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const patchUserAvatar = (req: AuthRequest, res: Response, next: NextFunction) => {
  const _id = req.user?._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .select('-__v')
    .then((user) => {
      if (!user) {
        throw Errors.notFound();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};