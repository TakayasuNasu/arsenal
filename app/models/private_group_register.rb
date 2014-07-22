class PrivateGroupRegister < ActiveRecord::Base
	belongs_to :staff
	belongs_to :private_group

	# 所属しているyammerグループをDBに登録
	def self.regist(staff)
		result = Array.new

		# apiからユーザーの所属グループを取得
		groups = Staff.get_groups_for_user staff[:yammer_id]
		groups.each do |group|
			# DBからユーザーの所属グループを取得
			private_group = PrivateGroup.find_by yammer_group_id: group[:id]

			# DBにyammerグループが未登録の場合は以下の処理をスキップする
			next unless private_group

			# ユーザーが登録済みのyammerグループを取得
			registed_group = self.find_by_staff_and_private_group staff[:id], private_group.id

			# ユーザーのyammerグループが未登録の場合のみDBに登録する
			unless registed_group
				private_group_register = self.add staff[:id], private_group[:id]
				result.push private_group_register
			end

		end
		return result
	end

	# ユーザーが登録済みのyammerグループを取得
	def self.find_by_staff_and_private_group(staff_id, private_group_id)
		result = self.find_by staff_id: staff_id, private_group_id: private_group_id
		return result
	end

	# private_group_registersテープルに追加
	def self.add(staff_id, private_group_id)
		add_private_group_register = self.create(
			staff_id: staff_id,
			private_group_id: private_group_id
			)
		return add_private_group_register
	end
end
