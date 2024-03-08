import { Response, NextFunction, Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const userAuthorization = (req: AuthRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '64baa19a80d7c8e09dd57abd',
  };

  next();
};

export default userAuthorization;