import * as Joi from 'joi'

interface ConfigSchema {
  port?: string
  oauth: {
    github: {
      clientId?: string
      clientSecret?: string
    }
  }
}

export const configure: () => ConfigSchema = () => ({
  port: process.env.APP_PORT,
  oauth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
})

export const configureSchema: Joi.ObjectSchema<ConfigSchema> = Joi.object({
  port: Joi.number().default(3010),
  oauth: Joi.object({
    github: Joi.object({
      clientId: Joi.string().required(),
      clientSecret: Joi.string().required(),
    }),
  }),
})
