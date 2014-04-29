class Department < ActiveRecord::Base

	has_many :staffs, dependent: :destroy

end
