require "lotus/model"
require "lotus/model/adapters/sql_adapter"

mapper = Lotus::Model::Mapper.new do
  collection :photos do
    entity VoiceOver::Photo

    attribute :id,    Integer
    attribute :title, String
  end
end.load!

adapter = Lotus::Model::Adapters::SqlAdapter.new(mapper, VoiceOver::DATABASE)
VoiceOver::PhotoRepository.adapter = adapter
