require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  test "index action" do
  	@request.env["devise.mapping"] = Devise.mappings[:staff]
    get :index
    assert_response :success
    assert_template "home/index"
  end

end
