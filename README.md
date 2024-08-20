# KptnUncook 

[![Netlify Status](https://api.netlify.com/api/v1/badges/03a6d700-b297-4101-92b3-936277c1eba4/deploy-status)](https://app.netlify.com/sites/kptncook/deploys)

This project is a simple web application that allows sharing and viewing recipes from [KptnCook](https://www.kptncook.com/). It provides an easy way to fetch and display recipe details using short links.

![Screenshot](sample.jpeg)

## Features

- Fetch recipes using KptnCook short links
- Display recipe details including ingredients, instructions, and nutritional information
- Multilingual support (English and German)
- Copy recipe links and markdown format

>[WARNING]
>This project is not affiliated with KptnCook.com and is a quick, hacked together project done in a few hours. 
>Use at your own risk and don't judge the code quality too harshly. ;-D

## Setup & Usage

This project written to be deployed to [Netlify](https://www.netlify.com/).

Remember to set `KPTNCOOK_API_KEY` as an environment variable in Netlify and setup `npm run build` as a build command.

## Project Structure

- `index.html`: Main HTML file
- `script.js`: Client-side JavaScript for handling user interactions
- `localization.js`: Translations and language switching functionality
- `functions/getRecipe.js`: Serverless function for fetching recipe data from KptnCook API

## API Integration

The project uses the KptnCook API to fetch recipe data. It is possible thanks to the great reverse engineering by [@gloriousDan](https://github.com/gloriousDan/kptncook-api-reverse-engineering)!
