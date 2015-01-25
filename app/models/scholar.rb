class Scholar < ActiveRecord::Base
  validates :fname, presence: true
  validates :birthday, presence: true

  def age
    return Date.today() - self.birthday
  end

end


