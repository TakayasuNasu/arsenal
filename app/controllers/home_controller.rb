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
    render json: Event.all.to_json(
      :include => {
        :staff => {:except => [:created_at, :updated_at]}
      },
      :except => [:created_at, :updated_at]
    )
  end

  def participation_all
    render json: Participation.all
  end

  def current_info
    render json: current_staff.to_json
  end

  def registrant
    render json: EventRegister.where(event_id: params[:event_id]).to_json(
      :include => {
        :staff => {
          :include => {:group => {:except => [:created_at, :updated_at]}},
          :except => [:created_at, :updated_at]},
        :participation => {:except => [:created_at, :updated_at]}
      },
    :except => [:created_at, :updated_at])
  end

  def get_loan_company
    render json: LoanCompany.all
  end

  def get_group
    render json: Group.all
  end

  def get_department
    render json: Department.all
  end

  def get_prefecture
    render json: Prefecture.all
  end

  def get_private_group_register
    render json: PrivateGroupRegister.where(staff_id: params[:staff_id]).to_json(
        :include => {
          :private_group => {:except => [:created_at, :updated_at]}
        },
        :except => [:created_at, :updated_at]
      )
  end

end
