FROM ubuntu:14.04

# Install Node.js
RUN apt-get update
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | sudo bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# Copy code
COPY . /src

WORKDIR /src

# Install dependencies
RUN rm -rf node_modules; npm install

# Run every 10secs
RUN chmod u+x ./run
CMD ["./run"]