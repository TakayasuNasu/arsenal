class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

def authenticate_staff!
    session[:staff_return_to] = env['PATH_INFO']
    redirect_to staff_omniauth_authorize_path(:yammer) unless staff_signed_in?
  end

end
