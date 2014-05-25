class EventRegister < ActiveRecord::Base

	belongs_to :event
	belongs_to :staff
	belongs_to :participation


end
