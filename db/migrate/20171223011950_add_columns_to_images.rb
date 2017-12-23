class AddColumnsToImages < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :image_item_type, :string
    add_column :images, :image_item_id, :string
    add_index :images, [:image_item_id, :image_item_type]
  end
end
