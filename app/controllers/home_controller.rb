require 'yammer'

class HomeController < ApplicationController

	before_filter :authenticate_staff!

  def index
  	yamr = Yammer::Client.new(:access_token  => Constants.token)
  	@user = yamr.all_users page: 2
  end
end
