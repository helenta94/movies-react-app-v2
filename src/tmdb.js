import React from "react";

const HOST = "https://api.themoviedb.org/3";
const APIKEY = "b4d514a9c5639b1b1d3f0ab2bf94f96d";

export function fetchUpcomingMovies(page) {
  page = parseInt(page) || 1;
  return fetch(`${HOST}/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${page}`);
}

export function fetchPopularMovies(page) {
  page = parseInt(page) || 1;
  return fetch(`${HOST}/movie/popular?api_key=${APIKEY}&language=en-US&page=${page}`)
}

export function fetchPopularTv(page) {
  page = parseInt(page) || 1;
  return fetch(`${HOST}/tv/popular?api_key=${APIKEY}&language=en-US&page=${page}`)
}

export function fetchDiscoverMovies(sortObj) {
  let array = [];
  for (let key in sortObj) {
    array.push(`${key}=${sortObj[key]}`)
  }

  const str = array.join("&");

  return fetch(`${HOST}/discover/movie?api_key=${APIKEY}&${str}`)
}

export function fetchMovieData(movieId, param) {
  param = (param && `/${param}`) || "";

  return fetch(`${HOST}/movie/${movieId}${param}?api_key=${APIKEY}&language=en-US`)
}

export function fetchTvData(movieId, param, append) {
  param = (param && `/${param}`) || "";
  append = (append && `&append_to_response=${append}`) || "";
  return fetch(`${HOST}/tv/${movieId}${param}?api_key=${APIKEY + append}&language=en-US`)
}

export function fetchTvSeasonData(movieId, seasonNumber) {
  return fetch(`${HOST}/tv/${APIKEY}/season/${seasonNumber}?api_key=${APIKEY}&language=en-US`)
}