import DSG_WithSelectedSignsInterface from '../../shared/types/dsgWithSelectedSigns.interface';
import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_PageState {
  isLoading: boolean;
  error: ErrorInterface | null;
  data: DSG_WithSelectedSignsInterface | null;
}
