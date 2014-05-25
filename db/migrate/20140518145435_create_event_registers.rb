class CreateEventRegisters < ActiveRecord::Migration
  def change
    create_table :event_registers do |t|
      t.integer :event_id
      t.integer :staff_id
      t.integer :participation_id

      t.timestamps
    end
  end
end
