class EventsController < ApplicationController

	before_action :set_event, only: [:update]

	def create
		@event = Event.new(event_params)
		if @event.save
			logger.info("登録")
		else
			logger.info("エラー : 登録できませんでした")
		end
		render :nothing => true
	end

	def update
		if @event.update(event_params)
			logger.info("更新")
		else
			logger.info("エラー : 更新できませんでした")
		end

		render :nothing => true
	end

	private

		def event_params
			params.require(:event).permit(:staff_id, :name, :description, :location, :date)
		end

		def set_event
			@event = Event.find(params[:id])
		end

end
