
get '/' do
  erb :index
end

get '/vendors' do
  json_obj_array = []
  Vendor.all.each { |vendor_obj|
    json_obj_array << {name: vendor_obj.name, price: vendor_obj.price, quantity: vendor_obj.quantity, rt: vendor_obj.rt, rw: vendor_obj.rw, city: vendor_obj.city}.to_json
  }
  return json_obj_array
end
