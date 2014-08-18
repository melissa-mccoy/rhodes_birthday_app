class Vendor < ActiveRecord::Base
  # protect_from_forgery with: :exception
  validates :name, presence: true
  geocoded_by :address
  after_validation :geocode #, :if => lambda{ |user| user.address_changed? }

  def address
    if note == "None"
      return [city, rt+"/"+rw].compact.join(', ')
    else
      return [city, rt+"/"+rw, note].compact.join(', ')
    end
  end

end


