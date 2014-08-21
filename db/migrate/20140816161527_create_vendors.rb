class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :country
      t.string :state
      t.string :city
      t.string :postalcode
      t.string :telephone
      t.decimal :price
      t.text :note
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end

