FROM tutum.co/iteamdev/node-gulp

WORKDIR /app
ADD package.json /app/
RUN npm install
# RUN npm install -g bower
# RUN bower install
ADD src /app/src
ADD gulpfile.js /app/
RUN ./node_modules/.bin/gulp build
CMD /bin/bash
RUN mkdir -pv /usr/share/nginx/html
RUN cp -r /app/out/* /usr/share/nginx/html/
VOLUME /usr/share/nginx/html
