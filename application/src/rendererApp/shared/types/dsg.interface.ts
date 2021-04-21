import DSG_SignInterface from "./dsgSign.interface";

export default interface DSG_Interface {
  id: number;
  title: string;
  description: string;
  signs: DSG_SignInterface[];
}
