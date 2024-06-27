import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const validateSchemaMiddleware =
    (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(HttpStatusCode.BadRequest)
                .json({ error: error.details[0].message });
        }
        next();
    };

export default validateSchemaMiddleware;
