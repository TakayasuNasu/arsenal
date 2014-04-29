class StaffsController < ApplicationController

	before_filter :authenticate_admin_user!

	skip_before_filter :verify_authenticity_token ,:only=>[:regist]

  def regist
  	staffs = params[:yammerId]
  	staffs.each do |id|
  		staff_info = Staff.find_by_yammer_id(id)
  		staff = Staff.regist(staff_info)
  		logger.info(staff.inspect)
  	end
  end

  def regist_confirm
  end

  def show
  	all_staff = Staff.get_all_staff
  	render json: Staff.get_unregistered_staff(all_staff)
  end

end
