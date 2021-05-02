export default interface DSG_SignAttributes {
  id: number;
  sign: string;
  title: string;
  description: string;
  dsgFK: number;
  usgFK: number | null;
}
