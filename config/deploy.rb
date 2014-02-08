lock '3.1.0'

set :stage, :production
set :application, 'cthomson.ca'
set :repo_url, 'git@github.com:christhomson/christhomson.github.com.git'

set :deploy_to, "/home/deploy/apps/#{fetch(:application)}"

set :bundle_bins, fetch(:bundle_bins, []).push %w(jekyll)

namespace :deploy do
  task :jekyll_build do
    on roles(:app) do
      within release_path do
        execute 'jekyll build'
      end
    end
  end
end

after 'deploy:updated', 'deploy:jekyll_build'
