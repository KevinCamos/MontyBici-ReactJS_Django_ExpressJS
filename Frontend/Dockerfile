FROM node:16.13

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY --chown=node:node package.json .

#COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install

COPY --chown=node:node . .

# add app
COPY . ./

# start app
CMD ["npm", "start"]