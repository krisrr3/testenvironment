FROM wnameless/oracle-xe-11g

MAINTAINER Kris Ramanah

RUN apt-get update &&\
    apt-get install -y nodejs npm && \
    npm install -g frisby && \
    npm install -g grunt-cli

RUN cd /opt && \
    apt-get install -y wget &&\
    wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u66-b17/jre-8u66-linux-x64.tar.gz" && \
    tar -xzvf jre-8u66-linux-x64.tar.gz


ENV JAVA_HOME /opt/jre1.8.0_66 
ENV PATH $PATH:$JAVA_HOME/bin

RUN java -version

RUN apt-get install -y zip unzip && \
    mkdir /tmp/tomcat && \
    cd /tmp/tomcat && \
    wget http://apache.mirror.digitalpacific.com.au/tomcat/tomcat-8/v8.0.28/bin/apache-tomcat-8.0.28.zip && \
    unzip apache-tomcat-8.0.28.zip && \
    mkdir /opt/tomcat && \
    mv apache-tomcat-8.0.28/* /opt/tomcat &&\
    rm -rf /tmp/tomcat/



