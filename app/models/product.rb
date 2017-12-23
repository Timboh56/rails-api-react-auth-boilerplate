class Product < ApplicationRecord
  acts_as_taggable
  has_many :images, foreign_key: :image_item_id
end
