class AddImageIdToProduct < ActiveRecord::Migration[5.0]
  def change
    add_reference :products, :image, foreign_key: true
  end
end
