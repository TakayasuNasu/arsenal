class Staffs::OmniauthCallbacksController < Devise::OmniauthCallbacksController
	def yammer
		auth = request.env["omniauth.auth"]

		# 指定されたNetwork以外はトップにredirectさせる
		unless Constants.NetworkId == auth.extra.raw_info.network_id
			redirect_to root_path
			return
		end

    	@staff = Staff.find_for_yammer_oauth(auth)

	    if @staff.persisted?
	    	sign_in_and_redirect @staff, :event => :authentication
	    	set_flash_message(:notice, :success, :kind => "yammer") if is_navigational_format?
	    else
	    	session["devise.yammer_data"] = request.env["omniauth.auth"]
	    	redirect_to new_staff_registration_url
	    end
 	end
end