class EventRegistersController < ApplicationController

	before_action :set_event_registers, only: [:update]

	def create
		@event_register = EventRegister.new(event_registers_params)
		if @event_register.save
			logger.info("登録")
		else
			logger.info("エラー : 登録できませんでした")
		end
		render :nothing => true
	end

	def update
		if @event_register.update(event_registers_params)
			logger.info()
		else
			logger.info()
		end
		render :nothing => true
	end

	private

		def event_registers_params
			params.require(:event_register).permit(:event_id, :staff_id, :participation_id)
		end

		def set_event_registers
			@event_register = EventRegister.where(event_id: params[:event_id],staff_id: params[:staff_id]).first
		end

end
