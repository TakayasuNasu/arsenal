class HomeController < ApplicationController

	before_filter :authenticate_staff!

  def index
  end


  def all
    render json: Staff.order("group_id, nick_name")
  end

end
