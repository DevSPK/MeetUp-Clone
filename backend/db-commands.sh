# first Group model and migrations

npx sequelize-cli model:generate --name Group --attributes organizerId:integer,name:string,about:text,type:enum,private:boolean,city:string,state:string


# second Venue model and migrations

npx sequelize-cli model:generate --name Venue --attributes groupId:integer,address:string,city:string,state:string,lat:decimal,lng:decimal


# third Membership model and migrations

npx sequelize-cli model:generate --name Membership --attributes userId:integer,groupId:integer,status:enum


# fourth GroupImages model and migrations

npx sequelize-cli model:generate --name GroupImage --attributes groupId:integer,url:string,preview:boolean

# last
npx sequelize-cli model:generate --name Attendance --attributes eventId:integer,userId:integer,status:enum
