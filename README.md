# AtmaGo Maps

AtmaGo Maps is a visual representation of AtmaGo water vendor and other related data in Indonesia. I completed this work originally as an independent project at [Dev Botocamp](http://www.devbootcamp.com), before learning Rails.

#### Open Source, Open Data
AtmaGo Maps uses open source and open data mapping software, [OpenStreetMap](http://www.openstreetmap.org/). On top of this, I implement [Leaflet](leafletjs.com), an open-source JavaScript library for mobile-friendly interactive maps, to facilitate the visual representation of vendors.

#### How AtmaGo Maps - Water Vendors works, basically
I focused firstly on mapping AtmaGo water vendors specifically. To do so, I built a PostgresSQL-based ActiveRecord database to house AtmaGo water vendor data. I then hit this database with an AJAX request to pull all data on page load. The response is a JSON object of all water vendors, which I then manipulate to render on the map. Check out the nice JavaScript MVC I wrote to create the map and display the vendors. It's in <code>app/assets/javascripts/</code>.

#### Backend
AtmaGo Maps runs on Sinatra, a lightweight server framework that serves a similar purpose as Rails. One ActiveRecord table, vendors, stores information about all water vendors (henceforth called 'vendors').  Data about all vendors is pulled from my ActiveRecord database. After validation I use the geocoder gem to generate latitude and longitude based on the boot's entry for current_location. This is the only data manipulation done on the backend.

#### Geocoder
The [Geocoder](https://github.com/alexreisner/geocoder) documentation is quite good.

I've configured Geocoder to use [ESRI](https://developers.arcgis.com/en/) rather than the default, Google, because the rate limit is higher and the geocoding performance equal.
```ruby
## config/initializers/geocoder.rb

Geocoder.configure({lookup: :esri, timeout: 15})
```
Using Geocoder is simple. The conditionals checking for test environment and update to current_location are not required, but limit unnecessary hits to the ESRI API.
```ruby
## app/models/boot.rb

geocoded_by :current_location
  unless Rails.env.test?
    after_validation :geocode,
    :if => lambda{ |user| user.current_location_changed? }
  end
```
#### Tests
Rspec controller tests for the two routes: ***index***, which is the root, and ***vendors***, which renders a JSON object of all vendors in the database.  To run the tests:

1. Prepare the test database:
```ruby
rake db:test:prepare
```
2. Run rspec:
```ruby
rspec
```

Jasmine tests for the most basic JavaScript components: namespace, controller, and view. Check out the ***tdd-map*** branch to see how these features were TDD-ed.  Unfortunately, Jasmine and Leaflet do not place nicely together, and so there are no meaninful tests of functions involving Leaflet. You will notice, in <code>specs/javascripts/map-spec.js</code> that there are before blocks before each test that create the functions the tests are testing. This is really rather silly.*

Jasmine is configured for the app according to [these installation instructions](https://github.com/searls/jasmine-rails#installation).

To run the tests:
visit <code>localhost:3000/specs</code> (or whichever port you're using)
