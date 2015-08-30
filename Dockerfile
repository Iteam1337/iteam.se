FROM tutum.co/iteamdev/node-gulp

ADD src /app/src
ADD gulpfile.js /app/
ADD bower.json /app/
RUN ./node_modules/.bin/bower install --config.interactive=false --allow-root
RUN ./node_modules/.bin/gulp build
