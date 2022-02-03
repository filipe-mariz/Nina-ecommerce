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

  Route.group(() => {
    Route.post('/', 'CompaniesController.register');
    Route.get('/:company_id?', 'CompaniesController.index');
    Route.put('/:company_id', 'CompaniesController.update');
    Route.put('/delete/:company_id', 'CompaniesController.destroy')
  }).prefix('/categories')

  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'ClientsController.register');
      Route.get('/:client_id?', 'ClientsController.index');
      Route.put('/:client_id', 'ClientsController.update');
      Route.put('/delete/:client_id', 'ClientsController.put');
    });
    Route.group(() => {
      Route.post('/', 'ClientAdressesController.register');
      Route.get('/:client_adress_id?', 'ClientAdressesController.index');
      Route.put('/:client_adress_id', 'ClientAdressesController.update');
      Route.put('/delete/:client_adress_id', 'ClientAdressesController.delete');
    }).prefix('/adress' );
  }).prefix('/client')
}).prefix('/admin').middleware(['tenantHandler'])
