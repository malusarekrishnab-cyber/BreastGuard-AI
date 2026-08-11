import { useQuery } from "@tanstack/react-query";
import { getHealth, getFeatures } from "@/lib/api";

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    refetchInterval: 15000,
    retry: 1,
    staleTime: 10000,
  });
}

export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: getFeatures,
    retry: 1,
    staleTime: Infinity,
  });
}