import ErrorInterface from '../../shared/types/error.interface';
import SelectedMilSignInterface from './selectedMilSign.interface';

export default interface CanvasState {
  isLoading: boolean;
  error: ErrorInterface | null;
  selectedMilSign: SelectedMilSignInterface | null;
  mapUrl: string | null;
}
