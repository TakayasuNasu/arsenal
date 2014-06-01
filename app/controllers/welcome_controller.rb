class WelcomeController < ApplicationController
  def index
  	if staff_signed_in?
  		redirect_to home_index_path
  		return
  	end
  end
end
