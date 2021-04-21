export default interface DSG_SignInterface {
  id: number;
  sign: string;
  title: string;
  description: string;
  dsgFK: number;
  usgFK: number | null;
}
