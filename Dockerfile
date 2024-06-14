FROM node:22-alpine3.19

WORKDIR /webServer

COPY ./application_layer/ /webServer/application_layer/
COPY ./SociMed/ /webServer/SociMed/

WORKDIR /webServer/application_layer

RUN npm install

WORKDIR /webServer/application_layer
CMD ["npm", "run", "start"]