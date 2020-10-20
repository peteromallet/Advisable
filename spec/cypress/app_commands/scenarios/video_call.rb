User.create(uid: "use_ByJWTfqewHaYhf9", account: Account.create(first_name: "Michael", last_name: "Scott", email: "videocall@test.com", password: "testing123", confirmed_at: 2.hours.ago))
Specialist.create(uid: "spe_g7JQpZLA0heEGo3", account: Account.create(first_name: "Dwight", last_name: "Schrute", email: "dwight@test.com", password: "testing123", confirmed_at: 2.hours.ago))
Specialist.create(uid: "spe_4Fq89TaGiQ39Ehn", account: Account.create(first_name: "Jim", last_name: "Halpert", email: "jim@test.com", password: "testing123", confirmed_at: 2.hours.ago))
call = VideoCall.create(uid: "vid_abcdefghijklmno")
