FROM ubuntu:latest
RUN apt-get update && apt-get upgrade && apt-get install curl && curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && apt-get install -y nodejs
# RUN git clone https://github.com/4auvar/VulnNodeApp.git (to be done base machine - AWS EC2)
ENV WORKDIR /opt/vuln-node-app
WORKDIR $WORKDIR
RUN COPY . $WORKDIR
RUN npm install
CMD ["npm", "start"]
