# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140401143542) do

  create_table "admin_users", force: true do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree

  create_table "staffs", force: true do |t|
    t.integer  "yammer_id",           default: 0,     null: false
    t.string   "full_name",           default: "",    null: false
    t.string   "first_name",          default: "",    null: false
    t.string   "last_name",           default: "",    null: false
    t.string   "nick_name",           default: "",    null: false
    t.string   "email",               default: "",    null: false
    t.string   "encrypted_password",  default: "",    null: false
    t.string   "twwite"
    t.string   "mugshot_url",         default: "",    null: false
    t.integer  "prefecture_id"
    t.integer  "group_id"
    t.boolean  "group_leader",        default: false
    t.integer  "department_id"
    t.integer  "loan_company_id"
    t.date     "joined",                              null: false
    t.string   "token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "staffs", ["email"], name: "index_staffs_on_email", unique: true, using: :btree

end
