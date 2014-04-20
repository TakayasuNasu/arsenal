require 'yammer'

class Staff < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :validatable, :omniauthable

  @@yammer = Yammer::Client.new(:access_token  => Constants.Token)

def self.find_for_yammer_oauth(auth)
  	staff = Staff.where(yammer_id: auth.uid, email: auth.info.email).first
  	unless staff
  		staff = Staff.create(
  			yammer_id:     	auth.uid,
  			full_name: 		auth.info.name,
  			first_name:     auth.extra.raw_info.first_name,
  			last_name:    	auth.extra.raw_info.last_name,
  			nick_name:    	auth.info.nickname,
  			email: 			auth.info.email,
  			mugshot_url:	auth.info.image,
  			joined: 		auth.extra.raw_info.activated_at,
  			email:    		auth.info.email,
  			token:    		auth.credentials.token,
  			password: 		Devise.friendly_token[0,20]
  			)
  	end

  	return staff
  end

  # 全社員情報を取得
  def self.get_all_staff
    all_staff = Array.new
    count = 1
    while true
      staff = @@yammer.all_users page: count
      if staff.body.empty?
        break
      end
      all_staff.push(staff.body)
      count += 1
    end

    return all_staff
  end

  # 未登録社員を取得
  def self.get_unregistered_staff(all_staff)
    unregistered_staffs = Array.new

    all_staff.each do |staffs|
      staffs.each do |staff|
        registered_staff = Staff.where(yammer_id: staff[:id]).first
        # 未登録のユーザーを抽出
        unless registered_staff
          logger.debug(staff[:name])
          unregistered_staffs.push(staff)
        end
      end
    end

    return unregistered_staffs
  end
end
