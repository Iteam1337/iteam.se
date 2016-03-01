FROM tutum.co/iteamdev/node-gulp:assemble-0.7.0

ADD package.json /app/
COPY redirects.d /etc/nginx/
ADD .jshintrc /app/
ADD src /app/src
ADD lib /app/lib
ADD gulpfile.js /app/
ADD bower.json /app/

RUN npm install
RUN ./node_modules/.bin/bower install --config.interactive=false --allow-root
RUN ./node_modules/.bin/gulp build
