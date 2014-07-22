class CreatePrivateGroups < ActiveRecord::Migration
  def change
    create_table :private_groups do |t|
      t.integer :yammer_group_id, null: false
      t.string :name, null: false
      t.string :description

      t.timestamps
    end
  end
end
