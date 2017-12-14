class AddImageIdToProduct < ActiveRecord::Migration[5.0]
  def change
    add_reference :products, :image, foreign_key: true
    add_index :products, :image_id
  end
end
