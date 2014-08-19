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
  end
end
