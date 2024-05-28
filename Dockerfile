FROM node:21-alpine3.18

WORKDIR /webServer

COPY ./application_layer/ /webServer/application_layer/
COPY ./presentation_layer/ /webServer/presentation_layer/
COPY ./tailwind.sh /webServer/
COPY ./tailwind.config.js /webServer/


RUN chmod 777 tailwind.sh
#RUN ./tailwind.sh

WORKDIR /webServer/application_layer

RUN npm install
RUN npm run build-css

WORKDIR /webServer
CMD ["./tailwind.sh"]