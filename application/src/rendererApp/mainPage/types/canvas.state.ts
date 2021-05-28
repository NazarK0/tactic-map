import ErrorInterface from '../../shared/types/error.interface';
import CanvasModes from './canvasModes.enum';
import MapInterface from './map.interface';
import SelectedToolInterface from './selectedTool.type';

export default interface CanvasState {
  isLoading: boolean;
  error: ErrorInterface | null;
  currentTool: SelectedToolInterface | null;
  map: MapInterface | null;
  mode: CanvasModes;
  currentLayer: number;
}
