class Scholar < ActiveRecord::Base
  attr_accessor :birthdate
  # validates :fname, presence: true
  # validates :birthday, presence: true

  def age
    return Date.today - self.birthdate
  end

end


