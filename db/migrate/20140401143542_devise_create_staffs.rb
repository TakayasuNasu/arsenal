class DeviseCreateStaffs < ActiveRecord::Migration
  def change
    create_table(:staffs) do |t|

      t.integer :yammer_id,  null: false, default: ""
      t.string  :full_name,  null: false, default: ""
      t.string  :first_name, null: false, default: ""
      t.string  :last_name,  null: false, default: ""
      t.string  :nick_name,  null: false, default: ""

      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.string  :twwite
      t.string  :mugshot_url,       null: false, default: ""
      t.integer :prefecture_id
      t.integer :group_id
      t.boolean :group_leader,      default: false
      t.integer :department_id
      t.integer :loan_company_id
      t.date    :joined,            null: false
      t.string  :token

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      t.timestamps
    end

    add_index :staffs, :email,                unique: true
  end
end
