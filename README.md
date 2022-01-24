It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint.

## Scripts
- Install: `npm install`
- Build: `npm run build`
- Lint: `npm run lint`
- Prettify: `npm run prettify`
- Run unit tests: `npm run test`
- Start server: `npm run start`

## Endpoint to resize images
http://localhost:3000/api/images

## Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica

## url example:
http://localhost:3000/api/images?filename=encenadaport&width=200&height=200

## Notes
Image thumbs will be stored in `images/thumb`