require 'test_helper'

class PrivateGroupTest < ActiveSupport::TestCase
  test "privateGropu presence save" do
  	private_group = PrivateGroup.new({
  		yammer_group_id: "",
  		name: ""
  		})
    refute private_group.save, "Failed to save"
  end

  test "regist private groups" do
  	id = 1502647614
	groups = Staff.get_groups_for_user id
	private_group = PrivateGroup.regist groups[14]
	assert_equal "ホルモン部", private_group[:name], "Failed to regist"
  end

  test "get private group find by yammer group id" do
  	id = 4351703
  	private_group = PrivateGroup.find_by_yammer_group_id id
  	assert_equal "4班", private_group[:name], "Failed to find_by"
  end

  test "find by yammer group nothing id" do
  	id = 12345
  	private_group = PrivateGroup.find_by_yammer_group_id id
  	assert_nil private_group, "Failed to find_by"
  end

  test "regist all" do
  	staff = {yammer_id: 1502647614}
  	result = PrivateGroup.regist_all staff
  	assert_equal "社内HP環境担当G", result[14][:name], "Failed to regist all"
  end
end
