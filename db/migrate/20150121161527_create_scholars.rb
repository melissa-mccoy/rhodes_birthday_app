class CreateScholars < ActiveRecord::Migration
  def change
    create_table :scholars do |t|
      t.string :first_name NOT NULL
      t.string :last_name
      t.string :country
      t.date :birthday NOT NULL
      t.text :note
      t.timestamps
    end
  end
end

