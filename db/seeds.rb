require 'Date'

#Fake Seeds
begin
fnames = "a,b,c,d".split(",")
lnames = "A,B,C,D".split(",")
countries = "aa,bb,cc,dd".split(",")
birthdays = [Date.new(1990,1,1),Date.new(1992,2,2),Date.new(1993,3,3),Date.new(1994,4,4)]

fnames.each_with_index { |fname,index|
    Scholar.create(first_name: fname, last_name: lnames[index], country: countries[index] , birthday: birthdays[index], note: "Sale on water started saturday")
}
rescue ActiveRecord::RecordInvalid => invalid
  puts invalid.record.errors
end

#CSV Seeds



#FB Seeds


#Create & Migrate DB
#Seed with fakes and check that works
#Read in CSV file
#Pull in FB names
