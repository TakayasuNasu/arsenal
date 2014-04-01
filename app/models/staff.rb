class Staff < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

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
end
