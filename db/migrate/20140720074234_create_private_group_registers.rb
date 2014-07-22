class CreatePrivateGroupRegisters < ActiveRecord::Migration
  def change
    create_table :private_group_registers do |t|
      t.integer :staff_id, null: false
      t.integer :private_group_id, null: false

      t.timestamps
    end
  end
end
