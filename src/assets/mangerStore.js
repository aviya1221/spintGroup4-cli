import { create } from 'zustand';

const adminStore=create((set,get)=>({
selctedRowId:-1,
setSelctedRowId:(id)=>{
    set({selctedRowId:id})
},
data:[{
    "id":1,
  "full_name": "ישראל ישראלי",
  "english_name": "Isreal",
  "picture": "https://animalfactguide.com/wp-content/uploads/2023/08/meerkat-768x512.jpg",
  "phone": "052-7975787",
  "email": "you@gmail",
  "city": "aco",
  "role": "devops",
  "current_company": "fox",
  "years_of_experience": 7,
  "linkedin_url": "www.linkedin.com/in/nerya-reznickovich",
  "facebook_url": "facebook123",
  "community_value": "mentor",
  "additional_info": "teacher of cs",
  "skills": "docker, python",
  "wants_updates": "TRUE/FALSE",
  "admin_notes": "yes/no",
  "jobs_histroy": "fox, apple, youtube",
  "groups": "menachem, yosi",
  "events": "meetup, bootcamp, party"
},{
    "id":2,
  "full_name": "דנה כהן",
  "english_name": "Dana Cohen",
  "picture": "https://images.unsplash.com/photo-1603415526960-f8f0a1f1d1f1",
  "phone": "050-1234567",
  "email": "dana@example.com",
  "city": "jerusalem",
  "role": "frontend",
  "current_company": "google",
  "years_of_experience": 5,
  "linkedin_url": "www.linkedin.com/in/dana-cohen",
  "facebook_url": "dana.cohen.fb",
  "community_value": "organizer",
  "additional_info": "frontend specialist",
  "skills": "react, javascript, css",
  "wants_updates": "TRUE",
  "admin_notes": "available for mentoring",
  "jobs_histroy": "google, microsoft, wix",
  "groups": "frontend devs, women in tech",
  "events": "hackathon, meetup, workshop"
},{
    "id":3,
  "full_name": "יוסי לוי",
  "english_name": "Yossi Levi",
  "picture": "https://images.unsplash.com/photo-1502767089025-6572583495b4",
  "phone": "052-7654321",
  "email": "yossi@example.com",
  "city": "haifa",
  "role": "backend",
  "current_company": "amazon",
  "years_of_experience": 8,
  "linkedin_url": "www.linkedin.com/in/yossi-levi",
  "facebook_url": "yossi.levi.fb",
  "community_value": "contributor",
  "additional_info": "loves python",
  "skills": "python, django, postgresql",
  "wants_updates": "FALSE",
  "admin_notes": "potential speaker",
  "jobs_histroy": "amazon, intel",
  "groups": "backend experts",
  "events": "conference, summit"
}]





}))
export default adminStore;