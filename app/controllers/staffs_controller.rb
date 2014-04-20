class StaffsController < ApplicationController
  def regist
  end

  def regist_confirm
  end

  def show
  	all_staff = Staff.get_all_staff
  	render json: Staff.get_unregistered_staff(all_staff)
  end
end
