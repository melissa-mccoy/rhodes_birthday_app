class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :name
      t.float :price
      t.integer :quantity
      t.string :rt
      t.string :rw
      t.string :city
      t.text :note
      t.string :current_location #why is this necessary?
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end

