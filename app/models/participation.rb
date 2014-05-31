class Participation < ActiveRecord::Base

	has_many :event_registers, dependent: :destroy

end
