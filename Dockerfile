FROM node:22-alpine3.19

WORKDIR /webServer

COPY ./application_layer/ /webServer/application_layer/
COPY ./presentation_layer/ /webServer/presentation_layer/
COPY ./tailwind.sh /webServer/tailwind.sh
COPY ./tailwind.config.js /webServer/tailwind.config.js

RUN chmod 777 tailwind.sh

WORKDIR /webServer/application_layer

RUN npm install
RUN npm run build-css

#WORKDIR /webServer
#CMD ["tailwind.sh"]

WORKDIR /webServer/application_layer
CMD ["npm", "run", "start"]