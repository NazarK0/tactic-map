import DSG_SignSelectedInterface from "./dsgSignSelected.interface";

export default interface DSG_WithSelectedSignsInterface {
  id: number;
  title: string;
  description: string;
  signs: DSG_SignSelectedInterface[];
}
