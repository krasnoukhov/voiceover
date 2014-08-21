namespace :db do
  desc "Setup database"
  task setup: :environment do
    DB = Sequel.connect(VoiceOver::DATABASE)

    DB.create_table :photos do
      primary_key :id
      String      :basename
      String      :title
    end

    Dir["public/static/original/*.jpg"].sort.each do |path|
      entity = VoiceOver::Photo.new(basename: File.basename(path), title: path)
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
