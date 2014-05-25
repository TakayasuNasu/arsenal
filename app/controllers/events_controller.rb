class EventsController < ApplicationController

	before_action :set_event, only: [:update]

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
			params.require(:event).permit(:name, :description, :date)
		end

		def set_event
			@event = Event.find(params[:id])
		end

end
