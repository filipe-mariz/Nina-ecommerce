import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/auth/calendar', async () => {
  return { message: 'Success' }
}).middleware(['googleAuth'])

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UsersController.register')//.middleware([ 'authorize' ]);;
    Route.get('/:user_id?', 'UsersController.index')//.middleware([ 'authorize' ]);;
    Route.put('/:user_id', 'UsersController.update')//.middleware([ 'authorize' ]);;
    Route.delete('/:user_id', 'UsersController.destroy')
  }).prefix('/user');

  Route.group(() => {
    Route.post('/', 'CompaniesController.register');
    Route.get('/:company_id?', 'CompaniesController.index');
    Route.put('/:company_id', 'CompaniesController.update');
    Route.put('/delete/:company_id', 'CompaniesController.destroy')
  }).prefix('/company')
}).prefix('/admin').middleware(['tenantHandler'])
