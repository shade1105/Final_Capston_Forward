
From node:12.18.3


#ENTRYPOINT [ "bin/sh" ]
#WORKDIR ./
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
#RUN npm install -g @angular/cli@8.3.19
RUN npm install -g @angular/cli@10.1.0-next.6
#&& npm cache clean
RUN npm install @angular/cli@10.1.0-next.6
COPY . .
RUN ng --version
#COPY ./ / 
#WORKDIR ./
#ADD ./ / 
#RUN pwd 
#RUN npm run build --prod
#RUN ng serve --host=0.0.0.0
CMD ng serve --host=0.0.0.0
#RUN ng --version
##RUN locale
##RUN ls 
#RUN ng help
#RUN cd src
#RUN ls
#RUN ng s
#EXPOSE 4200 
#RUN ng serve
#RUN cat package.json
#CMD ["npm","start"] 
