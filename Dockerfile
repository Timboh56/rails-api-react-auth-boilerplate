FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /my-app
WORKDIR /my-app
COPY Gemfile /my-app/Gemfile
COPY Gemfile.lock /my-app/Gemfile.lock
RUN bundle install
COPY . /my-app
