require "rake"
require "rake/testtask"

Dir["tasks/*.rake"].each { |f| import f }

Rake::TestTask.new do |t|
  t.pattern = "test/**/*_test.rb"
  t.libs.push "test"
end

desc "Configure environment"
task :environment do
  require_relative "config/applications"
end
