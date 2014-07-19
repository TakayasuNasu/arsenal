class LoanCompany < ActiveRecord::Base

	has_many :staffs, dependent: :destroy

	validates :name,
		presence: true,
		uniqueness: true

	validates :address,
		presence: true,
		uniqueness: true

end
