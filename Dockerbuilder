FROM tutum.co/iteamdev/node-gulp

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD bower.json /app/
RUN ./node_modules/bower/bin/bower --config.interactive=false --allow-root install
ADD src /app/src
ADD gulpfile.js /app/

## build the site
RUN ./node_modules/.bin/gulp build

EXPOSE 8080
CMD ./node_modules/.bin/http-server