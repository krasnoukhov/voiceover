require "lotus/model"
require "lotus/model/adapters/sql_adapter"

mapper = Lotus::Model::Mapper.new do
  collection :photos do
    entity VoiceOver::Photo

    attribute :id,          Integer
    attribute :title,       String
    attribute :basename,    String
  end

  collection :stories do
    entity VoiceOver::Story

    attribute :id,          Integer
    attribute :name,        String
    attribute :age,         Integer
    attribute :country,     String
    attribute :description, String
    attribute :photo_ids,   String
  end
end.load!

DB = Sequel.connect(VoiceOver::DATABASE)
adapter = Lotus::Model::Adapters::SqlAdapter.new(mapper, VoiceOver::DATABASE)
VoiceOver::PhotoRepository.adapter = adapter
VoiceOver::StoryRepository.adapter = adapter
