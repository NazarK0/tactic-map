import ErrorInterface from '../../shared/types/error.interface';
import MapInterface from './map.interface';
import SelectedToolInterface from './selectedTool.interface';

export default interface CanvasState {
  isLoading: boolean;
  error: ErrorInterface | null;
  selectedTool: SelectedToolInterface | null;
  map: MapInterface | null;
}
