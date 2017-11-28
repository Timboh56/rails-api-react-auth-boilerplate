class AddIndicesToProducts < ActiveRecord::Migration[5.0]
  def change
    add_index :products, :sku, unique: true
    add_index :products, :name, unique: true
  end
end
