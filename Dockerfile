FROM node:22-alpine3.19

COPY ./backend /backend
COPY ./frontend /frontend

#Creates the dist for the backend
WORKDIR /frontend

RUN npm install
RUN npm run build

WORKDIR /
RUN mv /frontend/dist /backend/dist
#Copies from frontend to backend
WORKDIR /backend

RUN npm install

CMD ["npm", "start"]