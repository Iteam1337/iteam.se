FROM node
WORKDIR /app
ADD package.json /app/
RUN npm install
ADD src /app/src
ADD gulpfile.js /app/
VOLUME /app/out
EXPOSE 9000
CMD gulp
