require 'test_helper'

class StaffsControllerTest < ActionController::TestCase
  test "should get regist" do
    get :regist
    assert_response :success
  end

  test "should get regist_confirm" do
    get :regist_confirm
    assert_response :success
  end

end
