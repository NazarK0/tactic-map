export default interface ToolAttributes {
  id: number;
  signUrl: string;
  signWidth: number;
  signHeight: number;
  title: string;
  description: string;
  type: string;
  dsgFK: number;
  usgFK: number | null;
}
