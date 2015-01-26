
#Fake Seeds
# begin
fnames = "Helen,b,c,d".split(",")
lnames = "Baxendale,B,C,D".split(",")
countries = "aa,bb,cc,dd".split(",")
birthdays = [Date.new(1990,1,26),Date.new(1992,2,2),Date.new(1993,3,3),Date.new(1994,4,4)]

Scholar.create(birthdate: Date.new(1990,1,26))
# fnames.each_with_index { |fname,index|
#     p fname
#     Scholar.create(birthdate: "bob")
# }
# rescue ActiveRecord::RecordInvalid => invalid
#   puts invalid.record.errors
# end

#CSV Seeds



#FB Seeds


#Create & Migrate DB
#Seed with fakes and check that works
#Read in CSV file
#Pull in FB names
