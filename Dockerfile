FROM ubuntu:14.04
FROM ruby:2.3.3

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs && apt-get install -y locales
RUN mkdir /my-app
WORKDIR /my-app
COPY Gemfile /my-app/Gemfile
COPY Gemfile.lock /my-app/Gemfile.lock
RUN bundle install
COPY . /my-app


RUN echo "LANG=\"en_GB.UTF-8\"" > /etc/default/locale
RUN locale-gen en_GB.UTF-8
RUN dpkg-reconfigure locales

RUN apt-get update
RUN apt-get install -y \
    wget \
    imagemagick
