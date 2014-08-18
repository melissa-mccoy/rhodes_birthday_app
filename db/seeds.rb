names = "Kios Air Aetra, bapak widodo, Bapak Gatot, MCK Umum, Bapak Mustar, salma, Bapak Mustar,yanto mck,Pak Yos - Ground Water Seller,Pak Bambang,Alfans Water,abdul latip, Koperasi Bangkit Berkah, Penjual Air Dorong, MCK Mesjid Penjaringan, Pak haji ahyar, Air Dorong Pak Halim, Air Dorong Pak Hardi, ateng, Pak Engkus".split(",")
prices = [30.0,50.0,50.0,50.0,50.0,50.0,50.0,75.0,75.0,75.0,75.0,79.0,80.0,100.0,100.0,150.0,150.0,200.0,225.0,250.0]
quantity = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
rts = "000,012,012,006,001,006,000,001,401,000,001,005,144,004,006,006,003,006,003,000".split(",")
rws = "000,000,004,002,001,002,000,004,024,000,002,002,010,011,002,010,006,010,003,000".split(",")
cities = "Jakarta, Jakarta, Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta,Jakarta, Jakarta, Jakarta, Jakarta".split(",")
notes = "Utara Rorotan I Marunda, Utara, kelurahan penjaringan kec.penjaringan,Utara,kel.penjaringan,muara baru,keljaringan, Utara, Bandung, halim jakarta timur,None,penjaringan jakut,None,Pela Pela - Tanjung Priuk Jakarta Utara,Utara - Kelurahan Muara Baru,utara - rawa malang cilincing, Utara, Utara - Rawa Malang  Cilincing,None,Pulau Pramuka Kepulauan Seribu".split(",")

names.each_with_index { |name,index|
    Vendor.create(name: name, price: prices[index], rt: rts[index], rw: rws[index], city: cities[index], note: notes[index])
}





