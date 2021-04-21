export default interface IpcBodyInterface {
  data?: any;
  status: 'ok' | 'error';
  queryParams?: any;
}