// Re-export Redux-backed useProcurement hook for complete backward compatibility
export { useProcurement } from './hooks';

export function ProcurementProvider({ children }) {
  return children;
}

export default ProcurementProvider;
