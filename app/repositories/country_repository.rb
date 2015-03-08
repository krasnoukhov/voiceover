require "./app/entities/country"

class VoiceOver::CountryRepository
  include Lotus::Repository

  @@all = CSV.foreach("./db/countries.csv", encoding: "UTF-8").map do |row|
    VoiceOver::Country.new(
      id: row[0],
      title: row[3],
      lat: row[1].to_f,
      lng: row[2].to_f,
    )
  end

  def self.all
    @@all
  end

  def self.all_with_counts
    counts = DB[:stories].group_and_count(:country).to_a
    counts.map do |item|
      {
        "country" => all.find { |x| x.id == item[:country] },
        "count" => item[:count],
      }
    end
  end
end
