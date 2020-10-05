User.create(first_name: "Michael", last_name: "Scott", email: "videocall@test.com", password: "testing123", confirmed_at: 2.hours.ago)
Specialist.create(first_name: "Dwight", last_name: "Schrute", email: "dwight@test.com", password: "testing123", confirmed_at: 2.hours.ago)
call = VideoCall.create(uid: "vid_abcdefghijklmno")
