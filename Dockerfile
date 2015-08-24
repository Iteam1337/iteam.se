FROM node
WORKDIR /app
ADD package.json /app/
RUN npm install
# RUN npm install -g bower
# RUN bower install
ADD src /app/src
ADD gulpfile.js /app/
VOLUME /app/out
EXPOSE 9000
CMD ./node_modules/.bin/gulp
