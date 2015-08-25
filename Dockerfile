FROM tutum.co/iteamdev/node-gulp

WORKDIR /app
ADD package.json /app/
RUN npm install
# RUN npm install -g bower
# RUN bower install
ADD src /app/src
ADD gulpfile.js /app/
RUN ./node_modules/.bin/gulp build
RUN cp -r /app/out /srv/www
VOLUME /srv/www
