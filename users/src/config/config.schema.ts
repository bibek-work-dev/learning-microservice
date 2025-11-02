
import * as Joi from 'joi';


export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  // APP_ENV: Joi.string().valid('development', 'production', 'test', 'local').default('local'),
  MONGO_URI: Joi.string().required(),
  // ACCESS_TOKEN_SECRET: Joi.string().required(),
  // ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  // REFRESH_TOKEN_SECRET: Joi.string().required(),
  // REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  // EMAIL_HOST: Joi.string().required(),
  // EMAIL_PORT: Joi.string().required(),
  // EMAIL_USER: Joi.string().required(),
  // EMAIL_USER_PASS: Joi.string().required(),
  // SALT_ROUNDS: Joi.number().default(10),
  // CDN: Joi.string().required(),
  // CMS_PORTAL_URI: Joi.string().uri().required(),
  // S3_ACCESS_KEY_ID: Joi.string().required(),
  // S3_SECRET_ACCESS_KEY: Joi.string().required(),
  // S3_BUCKET_NAME: Joi.string().required(),
  // S3_REGION: Joi.string().required(),
  // '2FA_METHOD': Joi.string().required(),
});
