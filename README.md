# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Chat Space DB設計
## usersテーブル
  |Column|Type|Options|
  |------|----|-------|
  |email|string|null:false,add_index :email, unique: true|
  |password|string|null:false,add_index :password, unique: true|
  |username|string|null:false,add_index :username, unique: true|
### Association
  - has_many :messages
  - has_many :group
  - has_many :group, through: :group_users

## messagesテーブル
  |Column|Type|Options|
  |------|----|-------|
  |text|text|
  |img|string|null:false|
  |user_id|integer|null:false,foreign_key:true|
  |groups_id|integer|null:false,foreign_key:true|
### Association
  - belongs_to :user
  - belongs_to :group

## groupテーブル
  |Column|Type|Options|
  |------|----|-------|
  |name|null:false,add_index :name, unique: true|
### Association
  - has_many :messages
  - has_many :group_users
  - has_many :users, through: :group_users

## group_usersテーブル
  |Column|Type|Options|
  |------|----|-------|
  |user_id|integer|null:false,foreign_key:true|
  |groups_id|integer|null:false,foreign_key:true|
### Association
  - belongs_to :users
  - belongs_to :group

