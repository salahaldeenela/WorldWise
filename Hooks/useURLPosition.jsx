import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
  const [searchParm] = useSearchParams();

  // Convert lat/lng to numbers
  const lat = parseFloat(searchParm.get("lat"));
  const lng = parseFloat(searchParm.get("lng"));
  return [lat, lng];
}
