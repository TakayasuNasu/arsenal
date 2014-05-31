class Event < ActiveRecord::Base

	belongs_to :staff

	has_many :event_registers, dependent: :destroy

end
