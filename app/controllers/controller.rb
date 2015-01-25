
get '/' do
  @scholars_born_today = Scholar.where(birthday: Date.today());

  if @scholars_born_today.length() > 0 do
    @birthday_people_address = "happybirthday@"
    @birthday_people_subject = "Happy Birthday"
    @scholars_born_today.each_with_index {|scholar,index|
      @birthday_people_address += scholar.fname.lowercase()
      @birthday_people_subject += " "+scholar.fname
    }
    @birthday_people_address += ".com"
    @birthday_people_subject += "!"
    Pony.mail :to => 'melissa.l.mccoy@gmail.com',
              :from =>  birthday_people_address,
              :subject => birthday_people_subject
  end

  erb :index

end
