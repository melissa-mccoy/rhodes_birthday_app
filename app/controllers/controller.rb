
get '/' do
  # @scholars_born_today = []
  # Scholar.all.each do |scholar|
  #   p scholar.country
  #   if scholar.birthday.mday == Date.today.mday && scholar.birthday.mon == Date.today.mon then
  #     @scholars_born_today += scholar
  #   end
  # end
  # p 'after loop'
  # p @scholars_born_today.length
  # if @scholars_born_today.length > 0 then
  #   @birthday_people_address = "weloveyou"
  #   @birthday_people_subject = "Happy Birthday"
  #   @scholars_born_today.each_with_index do |scholar,index|
  #     @birthday_people_address += scholar.fname.lowercase()
  #     @birthday_people_subject += " "+scholar.fname
  #   end
  #   @birthday_people_address += "@happybirthdayfromrhodes2014.com"
  #   @birthday_people_subject += "!"
  #   Pony.mail :to => 'melissa.l.mccoy@gmail.com',
  #             :from =>  birthday_people_address,
  #             :subject => birthday_people_subject
  # end

  @birthday_people_address = "weloveyouhelen@happybirthdayfromrhodes2014.com"
  @birthday_people_subject = "Happy Birthday Helen!"
  Pony.mail(:to => 'melissa.l.mccoy@gmail.com',
            :from =>  @birthday_people_address,
            :subject => @birthday_people_subject,
            :via => :smtp,
            :via_options => {
               :address  => 'smtp.gmail.com',
               :port                 => '587',
               :enable_starttls_auto => true,
               :user_name            => 'melissa.l.mccoy@gmail.com',
               :password             => 'yellow15',
               :authentication       => :plain,
               :domain               => "localhost.localdomain"
               }
            )

  erb :index

end
