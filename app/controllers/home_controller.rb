class HomeController < ApplicationController

	before_filter :authenticate_staff!

  def index
  end
end
