class PrivateGroup < ActiveRecord::Base
	has_many :private_group_register, dependent: :destroy

	validates :yammer_group_id,
		presence: true,
		uniqueness: true

	validates :name,
		presence: true


	# プライベートグループを登録する
	def self.regist_all(staff)
		result = Array.new
		groups = Staff.get_groups_for_user staff[:yammer_id]
		groups.each do |group|
			private_group = PrivateGroup.find_by_yammer_group_id group[:id]
			# 未登録の間合いのみ新規追加
			unless private_group
				result.push(PrivateGroup.regist group)
			end
		end
		return result;
	end

	# 登録済みのyammerグループを取得
	def self.find_by_yammer_group_id(yammer_group_id)
		private_group = PrivateGroup.find_by yammer_group_id: yammer_group_id
	end

	# yammerのグループを登録
	def self.regist(data)
		private_group = PrivateGroup.create(
			yammer_group_id: data[:id],
			name: 			 data[:full_name],
			description: 	 data[:description]
			)
		return private_group
	end
end
