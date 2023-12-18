import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { secret_key } from '../config';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({
        code: '401',
        message: 'Unauthorized',
      });
    }

    const [, token_value] = token.split(' ');

    const decoded = jwt.verify(token_value, secret_key) as JwtPayload;

    request.body.user_id = decoded.user_id;

    return next();
  } catch (error) {
    return response.status(401).json({
      code: '401',
      message: 'Unauthorized',
    });
  }
};

export { authentication };
