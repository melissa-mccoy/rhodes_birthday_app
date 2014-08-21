
get '/' do
  erb :index
end

get '/vendors' do
  return Vendor.all.to_json
end


