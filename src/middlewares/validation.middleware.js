import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

// validate middleware function

export function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors[0].message })
            } else {
                req.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
            }
        }
    }
}
