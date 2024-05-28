FROM node:21-alpine3.18

WORKDIR /webServer

COPY ./ /webServer/

RUN chmod 777 tailwind.sh
#RUN ./tailwind.sh

WORKDIR /webServer/application_layer

RUN npm install
RUN npm run build-css

WORKDIR /webServer
CMD ["./tailwind.sh"]