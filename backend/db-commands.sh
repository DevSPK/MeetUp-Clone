# first Group model and migrations

npx sequelize-cli model:generate --name Group --attributes organizerId:integer,name:string,about:text,type:enum,private:boolean,city:string,state:string


# last
npx sequelize-cli model:generate --name Attendance --attributes eventId:integer,userId:integer,status:enum
