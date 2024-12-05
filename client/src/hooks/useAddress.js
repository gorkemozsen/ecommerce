import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const fetchCities = async () => {
  const res = await apiClient.get("/addresses/cities");
  return res.data;
};

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

const fetchDistricts = async (city) => {
  if (!city) return [];

  const res = await apiClient.get(`/addresses/districts/${city}`);
  return res.data;
};

export const useDistricts = (city) => {
  return useQuery({
    queryKey: ["districts", city],
    queryFn: () => fetchDistricts(city),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!city,
  });
};

const fetchNeighborhoods = async (city, district) => {
  if (!city && !district) return [];

  const res = await apiClient.get(
    `/addresses/neighborhoods/${city}/${district}`
  );
  return res.data;
};

export const useNeighborhoods = (city, district) => {
  return useQuery({
    queryKey: ["neighborhoods", city, district],
    queryFn: () => fetchNeighborhoods(city, district),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!city && !!district,
  });
};

const fetchStreets = async (city, neighborhood) => {
  if (!city && !neighborhood) return [];

  const res = await apiClient.get(`/addresses/streets/${city}/${neighborhood}`);
  return res.data;
};

export const useStreets = (city, neighborhood) => {
  return useQuery({
    queryKey: ["streets", city, neighborhood],
    queryFn: () => fetchStreets(city, neighborhood),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!city && !!neighborhood,
  });
};
