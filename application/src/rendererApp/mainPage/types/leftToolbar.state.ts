import ErrorInterface from '../../shared/types/error.interface';
import USG_WithStateInterface from './toolGroupWithState.interface';
export default interface LeftToolbarState {
  isLoading: boolean;
  error: ErrorInterface | null;
  data: USG_WithStateInterface[] | null;
}
