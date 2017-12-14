class Product < ApplicationRecord

  acts_as_taggable
  has_one :image, foreign_key: :image_id
end
