require 'test_helper'

class StaffTest < ActiveSupport::TestCase
	test "staff save" do
		staff = Staff.new({
			yammer_id: 4444,
			full_name: "名波 浩",
			first_name: "名波",
			last_name: "浩",
			email: "nanami@b-tm.co.jp",
			nick_name: "nanami",
			tweets: "2014ブラジルW杯",
			mugshot_url: "https://mug0.assets-yammer.com/mugshot/images/48x48/NZVk0-8JWrtjbLrN47Jd0vWpv3S1M-3n",
			prefecture_id: 1,
			group_id: 1,
			group_leader: false,
			department_id: 1,
			loan_company_id: 1,
			joined: "2014-01-01",
			password: "fugafuga"
			})
		assert staff.save, "Failed to save"
	end

	test "get unregistered staff" do
		all_staff = Staff.get_all_staff
		urs = Staff.get_unregistered_staff all_staff

		staffs = Staff.all

		staffs.each do |staff|
			urs.each do |s|
				refute_equal s['yammer_id'], staff['yammer_id'], "Failsed to get_unregistered_staff"
			end
		end

	end

	test "find by yammer_id"  do
		si = Staff.find_by_yammer_id 1502647614
		assert_equal "那須 毅康", si[:full_name], "Failed to find_by_yammer_id"

		si = Staff.find_by_yammer_id 1502924622
		assert_equal "栗崎 航", si[:full_name], "Failed to find_by_yammer_id"

		si = Staff.find_by_yammer_id 1503554963
		assert_equal "山崎 賢一", si[:full_name], "Failed to find_by_yammer_id"
	end

end
