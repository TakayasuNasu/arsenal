require 'test_helper'

class PrivateGroupRegisterTest < ActiveSupport::TestCase
	test "find staff and private group" do
		sid = 1
		gid = 2
		result = PrivateGroupRegister.find_by_staff_and_private_group sid, gid
		assert_equal sid, result[:staff_id], "Failed to find"
		assert_equal gid, result[:private_group_id], "Failed to find"
	end

	test "find staff and private gropu nothing" do
		sid = 1
		gid = 3
		result = PrivateGroupRegister.find_by_staff_and_private_group sid, gid
		assert_nil result, "Failed to find_by"
	end

	test "regist" do
		staff = {id: 1, yammer_id: 1502647614}
		result = PrivateGroupRegister.regist staff
		assert_equal 1, result[1][:staff_id], "Failed to regist"
	end

	test "add" do
		sid = 1
		gid = 1
		result = PrivateGroupRegister.add sid, gid
		assert_equal sid, result[:staff_id], "Failed to find"
		assert_equal gid, result[:private_group_id], "Failed to find"
	end
end
