// src/config/validation.ts
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Database
  DATABASE_URL: Joi.string().uri().required(),

  // Mail
  MAIL_HOST: Joi.string().hostname().required(),
  MAIL_PORT: Joi.number().port().required(),
  MAIL_USER: Joi.string().email().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().positive().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().positive().required(),

  // Azure AD
  AZURE_CLIENT_ID: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
  AZURE_TENANT_ID: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
});
