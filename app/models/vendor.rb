class Vendor < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  geocoded_by :address
  before_validation :geocode #, :if => :address_changed?
  validates :name, presence: true
  validates :latitude, presence: {is: true, message: "Missing latitude for this record."}
  validates :longitude, presence: {is: true, message: "Missing longitude for this record."}

  def address
    p "called address"
    return name+", "+city+", "+postalcode+", "+country
  end
end


