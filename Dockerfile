FROM ubuntu:latest
RUN apt-get update && apt-get -y upgrade && apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
# RUN git clone https://github.com/4auvar/VulnNodeApp.git (to be done base machine - AWS EC2)
ENV WORKDIR /opt/vuln-node-app
WORKDIR $WORKDIR
RUN COPY . $WORKDIR
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
