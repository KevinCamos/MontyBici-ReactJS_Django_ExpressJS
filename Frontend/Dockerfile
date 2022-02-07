# pull official base image
FROM node:16.13.2-alpine3.14

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
# COPY package-lock.json .

RUN npm install


# add app
COPY . .



# start app
CMD ["npm", "start"]