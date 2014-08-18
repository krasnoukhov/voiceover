namespace :db do
  desc "Setup database"
  task setup: :environment do
    DB = Sequel.connect(VoiceOver::DATABASE)

    DB.create_table :photos do
      primary_key :id
      String      :title
    end

    %w(1 2 3).each do |title|
      entity = VoiceOver::Photo.new(title: title)
      VoiceOver::PhotoRepository.create(entity)
    end
  end
end
