require 'digest'
class ApiKey < ApplicationRecord

  class << self
    def generate
      new_key = ApiKey.new(key: Digest::MD5.new.hexdigest(Time.now.to_s))
      new_key.save!
    end
  end
end
