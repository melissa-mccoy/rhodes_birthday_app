
get '/' do
  erb :index
end

get '/vendors' do
  Vendor.all.to_json
end

post '/location' do
  result_struct = Geocoder.search(params[:search_location]).first.data
  northeast_coords = result_struct["geometry"]["bounds"]["northeast"]
  southwest_coords = result_struct["geometry"]["bounds"]["southwest"]
  return {southwest: southwest_coords,northeast: northeast_coords}.to_json
  # return [[southwest_coords["lat"],southwest_coords["lng"]],[northeast_coords["lat"],northeast_coords["lng"]]].to_json
end

