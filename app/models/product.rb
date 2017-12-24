class Product < ApplicationRecord
  acts_as_taggable
  has_many :images, foreign_key: :image_item_id, as: :image_item
  accepts_nested_attributes_for :images, :allow_destroy => true

end
