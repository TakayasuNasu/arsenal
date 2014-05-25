class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :staff_id
      t.string :name
      t.string :description
      t.string :location
      t.datetime :date

      t.timestamps
    end
  end
end
