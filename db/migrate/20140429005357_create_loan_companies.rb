class CreateLoanCompanies < ActiveRecord::Migration
  def change
    create_table :loan_companies do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.string :pic

      t.timestamps
    end
  end
end
