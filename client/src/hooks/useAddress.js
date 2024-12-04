import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCities = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await axios.get("http://127.0.0.1:3001/api/addresses/cities", {
      headers: {
        Authorization: `Bearer ${token}`, // Token ekleniyor
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
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

  const token = localStorage.getItem("accessToken");

  try {
    const res = await axios.get(
      `http://127.0.0.1:3001/api/addresses/districts/${city}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token ekleniyor
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
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

  const token = localStorage.getItem("accessToken");

  try {
    const res = await axios.get(
      `http://127.0.0.1:3001/api/addresses/neighborhoods/${city}/${district}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token ekleniyor
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
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

  const token = localStorage.getItem("accessToken");

  try {
    const res = await axios.get(
      `http://127.0.0.1:3001/api/addresses/streets/${city}/${neighborhood}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token ekleniyor
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
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
