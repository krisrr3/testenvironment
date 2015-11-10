FROM wnameless/oracle-xe-11g

MAINTAINER Kris Ramanah - krisrr3@hotmail.com

RUN apt-get update &&\
    apt-get install -y nodejs npm && \
    npm install -g frisby && \
    npm install -g grunt-cli && \
	ln -s /usr/bin/nodejs /usr/local/bin/node




