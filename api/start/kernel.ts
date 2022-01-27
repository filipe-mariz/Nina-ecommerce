import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register(['Adonis/Core/BodyParserMiddleware'])

Server.middleware.registerNamed({
  tenantHandler: 'App/Middleware/TenantDb',
  authorize: 'App/Middleware/Authorize',
  googleAuth: 'App/Middleware/GoogleAuthorize'
})
