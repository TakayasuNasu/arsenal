class StaffsController < ApplicationController

	before_filter :authenticate_admin_user! ,:only=>[:regist_confirm]

  before_action :set_staffs, only: [:update]

  def update
    if @staffs.update(staff_params)
      logger.info("更新")
    else
      logger.info()
    end
    render :nothing => true
  end

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

  private

    def staff_params
      params.require(:staff).permit(:id, :department_id, :group_id, :prefecture_id, :loan_company_id, :tweets, :yammerId)
    end

    def set_staffs
      @staffs = Staff.find(params[:id])
    end

end
