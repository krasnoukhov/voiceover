namespace :db do
  desc "Setup database"
  task setup: :environment do
    DB.create_table :photos do
      primary_key :id
      String      :basename
      String      :location
      Integer     :year
    end

    CSV.foreach("./db/photos.csv").map do |row|
      entity = VoiceOver::Photo.new(
        basename: "EmineSevim-#{row[0]}.jpg",
        location: row[1],
        year: row[2]
      )
      VoiceOver::PhotoRepository.create(entity)
    end

    DB.create_table :stories do
      primary_key :id
      String      :name
      Integer     :age
      String      :country
      String      :description
      String      :photo_ids
    end
  end
end
