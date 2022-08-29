# first Group model and migrations

npx sequelize-cli model:generate --name Group --attributes organizerId:integer,name:string,about:text,type:enum,private:boolean,city:string,state:string


# second Venue model and migrations

npx sequelize-cli model:generate --name Venue --attributes groupId:integer,address:string,city:string,state:string,lat:decimal,lng:decimal


# last
npx sequelize-cli model:generate --name Attendance --attributes eventId:integer,userId:integer,status:enum
