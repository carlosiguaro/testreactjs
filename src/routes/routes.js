import { Route, View } from '../setup/routes'

Route.set('/', View.Dashboard);
Route.set('/inicio', View.Inicio);
Route.set('/medicos', View.Medicos);
Route.set('/consultorios', View.Consultio);
Route.set('/agenda', View.Agenda);

export { Route };