FROM tutum.co/iteamdev/node-gulp:0.12

ADD default.config /etc/nginx/
ADD package.json /app/
RUN npm install

ADD src /app/src
ADD gulpfile.js /app/
ADD bower.json /app/
RUN ./node_modules/.bin/bower install --config.interactive=false --allow-root
RUN ./node_modules/.bin/gulp build
