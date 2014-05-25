class HomeController < ApplicationController

	before_filter :authenticate_staff!

  def index
  end


  def all
    render json: Staff.all.order("group_id, nick_name").to_json(
    	:include => {
    		:loan_company => {:except => [:created_at, :updated_at]},
        :prefecture => {:except => [:created_at, :updated_at]},
        :department => {:except => [:created_at, :updated_at]},
    		:group => {:except => [:created_at, :updated_at]}
        },
    	:except => [:created_at, :updated_at])
  end

  def event_all
    render json: Event.all
  end

end
