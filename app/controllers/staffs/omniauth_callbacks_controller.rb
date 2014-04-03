class Staffs::OmniauthCallbacksController < Devise::OmniauthCallbacksController
	def yammer
    	@staff = Staff.find_for_yammer_oauth(request.env["omniauth.auth"])

	    if @staff.persisted?
	    	sign_in_and_redirect @staff, :event => :authentication
	    	set_flash_message(:notice, :success, :kind => "yammer") if is_navigational_format?
	    else
	    	session["devise.yammer_data"] = request.env["omniauth.auth"]
	    	redirect_to new_staff_registration_url
	    end
 	end
end